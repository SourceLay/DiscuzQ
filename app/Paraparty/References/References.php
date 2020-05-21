<?php


namespace App\Paraparty\References;

use App\Models\Thread;
use App\Paraparty\Models\Reference;
use App\Paraparty\Helper\Config as ParaConfig;
use App\Models\Post;
use App\Models\User;
use App\Repositories\PostRepository;
use App\Repositories\ThreadRepository;
use Illuminate\Contracts\Container\BindingResolutionException;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class References
{
    /**
     * 获取引用机器人的 UID
     *
     * @return int
     * @throws BindingResolutionException
     */
    private static function reference_bot_user_id(){
        return (int)(ParaConfig::get("paraparty.references.bot_user_id", null));
    }

    /**
     * 在帖子中识别帖子地址
     *
     * @param string $data
     * @return string|string[]|null
     */
    public static function detecting(string $data)
    {
        try {
            $pattern = ParaConfig::get("paraparty.references.url.detecting.detecting_pattern", null);
        } catch (BindingResolutionException $e) {
            return $data;
        }
        if ($pattern === null) {return $data;};

        try {
            $replacement = ParaConfig::get("paraparty.references.url.detecting.replace_pattern", null);
        } catch (BindingResolutionException $e) {
            return $data;
        }
        if ($replacement === null) {return $data;}

        return preg_replace($pattern, $replacement, $data);
    }

    /**
     * 插入/更新 引用信息
     *
     * @param User $actor
     * @param Post $post
     */
    public static function update(User $actor, Post $post)
    {
        try {
            $pattern = ParaConfig::get( "paraparty.references.url.update.detecting_pattern", null);
        } catch (BindingResolutionException $e) {
            return;
        }
        if ($pattern === null) {return;}

        if (($post == null) || (!$post->is_approved) || ($post->deleted_at != null)) {return;}

        $content = $post->content;
        $tid = $post->thread_id;
        $ip = $post->ip;

        $post_id = $post->id;

        // 获取现有数据
        $references = Reference::fetch_all_by_post_id($post_id);

        // 匹配帖子内容
        $pending_list = collect([]);
        preg_match_all($pattern, $content,$matches);
        foreach ($matches["tid"] as $mentioned_tid) {
            $pending_list->push((int)$mentioned_tid);
        }
        $pending_list = $pending_list->unique();

        // 开始处理引用信息
        foreach ($pending_list as $mentioned_tid) {
            $reference = self::check_exists($references, (int)$mentioned_tid);
            if ($reference === null) {
                // 如果不存在
                self::add_reference($actor, (int)$mentioned_tid, $tid, $post_id, $ip);
            } else {
                // 如果已存在
                $posts = new PostRepository();
                $target_post = $posts->findOrFail($reference->get_target_pid(), $actor);
                $target_post->restore($actor)->save();
            }
        }

        // 将 $references 剩下的删除
        for ($i = 0; $i < count($references); $i++){
            $reference = $references[$i];
            $posts = new PostRepository();
            $target_post = $posts->findOrFail($reference->get_target_pid(), $actor);
            $target_post->hide($actor)->save();
        }

    }

    /**
     * 隐藏引用
     *
     * @param User $actor
     * @param Post $post
     */
    public static function hide(User $actor, Post $post){
        $post_id = $post->id;

        // 获取现有数据
        $references = Reference::fetch_all_by_post_id($post_id);

        // 将 $references 剩下的删除
        for ($i = 0; $i < count($references); $i++){
            $reference = $references[$i];
            $posts = new PostRepository();
            $target_post = $posts->findOrFail($reference->get_target_pid(), $actor);
            $target_post->hide($actor)->save();
        }
    }

    /**
     * 隐藏全贴引用
     *
     * @param User $actor
     * @param Thread $thread
     */
    public static function thread_hide(User $actor, Thread $thread){
        // $replies = $thread->replies()->get();
        $replies = $thread->posts()->get();

        foreach ($replies as $reply) {
            self::hide($actor, $reply);
        }
    }

    /**
     * 恢复引用
     *
     * @param User $actor
     * @param Post $post
     */
    public static function restore(User $actor, Post $post) {
        $posts = new PostRepository();
        $target_post = $posts->findOrFail($post->id, $actor);
        self::update($actor, $post);
    }

    /**
     * 恢复全贴引用
     *
     * @param User $actor
     * @param Thread $thread
     */
    public static function thread_restore(User $actor, Thread $thread){
        // $replies = $thread->replies()->get();
        $replies = $thread->posts()->get();

        foreach ($replies as $reply) {
            self::restore($actor, $reply);
        }
    }

    /**
     * 插入引用信息
     *
     * @param User $actor
     * @param int $mentioned_tid
     * @param int $tid
     * @param int $post_id
     * @param $ip
     */
    private static function add_reference(User $actor, int $mentioned_tid, int $tid, int $post_id, $ip){
        if ($mentioned_tid == $tid) return;
        try {
            $reference_bot_user_id = self::reference_bot_user_id();
        } catch (BindingResolutionException $e) {
            return;
        }

        try {
            $threads = new ThreadRepository();
            $memtioned_thread = $threads->findOrFail($mentioned_tid, $actor);
        } catch (ModelNotFoundException $e) {
            return;
        }

        $content = json_encode((object)["type"=>"reference", "thread_id"=>$tid, "post_id"=>$post_id, "operator"=>$actor->id]);

        $reference = Post::reply(
            $mentioned_tid,
            $content,
            $reference_bot_user_id,
            $ip,
            null,
            $actor->id,
            false,
            false
        );
        $reference->save();

        Reference::build($post_id, $mentioned_tid, $reference->id)->save();
    }

    /**
     * 检查是否有现有引用
     *
     * @param Collection $references
     * @param int $mentioned_tid
     * @return bool
     */
    private static function check_exists(Collection &$references, int $mentioned_tid)
    {
        $found_index = null;

        for ($i = 0; $i < count($references); $i++){
            $reference = $references[$i];
            if ($reference->target_tid == $mentioned_tid) {
                $found_index = $i;
                break;
            };
        }

        if ($found_index === null) {
            return null;
        } else {
            $reference = $references[$found_index];
            $references->forget($found_index);
            return $reference;
        }

    }

}

<?php


namespace App\Paraparty\References;

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
     * 插入引用信息
     *
     * @param User $actor
     * @param string $content
     * @param int $tid
     * @param int $post_id
     * @param $ip
     * @throws BindingResolutionException
     */
    public static function update(User $actor, string $content, int $tid, int $post_id, $ip)
    {
        try {
            $pattern = ParaConfig::get( "paraparty.references.url.update.detecting_pattern", null);
        } catch (BindingResolutionException $e) {
            return;
        }
        if ($pattern === null) {return;}

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
     * 插入引用信息
     *
     * @param User $actor
     * @param int $mentioned_tid
     * @param int $tid
     * @param int $post_id
     * @param $ip
     * @throws BindingResolutionException
     */
    private static function add_reference(User $actor, int $mentioned_tid, int $tid, int $post_id, $ip){
        if ($mentioned_tid == $tid) return;

        try {
            $threads = new ThreadRepository();
            $memtioned_thread = $threads->findOrFail($mentioned_tid, $actor);
        } catch (ModelNotFoundException $e) {
            return;
        }

        $content = json_encode((object)["type"=>"reference", "tid"=>$tid, "post_id"=>$post_id, "operator"=>$actor->id]);

        $reference = Post::reply(
            $mentioned_tid,
            $content,
            self::reference_bot_user_id(),
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
     * 获取引用操作者信息
     *
     * @param $post
     * @throws BindingResolutionException
     */
    public static function get_references_info(&$post)
    {
        if ($post['user_id'] == self::reference_bot_user_id()) {

            $content = $post['content'];

            $obj = json_decode($content, true);

            $operator = User::find($obj['operator']);

            //$relations = $post->getRelations();
            //array_push($relations, ["operator" => $operator] );
            //$post->setRelations($relations);
            $post->setRelation("operator", $operator);
        } else {
            $post->setRelation("operator", $post->getRelation("user"));
        }
    }

    /**
     * 检查是否现有内容
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

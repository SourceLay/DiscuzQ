<?php


namespace App\Paraparty\References;

use App\Paraparty\Helper\Config as ParaConfig;
use App\Models\Post;
use App\Models\User;
use App\Repositories\ThreadRepository;
use Illuminate\Contracts\Container\BindingResolutionException;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class References
{

    private static function reference_bot_user_id(){
        return (int)(ParaConfig::get("paraparty.references.bot_user_id", null));
    }

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

    public static function update(ThreadRepository $threads, User $actor, string $content, int $tid, int $post_id, $ip)
    {
        try {
            $pattern = ParaConfig::get( "paraparty.references.url.update.detecting_pattern", null);
        } catch (BindingResolutionException $e) {
            return;
        }
        if ($pattern === null) {return;}

        preg_match_all($pattern, $content,$matches);

        foreach ($matches["tid"] as $mentioned_tid)
            self::add_reference($threads, $actor, (int)$mentioned_tid, $tid, $post_id, $ip);
    }

    private static function add_reference(ThreadRepository $threads, User $actor, int $mentioned_tid, int $tid, int $post_id, $ip){
        if ($mentioned_tid == $tid) return;

        try {
            $memtioned_thread = $threads->findOrFail($mentioned_tid, $actor);
        } catch (ModelNotFoundException $e) {
            return;
        }

        $content = json_encode((object)["type"=>"reference", "tid"=>$tid, "post_id"=>$post_id]);

        $reference = Post::reply(
            $mentioned_tid,
            $content,
            self::reference_bot_user_id(),
            $ip,
            null,
            null,
            false,
            false
        );
        $reference->save();
    }

}

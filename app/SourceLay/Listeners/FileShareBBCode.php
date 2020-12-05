<?php


namespace App\SourceLay\Listeners;

use App\Events\Post\Saved as PostSaved;
use App\SourceLay\Models\FileShare;
use App\SourceLay\Models\FileThread;
use Illuminate\Contracts\Events\Dispatcher;
use Illuminate\Support\Arr;

class FileShareBBCode
{
    public function subscribe(Dispatcher $events){
        $events->listen(PostSaved::class, [$this, 'whenPostSaved']);
    }

    public function whenPostSaved(PostSaved $event){
        $actor = $event->actor;
        $post = $event->post;
        $thread = $post->thread;
        $content = $post->content;

        if (preg_match_all("/\[fileshare\](?<fileshare_id>\d+)\[\/fileshare\]/", $content, $matches))
        {
            $fileshare_ids = $matches['fileshare_id'];

            // 删除旧的
            $fileThreads = FileThread::where('post_id', $post->id)->get();
            foreach ($fileThreads as $fileThread) {

                // 检查新的修改内容里是否完全包含之前已写入的分享信息
                $result = Arr::first($fileshare_ids,  function ($value, $key) use ($fileThread) {
                    return $value == $fileThread->id;
                }, null);

                // 在新的帖子里找不到这个分享
                if ($result == null) {
                    // 那就给你删掉
                    $fileThread->delete();
                }

            }

            // 插入新的
            foreach ($fileshare_ids as $fileshrae_id) {
                $fileShare = FileShare::find($fileshrae_id);
                if ($fileShare == null) continue;

                if ($post->user_id == $fileShare->id) {
                    $priority = 100;
                } else if ($fileShare->shared_type == FileShare::FILESHARE_TYPE_FREE) {
                    $priority = 30;
                } else if ($fileShare->shared_type == FileShare::FILESHARE_TYPE_NEEDPASSWORD) {
                    $priority = 20;
                } else /* if ($fileShare->shared_type == FileShare::FILESHARE_TYPE_NEEDMONEY) */ {
                    $priority = 10;
                }

                $fileThread = FileThread::firstOrCreate(
                    [
                        'fileshare_id' => $fileShare->id,
                        'post_id' => $post->id,
                    ],
                    [
                        'file_id'=> $fileShare->file_id,
                        'thread_id'=> $thread->id,
                        'priority'=> $priority,
                    ]
                );
                $fileThread->save();
            }
        }

    }
}

<?php


namespace App\SourceLay\Listeners;

use App\Events\Post\Revised as PostRevised;
use App\Events\Post\Saved as PostSaved;
use App\SourceLay\Models\FileShare;
use App\SourceLay\Models\FileThread;
use Illuminate\Contracts\Events\Dispatcher;

class FileShareBBCode
{
    public function subscribe(Dispatcher $events){
        $events->listen(PostRevised::class, [$this, 'whenPostRevised']);
    }

    public function whenPostRevised(PostSaved $event){
        $actor = $event->actor;
        $post = $event->post;
        $thread = $post->thread;
        $content = $post->content;

        if (preg_match_all("/\[fileshare\](?<fileshare_id>\d+)\[\/fileshare\]/", $content, $matches))
        {
            $fileshare_ids = $matches['fileshare_id'];
            foreach ($fileshare_ids as $fileshrae_id) {
                $fileShare = FileShare::find($fileshrae_id);

                $fileThread = new FileThread();
                if ($actor->id == $fileShare->id) {
                    $fileThread->priority = 100;
                } else if ($fileShare->shared_type != FileShare::FILESHARE_TYPE_FREE) {
                    $fileThread->priority = 10;
                } else {
                    continue;
                }

                $fileThread->file_id = $fileShare->file->id;
                $fileThread->post_id = $post->id;
                $fileThread->thread_id = $thread->id;
                $fileThread->save();
            }
        }

    }
}

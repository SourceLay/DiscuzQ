<?php


namespace App\Paraparty\Listeners;

use App\Events\Post\Created as PostCreated;
use App\Events\Post\Saved as PostSaved;
use App\Paraparty\Models\Activities;
use Illuminate\Contracts\Events\Dispatcher;

class ActivitiesListener
{
    public function subscribe(Dispatcher $events){
        $events->listen(PostCreated::class, [$this, 'whenPostCreated']);
        $events->listen(PostSaved::class, [$this, 'whenPostSaved']);
    }

    public function whenPostCreated(PostCreated $event){
        $post = $event->post;
        Activities::updateOrCreate(
            ['id' => $post->id],
            [
                'thread_id' => $post->thread_id,
                'is_first' => $post->is_first,
                'category_id' => $post->thread->category_id,
            ]
        );
    }

    public function whenPostSaved(PostSaved $event){
        $post = $event->post;
        if ($post->is_first)
            Activities::updateOrCreate(
                ['id' => $post->id],
                [
                    'thread_id' => $post->thread_id,
                    'is_first' => $post->is_first,
                    'category_id' => $post->thread->category_id,
                ]
            );
    }
}

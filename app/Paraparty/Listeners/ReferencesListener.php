<?php


namespace App\Paraparty\Listeners;


use App\Events\Post\Created as PostCreated;
use App\Events\Post\Saved as PostSaved;
use App\Events\Post\Hidden as PostHidden;
use App\Events\Post\Restored as PostRestored;
use App\Paraparty\References\References;
use Illuminate\Contracts\Events\Dispatcher;
use Illuminate\Support\Arr;

class ReferencesListener
{
    public function subscribe(Dispatcher $events){

        $events->listen(PostCreated::class, [$this, 'whenPostCreated']);
        $events->listen(PostSaved::class, [$this, 'whenPostSaved']);
        $events->listen(PostHidden::class, [$this, 'whenPostHidden']);
        $events->listen(PostRestored::class, [$this, 'whenPostRestored']);

    }

    public function whenPostCreated(PostCreated $event){
        $content = References::detecting($event->post->content);
        $event->post->content = $content;
    }

    public function whenPostSaved(PostSaved $event){

        if ($event->post->is_approved)
            References::update($event->actor, $event->post);
    }

    public function whenPostHidden(PostHidden $event){

    }

    public function whenPostRestored(PostRestored $event){

    }
}

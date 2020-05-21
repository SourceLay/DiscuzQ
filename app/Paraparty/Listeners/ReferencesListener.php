<?php


namespace App\Paraparty\Listeners;


use App\Events\Post\Created as PostCreated;
use App\Events\Post\Saved as PostSaved;
use App\Events\Post\Hidden as PostHidden;
use App\Events\Post\Restored as PostRestored;
use App\Events\Post\Revised as PostRevised;
use App\Events\Post\Deleted as PostDeleted;
use App\Events\Post\PostWasApproved;
use App\Paraparty\References\References;
use Illuminate\Contracts\Events\Dispatcher;

class ReferencesListener
{
    public function subscribe(Dispatcher $events){
        $events->listen(PostCreated::class, [$this, 'whenPostCreated']);
        $events->listen(PostSaved::class, [$this, 'whenPostSaved']);
        $events->listen(PostHidden::class, [$this, 'whenPostHidden']);
        $events->listen(PostRestored::class, [$this, 'whenPostRestored']);
        $events->listen(PostRevised::class, [$this, 'whenPostRevised']);
        $events->listen(PostDeleted::class, [$this, 'whenPostDeleted']);
        $events->listen(PostWasApproved::class, [$this, 'whenPostWasApproved']);
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
        References::hide($event->actor, $event->post);
    }

    public function whenPostRestored(PostRestored $event){
        References::restore($event->actor, $event->post);
    }

    public function whenPostRevised(PostRevised $event){
        $content = References::detecting($event->post->content);
        $event->post->content = $content;
    }

    public function PostDeleted(PostDeleted $event){
        // TODO 先使用 hide 代替永久删除
        References::hide($event->actor, $event->post);
    }

    public function whenPostWasApproved(PostWasApproved $event){
        if ($event->post->is_approved) {
            References::restore($event->actor, $event->post);
        } else {
            References::hide($event->actor, $event->post);
        }
    }
}

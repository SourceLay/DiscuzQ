<?php


namespace App\Paraparty\Listeners;


use App\Events\Post\Created as PostCreated;
use App\Events\Post\Saved as PostSaved;
use App\Events\Post\Hidden as PostHidden;
use App\Events\Post\Restored as PostRestored;
use App\Events\Post\Revised as PostRevised;
use App\Events\Post\Deleted as PostDeleted;
use App\Events\Post\PostWasApproved;
use App\Events\Thread\Hidden as ThreadHidden;
use App\Events\Thread\Restored as ThreadRestored;
use App\Events\Thread\Deleted as ThreadDeleted;
use App\Events\Thread\ThreadWasApproved;
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

        $events->listen(ThreadHidden::class, [$this, 'whenThreadHidden']);
        $events->listen(ThreadRestored::class, [$this, 'whenThreadRestored']);
        $events->listen(ThreadDeleted::class, [$this, 'whenThreadDeleted']);
        $events->listen(ThreadWasApproved::class, [$this, 'whenThreadWasApproved']);
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
        // if (($event->data['notice_type'] != 'isApproved')) {return;}
        if ($event->post->is_approved) {
            References::restore($event->actor, $event->post);
        } else {
            References::hide($event->actor, $event->post);
        }
    }

    public function whenThreadHidden(ThreadHidden $event){
        References::thread_hide($event->actor, $event->thread);
    }

    public function whenThreadRestored(ThreadRestored $event){
        References::thread_restore($event->actor, $event->thread);
    }

    public function whenThreadDeleted(ThreadDeleted $event){
        // TODO 先使用 hide 代替永久删除
        References::thread_hide($event->actor, $event->thread);
    }

    public function whenThreadWasApproved(ThreadWasApproved $event){
        if (($event->data['notice_type'] != 'isApproved')) {return;}
        if ($event->thread->is_approved) {
            References::thread_restore($event->actor, $event->thread);
        } else {
            References::thread_hide($event->actor, $event->thread);
        }
    }

}

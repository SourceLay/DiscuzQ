<?php

namespace App\Paraparty\Models;

use App\Models\Thread;
use Illuminate\Database\Eloquent\Model;

/**
 * @property float|int|mixed|string id
 */
class MainPageRecommendedModel extends Model
{
    public function latestThreads() {
        return Thread::query()->orderBy('created_at', 'desc')->take(9)->get();
    }

    public function latestReplied() {
        return Thread::query()->orderBy('updated_at', 'desc')->take(9)->get();
    }

    public function hottestThreads() {
        return Thread::query()->orderBy('post_count', 'desc')->take(9)->get();
    }
}

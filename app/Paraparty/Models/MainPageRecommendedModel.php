<?php

namespace App\Paraparty\Models;

use App\Models\Thread;
use App\Paraparty\Helper\Cache;
use Illuminate\Database\Eloquent\Model;

class MainPageRecommendedModel extends Model
{
    public function latestThreads() {
        //$cache = Cache::getCacheRepository();
        //$cache__key = 'MainPageRecommendedModel_latestThreads';
        //if ($ret = $cache->get($cache__key, null) !== null) {
        //    return $ret;
        //}
        $ret = Thread::query()->orderBy('created_at', 'desc')->take(9)->get();
        //$cache->put($cache__key, $ret, 600);
        return $ret;
    }

    public function latestReplied() {
        //$cache = Cache::getCacheRepository();
        //$cache__key = 'MainPageRecommendedModel_latestReplied';
        //if ($ret = $cache->get($cache__key, null) !== null) {
        //    return $ret;
        //}
        $ret = Thread::query()->orderBy('updated_at', 'desc')->take(9)->get();
        //$cache->put($cache__key, $ret, 600);
        return $ret;
    }

    public function hottestThreads() {
        //$cache = Cache::getCacheRepository();
        //$cache__key = 'MainPageRecommendedModel_hottestThreads';
        //if ($ret = $cache->get($cache__key, null) !== null) {
        //    return $ret;
        //}
        $ret = Thread::query()->orderBy('post_count', 'desc')->take(9)->get();
        //$cache->put($cache__key, $ret, 600);
        return $ret;
    }
}

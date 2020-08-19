<?php


namespace App\Paraparty\Helper;


use Illuminate\Cache\Repository;

class Cache
{

    /**
     * @return Repository
     */
    public static function getCacheRepository(){
        // TODO 可能会有更优雅的写法
        $cache = app()['cache'];
        return $cache->driver($cache->getDefaultDriver());
    }
}

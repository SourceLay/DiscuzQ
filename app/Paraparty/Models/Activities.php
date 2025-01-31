<?php

namespace App\Paraparty\Models;

use App\Paraparty\Helper\Cache;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

/**
 * @property int id
 * @property int thread_id
 * @property bool is_first
 * @property int category_id
 * @package App\Models
 * @method static updateOrCreate(array $array, array $array1)
 */
class Activities extends Model
{
    protected $table = 'paraparty_activities';

    protected $primaryKey = 'id';

    protected $keyType = 'int';

    const UPDATED_AT = null;

    protected  $fillable = ['id', 'thread_id', 'is_first', 'category_id', 'created_at'];

    /**
     * @param int $post_id
     * @param int $thread_id
     * @param bool $is_first
     * @param int $category_id
     * @return static
     */
    public static function build(int $post_id, int $thread_id, bool $is_first, int $category_id)
    {
        $reference = new static;

        $reference->id = $post_id;
        $reference->thread_id = $thread_id;
        $reference->is_first = $is_first;
        $reference->category_id = $category_id;

        return $reference;
    }

    public static function getToday($category_id = null) {

        // 缓存
        $cache = Cache::getCacheRepository();
        $cache_key = "paraparty_activities_cache_".($category_id == null ? "all" : $category_id);

        // 有缓存
        $cache_date = $cache->get($cache_key, null);
        if ($cache_date != null) {
            return $cache_date;
        }

        // 无缓存
        $query = static::query();
        if ($category_id != null)
            $query = $query->where('category_id', $category_id);
        $threads = $query
            ->where('created_at', '>=', Carbon::now()->subDay())
            ->where('is_first', 1)
            ->count();

        $query = static::query();
        if ($category_id)
            $query = $query->where('category_id', $category_id);
        $posts = $query
            ->where('created_at', '>=', Carbon::now()->subDay())
            ->count();

        $ret = [
            'threads' => $threads,
            'posts' =>  $posts,
        ];

        // 写入缓存
        $cache->put($cache_key, $ret, 300);

        return $ret;
    }

    public static function deleteOld(){
        static::query()->where('created_at', '<', Carbon::now()->subWeek())->delete();
    }
}

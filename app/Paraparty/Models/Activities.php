<?php

namespace App\Paraparty\Models;

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

    public static function getToday() {
        // TODO 做缓存
        static::query()->where('created_at', '<', Carbon::now()->subDay())->delete();

        return [
            'thread' => static::query()
                ->where('created_at', '>=', Carbon::now()->subDay())
                ->where('is_first', 1)
                ->count(),
            'post' =>  static::query()
                ->where('created_at', '>=', Carbon::now()->subDay())
                ->count(),
        ];
    }
}

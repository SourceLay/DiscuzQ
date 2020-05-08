<?php

namespace App\Paraparty\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property int $post_id
 * @property int $target_tid
 * @property int $target_pid
 * @package App\Models
 */
class Reference extends Model
{
    /**
     * {@inheritdoc}
     */
    protected $table = 'paraparty_reference';

    protected $primaryKey = 'id';

    protected $keyType = 'int';

    /**
     * @var bool
     */
    public $timestamps = false;

    /**
     * @param int $post_id
     * @param int $target_tid
     * @param int $target_pid
     * @return static
     */
    public static function build(int $post_id, int $target_tid, int $target_pid)
    {
        $reference = new static;

        $reference->post_id = $post_id;
        $reference->target_tid = $target_tid;
        $reference->target_pid = $target_pid;

        return $reference;
    }

    public static function fetch_all_by_post_id(int $post_id)
    {
        $reference =  self::query()
            ->where(['post_id'=>$post_id])
            ->get();;

        return $reference;
    }

    public function get_target_pid() {
        return $this->target_pid;
    }
}

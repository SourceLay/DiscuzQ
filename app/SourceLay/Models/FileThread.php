<?php

namespace App\SourceLay\Models;

use App\Models\Post;
use App\Models\Thread;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

/**
 * @property int id
 * @property int file_id
 * @property int post_id
 * @property int priority
 * @property int thread_id
 * @property Carbon created_at
 * @package App\Models
 * @package App\SourceLay\Models
 */
class FileThread extends Model
{
    protected $table = 'sourcelay_file_thread_relation_info';

    protected $primaryKey = 'id';

    protected $keyType = 'int';

    const UPDATED_AT = null;

    const FILE_STATUS_PENDING = 0;

    const FILE_STATUS_COMMITED = 1;

    static function getTableName(){
        return 'sourcelay_file_thread_relation_info';
    }

    function file()
    {
        return $this->hasOne(File::class, 'id', 'file_id');
    }

    function post()
    {
        return $this->hasOne(Post::class, 'id', 'post_id');
    }

    function thread()
    {
        return $this->hasOne(Thread::class, 'id', 'thread_id');
    }
}

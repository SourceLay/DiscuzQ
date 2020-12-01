<?php

namespace App\SourceLay\Models;

use App\Models\Post;
use App\Models\Thread;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Support\Carbon;

/**
 * @property  int id
 * @property  int user_id
 * @property  string name
 * @property  string type
 * @property  string folder
 * @property  int size
 * @property  string md5
 * @property  int status
 * @property  int download_count
 * @property  int like_count
 * @property  Carbon created_at
 * @property  Carbon updated_at
 * @property  int is_shared
 * @property  int is_essence
 * @property  Carbon deleted_at
 * @property  int deleted_id
 * @property  string random_id
 * @property  string storage_name
 * @package App\SourceLay\Models
 */
class File extends Model
{
    protected $table = 'sourcelay_file_info';

    protected $primaryKey = 'id';

    protected $keyType = 'int';

    const FILE_STATUS_PENDING = 0;

    const FILE_STATUS_COMMITED = 1;

    /**
     * @return HasOne
     */
    function user()
    {
        return $this->hasOne(User::class, 'id', 'user_id');
    }

    public function likedUsers()
    {
        return $this->belongsToMany(User::class, FileLike::getTableName());
    }

    public function posts()
    {
        return $this->belongsToMany(Post::class, FileThread::getTableName());
    }

    public function thread()
    {
        return $this->belongsToMany(Thread::class, FileThread::getTableName());
    }

    public function share()
    {
        return $this->belongsTo(Thread::class, FileThread::getTableName());
    }


}

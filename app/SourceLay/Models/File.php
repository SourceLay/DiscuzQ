<?php

namespace App\SourceLay\Models;

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
 * @package App\Models
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
}

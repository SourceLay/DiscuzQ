<?php

namespace App\SourceLay\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Support\Carbon;

/**
 * @property int id
 * @property int file_id
 * @property int user_id
 * @property string shared_desc
 * @property int shared_type
 * @property string password
 * @property int is_anonymous
 * @property int cost
 * @property int view_count
 * @property int download_count
 * @property int is_recommended
 * @property Carbon recommended_at
 * @property Carbon created_at
 * @property Carbon deleted_at
 * @property int deleted_id
 * @package App\SourceLay\Models
 */
class FileShare extends Model
{
    protected $table = 'sourcelay_file_shared_info';

    protected $primaryKey = 'id';

    protected $keyType = 'int';

    const UPDATED_AT = null;

    const FILESHARE_TYPE_FREE = 0;

    const FILESHARE_TYPE_NEEDPASSWORD = 1;

    const FILESHARE_TYPE_NEEDMONEY = 2;

    /**
     * @return HasOne
     */
    function user()
    {
        return $this->hasOne(User::class, 'id', 'user_id');
    }

    /**
     * @return HasOne
     */
    function file()
    {
        return $this->hasOne(File::class, 'id', 'file_id');
    }
}

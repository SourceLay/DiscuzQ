<?php

namespace App\SourceLay\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Support\Carbon;

/**
 * @property int id
 * @property int user_id
 * @property int file_id
 * @property Carbon created_At
 * @package App\Models
 * @package App\SourceLay\Models
 */
class FileLike extends Model
{
    protected $table = 'sourcelay_file_like_info';

    protected $primaryKey = 'id';

    protected $keyType = 'int';

    const FILE_STATUS_PENDING = 0;

    const FILE_STATUS_COMMITED = 1;

    const UPDATED_AT = null;

    static function getTableName(){
        return 'sourcelay_file_like_info';
    }

    /**
     * @return HasOne
     */
    function user()
    {
        return $this->hasOne(User::class, 'id', 'user_id');
    }

    public function file()
    {
        return $this->hasOne(File::class, 'id', 'file_id');
    }

}

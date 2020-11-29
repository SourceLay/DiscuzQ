<?php

namespace App\SourceLay\Models;

use Illuminate\Database\Eloquent\Model;

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
 * @property int is_recommend
 * @property int delete_id
 * @package App\Models0
 */
class FileShare extends Model
{
    protected $table = 'sourcelay_file_shared_info';

    protected $primaryKey = 'id';

    protected $keyType = 'int';

    const UPDATED_AT = null;

    const FILESHARE_TYPE_NEEDMONEY = 2;
}

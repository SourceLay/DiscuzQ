<?php

namespace App\SourceLay\Models;

use App\Models\Order;
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

    public static function isPurchased(FileShare $model, $actor)
    {
        return Order::query()->join((new ShareOrder())->getTable(), 'id', '=', 'order_id') // 联表查询
        ->where('status', Order::ORDER_STATUS_PAID) // 已付费
        ->where('fileshared_id', '=', $model->id) // 文件分享编号
        ->where('user_id', '=', $actor->id) // 用户编号
        ->where('type', '=', Order::ORDER_TYPE_SOURCELAY_FILEPURCHASE) // 类型为源来文件购买
        ->exists();
    }

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

    public function toRequestArray()
    {
        $ret = [];

        $ret['id'] = $this->id;
        $ret['fileId'] = $this->file_id;
        $ret['userId'] = $this->user_id;
        $ret['sharedDesc'] = $this->shared_desc;
        $ret['sharedType'] = $this->shared_type;
        $ret['password'] = $this->password;
        $ret['isAnonymous'] = $this->is_anonymous;
        $ret['cost'] = $this->cost;
        $ret['view_count'] = $this->view_count;
        $ret['download_count'] = $this->download_count;
        $ret['isRecommended'] = $this->is_recommended;
        $ret['recommendedAt'] = $this->recommended_at;
        $ret['created_at'] = $this->created_at;
        $ret['deleted_at'] = $this->deleted_at;
        $ret['deleted_id'] = $this->deleted_id;

        return $ret;
    }
}

<?php

namespace App\SourceLay\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int order_id
 * @property int fileshared_id
 * @package App\SourceLay\Models
 */
class ShareOrder extends Model
{
    protected $table = 'sourcelay_file_sharedorder';

    protected $primaryKey = 'order_id';

    protected $keyType = 'int';

    protected  $fillable = ['order_id', 'fileshared_id'];

    /**
     * @param int $order_id
     * @param int $fileshared_id
     * @return static
     */
    public static function build(int $order_id, int $fileshared_id)
    {
        $reference = new static;

        $reference->order_id = $order_id;
        $reference->fileshared_id = $fileshared_id;

        return $reference;
    }

}

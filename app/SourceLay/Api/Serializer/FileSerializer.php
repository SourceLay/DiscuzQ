<?php


namespace App\SourceLay\Api\Serializer;

use App\Api\Serializer\PostSerializer;
use App\Api\Serializer\ThreadSerializer;
use App\Api\Serializer\UserSerializer;
use App\SourceLay\Models\File;
use Discuz\Api\Serializer\AbstractSerializer;

class FileSerializer extends AbstractSerializer
{
    /**
     * 给前端看的，表示这是一个什么类型的数据
     *
     * @var string
     */
    protected $type = 'sourcelay-file';

    /**
     * 重写本方法以序列化数据给前端。
     *
     * {@inheritdoc}
     *
     * @param File $model
     */
    public function getDefaultAttributes($model)
    {
        $ret = [];

        $ret['id'] = $model->id;
        $ret['user_id'] = $model->user_id;
        $ret['name'] = $model->name;
        $ret['type'] = $model->type;
        $ret['folder'] = $model->folder;
        $ret['size'] = $model->size;
        $ret['md5'] = $model->md5;
        $ret['status'] = $model->status;
        $ret['download_count'] = $model->download_count;
        $ret['like_count'] = $model->like_count;
        $ret['created_at'] = $model->created_at;
        $ret['updated_at'] = $model->updated_at;
        $ret['is_shared'] = $model->is_shared;
        $ret['is_essence'] = $model->is_essence;
        $ret['deleted_at'] = $model->deleted_at;
        $ret['deleted_id'] = $model->deleted_id;
        $ret['is_liked'] = File::isLiked($model->id, $this->actor);

        if ($model->uploadUrl) {
            $ret['uploadUrl'] = $model->uploadUrl;
        }

        if ($model->downloadUrl) {
            $ret['downloadUrl'] = $model->downloadUrl;
        }

        return $ret;
    }

    protected function user($post)
    {
        return $this->hasOne($post, UserSerializer::class);
    }

    public function posts($post)
    {
        return $this->hasMany($post, PostSerializer::class);
    }

    public function thread($post)
    {
        return $this->hasMany($post, ThreadSerializer::class);
    }

    public function likedUsers($post)
    {
        return $this->hasMany($post, UserSerializer::class);
    }

}

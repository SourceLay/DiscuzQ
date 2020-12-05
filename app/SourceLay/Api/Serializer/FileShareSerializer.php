<?php


namespace App\SourceLay\Api\Serializer;

use App\Api\Serializer\UserSerializer;
use App\SourceLay\Library\SourceLayClient;
use App\SourceLay\Models\FileShare;
use Discuz\Api\Serializer\AbstractSerializer;
use Tobscure\JsonApi\Relationship;

class FileShareSerializer extends AbstractSerializer
{
    /**
     * @var string
     */
    protected $type = 'sourcelay-fileshare';

    /**
     * {@inheritdoc}
     *
     * @param FileShare $model
     */
    public function getDefaultAttributes($model)
    {
        $ret = [];

        $ret['id'] = $model->id;
        $ret['file_id'] = $model->file_id;
        $ret['user_id'] = $model->user_id;
        $ret['shared_desc'] = $model->shared_desc;
        $ret['shared_type'] = $model->shared_type;
        // $ret['password'] = $model->password;
        $ret['is_anonymous'] = $model->is_anonymous;
        $ret['cost'] = $model->cost;
        $ret['view_count'] = $model->view_count;
        $ret['download_count'] = $model->download_count;
        $ret['is_recommended'] = $model->is_recommended;
        $ret['recommended_at'] = $model->recommended_at;
        $ret['created_at'] = $model->created_at;
        $ret['deleted_at'] = $model->deleted_at;
        $ret['deleted_id'] = $model->deleted_id;

        if ($model->is_anonymous) {
            $ret['user_id'] = 0;
        }

        if (
            $this->actor->id == $model->user_id ||
            $model->shared_type == FileShare::FILESHARE_TYPE_FREE ||
            $model->shared_type == FileShare::FILESHARE_TYPE_NEEDMONEY && FileShare::isPurchased($model, $this->actor)
        ) {
            $ret['paid'] = true;

            $client = new SourceLayClient();
            $client->actor = $this->actor;

            try {
                $downloadUrl = $client->fileGetShareDownloadUrl($model->id);
                $ret['downloadUrl'] = $downloadUrl->body();
            } catch (\Exception $e) {

            }
        } else {
            $ret['paid'] = false;
        }

        if ($model->downloadUrl) {
            $ret['downloadUrl'] = $model->downloadUrl;
        }

        return $ret;
    }

    /**
     * @param $post
     * @return Relationship
     */
    protected function user($post)
    {
        return $this->hasOne($post, UserSerializer::class);
    }

    /**
     * @param $post
     * @return Relationship
     */
    protected function file($post)
    {
        return $this->hasOne($post, FileSerializer::class);
    }
}

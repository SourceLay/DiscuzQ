<?php


namespace App\Paraparty\Api\Serializer;

use App\Api\Serializer\ThreadSerializer;
use Discuz\Api\Serializer\AbstractSerializer;


class MainPageRecommendedModelSerializer extends AbstractSerializer
{

    protected $type = 'main-page-recommended';


    public function getDefaultAttributes($model)
    {
        return [];
    }

    protected function latestThreads($model)
    {
        return $this->hasMany($model, ThreadSerializer::class);
    }

    protected function latestReplied($model)
    {
        return $this->hasMany($model, ThreadSerializer::class);
    }

    protected function hottestThreads($model)
    {
        return $this->hasMany($model, ThreadSerializer::class);
    }
}

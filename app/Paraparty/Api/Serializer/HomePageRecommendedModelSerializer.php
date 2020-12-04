<?php


namespace App\Paraparty\Api\Serializer;

use App\Api\Serializer\ThreadSerializer;
use Discuz\Api\Serializer\AbstractSerializer;


class HomePageRecommendedModelSerializer extends AbstractSerializer
{

    protected $type = 'home-page-recommended';


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

    protected function banners($model)
    {
        return $this->hasMany($model, HomePageBannerSerializer::class);
    }

    protected function sliders($model)
    {
        return $this->hasMany($model, HomePageSliderSerializer::class);
    }
}

<?php


namespace App\Paraparty\Api\Serializer;

use App\Api\Serializer\ThreadSerializer;
use Discuz\Api\Serializer\AbstractSerializer;


class HomePageBannerSerializer extends AbstractSerializer
{

    protected $type = 'home-page-banners';


    public function getDefaultAttributes($model)
    {
        return [
            'title' => $model->title,
            'subTitle' => $model->sub_title,
            'btnText' => $model->bin_text,
            'url' => $model->url,
            'image' => $model->image,
            'background' => $model->background,
        ];
    }

}

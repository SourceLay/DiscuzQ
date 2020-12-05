<?php


namespace App\Paraparty\Api\Serializer;

use App\Api\Serializer\ThreadSerializer;
use Discuz\Api\Serializer\AbstractSerializer;


class HomePageSliderSerializer extends AbstractSerializer
{

    protected $type = 'home-page-sliders';


    public function getDefaultAttributes($model)
    {
        return [
            'title' => $model->title,
            'author' => $model->author,
            'image' => $model->image,
            'thread_id' => $model->thread_id,
        ];
    }

}

<?php

namespace App\Paraparty\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property float|int|mixed|string id
 */
class HomePageRecommendedModel extends Model
{
    public function homePageBanner(){
        return HomePageBanner::query()->where('status',1)->orderBy('weight', 'desc')->get();
    }

    public function homePageSlider(){
        // TODO 改为最近的带图帖子
        return HomePageSlider::query()->where('status',1)->orderBy('weight', 'desc')->get();
    }
}

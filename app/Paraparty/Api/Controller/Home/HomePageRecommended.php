<?php


namespace App\Paraparty\Api\Controller\Home;


use App\Paraparty\Api\Serializer\HomePageRecommendedModelSerializer;
use App\Paraparty\Models\HomePageRecommendedModel;
use Carbon\Carbon;
use Discuz\Api\Controller\AbstractResourceController;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;


class HomePageRecommended extends AbstractResourceController
{
    public $include = [
        'latestThreads',
        'latestThreads.user',
        // 'latestThreads.category',
        'latestReplied',
        'latestReplied.user',
        // 'latestReplied.category',
        'hottestThreads',
        'hottestThreads.user',
        // 'hottestThreads.category',

        'banners',
        'sliders',
    ];

    public $serializer = HomePageRecommendedModelSerializer::class;


    protected function data(ServerRequestInterface $request, Document $document)
    {
        $ret = new HomePageRecommendedModel();
        $ret->id = Carbon::now()->timestamp;

        $latestThread = $ret->latestThreads();
        $ret->setRelation('latestThreads', $latestThread);

        $latestThread = $ret->latestReplied();
        $ret->setRelation('latestReplied', $latestThread);

        $latestThread = $ret->hottestThreads();
        $ret->setRelation('hottestThreads', $latestThread);

        $homePageBanner = $ret->homePageBanner();
        $ret->setRelation('banners', $homePageBanner);

        $homePageSlider = $ret->homePageSlider();
        $ret->setRelation('sliders', $homePageSlider);

        return $ret;
    }

}

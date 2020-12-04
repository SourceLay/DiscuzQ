<?php


namespace App\Paraparty\Api\Controller\Home;


use App\Models\Thread;
use App\Paraparty\Api\Serializer\MainPageRecommendedModelSerializer;
use App\Paraparty\Models\MainPageRecommendedModel;
use Carbon\Carbon;
use Discuz\Api\Controller\AbstractResourceController;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;


class MainPageRecommended extends AbstractResourceController
{
    public $include = [
        'latestThreads',
        'latestReplied',
        'hottestThreads',
    ];

    public $serializer = MainPageRecommendedModelSerializer::class;


    protected function data(ServerRequestInterface $request, Document $document)
    {
        $ret = new MainPageRecommendedModel();
        $ret->id = Carbon::now()->timestamp;

        $latestThread = $ret->latestThreads();
        $ret->setRelation('latestThreads', $latestThread);

        $latestThread = $ret->latestReplied();
        $ret->setRelation('latestReplied', $latestThread);

        $latestThread = $ret->hottestThreads();
        $ret->setRelation('hottestThreads', $latestThread);

        return $ret;
    }

}

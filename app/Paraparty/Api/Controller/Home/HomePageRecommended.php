<?php


namespace App\Paraparty\Api\Controller\Home;


use App\Paraparty\Api\Serializer\HomePageRecommendedModelSerializer;
use App\Paraparty\Models\HomePageRecommendedModel;
use App\Repositories\ThreadRepository;
use Carbon\Carbon;
use Discuz\Api\Controller\AbstractResourceController;
use Illuminate\Contracts\Routing\UrlGenerator;
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
    /**
     * @var ThreadRepository
     */
    private $threads;

    /**
     * @param ThreadRepository $threads
     */
    public function __construct(ThreadRepository $threads)
    {
        $this->threads = $threads;
    }

    protected function data(ServerRequestInterface $request, Document $document)
    {
        $actor = $request->getAttribute('actor');
        $ret = new HomePageRecommendedModel();
        $ret->id = Carbon::now()->timestamp;

        $latestThread = $this->threads->query()->whereVisibleTo($actor)->orderBy('created_at', 'desc')->take(8)->get();
        $ret->setRelation('latestThreads', $latestThread);

        $latestThread = $this->threads->query()->whereVisibleTo($actor)->orderBy('updated_at', 'desc')->take(8)->get();
        $ret->setRelation('latestReplied', $latestThread);

        $latestThread = $this->threads->query()->whereVisibleTo($actor)->orderBy('post_count', 'desc')->take(8)->get();
        $ret->setRelation('hottestThreads', $latestThread);

        $homePageBanner = $ret->homePageBanner();
        $ret->setRelation('banners', $homePageBanner);

        $homePageSlider = $ret->homePageSlider();
        $ret->setRelation('sliders', $homePageSlider);

        return $ret;
    }

}

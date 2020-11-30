<?php


namespace App\SourceLay\Api\Controller\File;


use App\SourceLay\Api\Serializer\FileSerializer;
use App\SourceLay\Models\File;
use Discuz\Api\Controller\AbstractListController;
use Discuz\Auth\Guest;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;

/**
 * Class TestApiController
 * @package ExerciseBook\DiscuzQRouteDemo
 */
class ListFile extends AbstractListController
{
    public $optionalInclude = [
        "likedUsers",
        "posts",
        "thread",
    ];

    /**
     * {@inheritdoc}
     */
    public $include = [
        'user'
    ];

    /**
     * @var string
     */
    public $serializer = FileSerializer::class;

    /**
     * {@inheritdoc}
     * @param ServerRequestInterface $request
     * @param Document $document
     * @return object
     */
    protected function data(ServerRequestInterface $request, Document $document)
    {
        $actor = $request->getAttribute('actor');
        $query = File::query();

        // 设置用户可见
        if ($actor instanceof Guest) {
            $query->whereRaw("false");
        } else {
            $query->where('user_id', '=', $actor->id);
        }

        // 排除已被删除的文件
        $query->whereNull('deleted_at');

        // 设置搜索筛选器
        $filter = $this->extractFilter($request);
        if ($folderName = Arr::get($filter, 'folder')) {
            $query->where('folder', '=', $folderName);
        }

        // 设置排序规则
        $sort = $this->extractSort($request);
        foreach ((array) $sort as $field => $order) {
            $query->orderBy(Str::snake($field), $order);
        }

        // 翻页
        $limit = $this->extractLimit($request);
        $offset = $this->extractOffset($request);
        $query->skip($offset)->take($limit);

        // 获取信息
        $files = $query->get();

        $include = $this->extractInclude($request);
        $files->loadMissing($include);

        return $files;
    }

}

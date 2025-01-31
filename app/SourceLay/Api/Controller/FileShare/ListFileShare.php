<?php


namespace App\SourceLay\Api\Controller\FileShare;


use App\Models\Post;
use App\Models\Thread;
use App\SourceLay\Api\Serializer\FileShareSerializer;
use App\SourceLay\Models\FileShare;
use Discuz\Api\Controller\AbstractListController;
use Discuz\Auth\Guest;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;

class ListFileShare extends AbstractListController
{
    /**
     * {@inheritdoc}
     */
    public $include = [
        'user',
        'file',
        'file.likedUsers',
        "posts",
        "posts.user",
        "threads",
        "threads.user",
        "threads.firstPost",
        "threads.lastPostedUser",
        "threads.user.groups",
    ];

    /**
     * @var string
     */
    public $serializer = FileShareSerializer::class;

    /**
     * {@inheritdoc}
     * @param ServerRequestInterface $request
     * @param Document $document
     * @return object
     */
    protected function data(ServerRequestInterface $request, Document $document)
    {
        $actor = $request->getAttribute('actor');
        $query = FileShare::query();

        // 设置搜索筛选器
        $filter = $this->extractFilter($request);

        // 设置用户可见
        if ($actor instanceof Guest) {
            // 公开分享文件
            $query->where('shared_type', FileShare::FILESHARE_TYPE_FREE);
        } else {
            if ($self = Arr::get($filter, 'self')) {
                $query->Where('user_id', $actor->id);
            }
            else
            {
                $query->where(function ($query) use ($request, $actor) {
                    // 公开分享文件
                    $query->where('shared_type', FileShare::FILESHARE_TYPE_FREE);

                    // 自己的分享文件
                    $query->orWhere('user_id', $actor->id);
                });
            }
        }

        // 排除已被删除的分享
        $query->whereNull('deleted_at');

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
        //foreach ($files as $file) {
        //    // 对每一个 file 进行帖子和评论的关系拆解
        //    $shareRecords = $file->share()->get()->sortByDesc('priority');
//
        //    $threadIds = Collect();
        //    $postsIds = Collect();
//
        //    foreach ($shareRecords as $shareRecord) {
        //        $threadIds->push($shareRecord->thread_id);
        //        $postsIds->push($shareRecord->post_id);
        //    }
//
        //    if (in_array('threads', $include)) {
        //        $threads = Thread::query()->where('id', 'in', $threadIds->toArray());
        //        $file->setRelation('threads', $threads);
        //    }
//
        //    if (in_array('posts', $include)) {
        //        $posts = Post::query()->where('id', 'in', $postsIds->toArray());
        //        $file->setRelation('posts', $posts);
        //    }
        //}
        $files->loadMissing($include);

        return $files;
    }

}

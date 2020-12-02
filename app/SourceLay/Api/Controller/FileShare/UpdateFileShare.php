<?php


namespace App\SourceLay\Api\Controller\FileShare;


use App\SourceLay\Api\Serializer\FileShareSerializer;
use App\SourceLay\Library\SourceLayClient;
use App\SourceLay\Models\FileShare;
use Discuz\Api\Controller\AbstractCreateController;
use Discuz\Auth\Guest;
use Exception;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;

class UpdateFileShare extends AbstractCreateController
{
    public $optionalInclude = [
        'user',
        'file'
    ];

    /**
     * {@inheritdoc}
     */
    public $include = [
    ];

    /**
     * @var string
     */
    public $serializer = FileShareSerializer::class;

    /**
     * @var SourceLayClient
     */
    private $client;

    public function __construct(SourceLayClient $client)
    {
        $this->client = $client;
    }

    /**
     * {@inheritdoc}
     * @param ServerRequestInterface $request
     * @param Document $document
     * @return object
     */
    protected function data(ServerRequestInterface $request, Document $document)
    {
        $actor = $request->getAttribute('actor');
        if ($actor instanceof Guest) {
            throw new Exception('permission_denied');
        }
        $this->client->actor = $actor;

        $fileShareIdParam = Arr::get($request->getQueryParams(), 'id');
        $data = $request->getParsedBody()->get('data', []);

        $fileShareId = Arr::get($data, 'attributes.id', $fileShareIdParam);
        if ($fileShareId === null || $fileShareId != $fileShareIdParam) {
            throw new Exception('invalid_arguments');
        }

        // 点赞相关
        $isLiked = Arr::get($data, 'attributes.isLiked', null);
        if ($isLiked !== null) {
            return $this->Like($request, $fileShareId, $isLiked);
        }

        // 更新
        return $this->Update($request, $data, $fileShareId);
    }

    private function Like($request, $fileShareId, $isLiked)
    {
        $fileShare = FileShare::find($fileShareId);
        $file = $fileShare->file;

        $result = $this->client->like($fileShare->id, $file->id, $isLiked);
        if ($result->status() != 200) {
            throw new Exception('bad_request');
        }

        $result = strtolower($result->body());
        if ($result !== 'true') {
            throw new Exception('bad_request');
        }

        $file = FileShare::find($fileShareId);
        $include = $this->extractInclude($request);
        $file->loadMissing($include);

        return $file;
    }

    private function Update($request, $data, $fileShareId)
    {
        $fileShare = FileShare::find($fileShareId);

        $data = Arr::get($data, 'attributes', null);

        $param = ['shared_desc', 'password', 'is_anonymous', 'cost'];
        foreach ($param as $s) {
            if (Arr::has($data, $s)) {
                $fileShare->{$s} = Arr::get($data, $s);
            }
        }

        $result = $this->client->shareUpdate($fileShare);
        if ($result->status() != 200) {
            throw new Exception('bad_request');
        }

        $result = strtolower($result->body());
        if ($result !== 'true') {
            throw new Exception('bad_request');
        }

        $file = FileShare::find($fileShareId);
        $include = $this->extractInclude($request);
        $file->loadMissing($include);

        return $file;
    }

}

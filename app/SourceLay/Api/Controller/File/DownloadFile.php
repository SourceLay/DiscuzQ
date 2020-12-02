<?php


namespace App\SourceLay\Api\Controller\File;


use App\SourceLay\Api\Serializer\FileSerializer;
use App\SourceLay\Library\SourceLayClient;
use App\SourceLay\Models\File;
use Discuz\Api\Controller\AbstractResourceController;
use Discuz\Auth\Guest;
use Exception;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;

class  DownloadFile extends AbstractResourceController
{
    public $optionalInclude = [
        'user'
    ];

    /**
     * {@inheritdoc}
     */
    public $include = [
    ];
    /**
     * @var string
     */
    public $serializer = FileSerializer::class;
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

        $fileId = Arr::get($request->getQueryParams(), 'id');

        $result = $this->client->fileGetFileDownloadUrl($fileId);

        $file = File::find($fileId);
        $file->downloadUrl = $result->body();

        return $file;
    }

}

<?php


namespace App\SourceLay\Api\Controller\FileShare;


use App\SourceLay\Api\Serializer\FileShareSerializer;
use App\SourceLay\Library\SourceLayClient;
use App\SourceLay\Models\FileShare;
use Discuz\Api\Controller\AbstractResourceController;
use Discuz\Auth\Guest;
use Exception;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;

class DownloadFileShare extends AbstractResourceController
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

        if (strtolower($request->getMethod()) == 'get') {
            $shareId = Arr::get($request->getQueryParams(), 'id');

            $result = $this->client->fileGetShareDownloadUrl($shareId);

            $file = FileShare::find($shareId);
            $file->downloadUrl = $result->body();
        } else {
            $fileShareIdParam = Arr::get($request->getQueryParams(), 'id');
            $data = Arr::get($request->getParsedBody(), 'data', []);

            $fileShareId = Arr::get($data, 'attributes.id', $fileShareIdParam);
            if ($fileShareId === null || $fileShareId != $fileShareIdParam) {
                throw new Exception('invalid_arguments');
            }

            $password = Arr::get($data, 'attributes.password', null);
            if ($password === null || $password == '') {
                throw new Exception('invalid_arguments');
            }

            $result = $this->client->getShareDownloadUrlByPassword($fileShareId, $password);

            $file = FileShare::find($fileShareId);
            $file->downloadUrl = $result->body();
        }

        return $file;
    }

}

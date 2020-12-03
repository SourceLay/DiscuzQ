<?php


namespace App\SourceLay\Api\Controller\File;


use App\SourceLay\Api\Serializer\FileSerializer;
use App\SourceLay\Library\SourceLayClient;
use App\SourceLay\Models\File;
use Discuz\Api\Controller\AbstractCreateController;
use Discuz\Auth\Guest;
use Exception;
use GuzzleHttp\Psr7\MimeType;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;

class CreateFile extends AbstractCreateController
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


        $data = Arr::get($request->getParsedBody(), 'data', []);

        $name = Arr::get($data, 'attributes.name', null);
        $type = Arr::get($data, 'attributes.type', null);
        if ($type != 'text/directory') {
            $type = MimeType::fromFilename($name);
            if ($type == null) {
                $type = 'application/octet-stream';
            }
        }
        $size = Arr::get($data, 'attributes.size', null);
        $folder = Arr::get($data, 'attributes.folder', null);

        if ($name === null || $type === null || $size === null || $folder === null || !is_string($folder)) {
            throw new Exception('invalid_arguments');
        }

        if ($folder[strlen($folder) - 1] != '/') {
            $folder .= '/';
        }

        $result = $this->client->fileRequestUploadURL($name, $folder, $type, $size);

        $result = $result->json();

        if ($type != 'text/directory') {
            $file = File::where('random_id', $result['guid'])->first();
            $uploadUrl = Arr::get($result, 'url', null);
            if ($uploadUrl == null) {
                throw new Exception("bad_request");
            }
            $file->uploadUrl = $uploadUrl;
        } else {
            $file = File::where('random_id', $result['guid'])->first();
        }

        return $file;
    }

}

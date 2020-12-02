<?php


namespace App\SourceLay\Api\Controller\File;


use App\SourceLay\Api\Serializer\FileSerializer;
use App\SourceLay\Library\SourceLayClient;
use App\SourceLay\Models\File;
use Discuz\Api\Controller\AbstractDeleteController;
use Discuz\Auth\Guest;
use Exception;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;

class DeleteFile extends AbstractDeleteController
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

    public function __construct(SourceLayClient $client){
        $this->client = $client;
    }


    protected function delete(ServerRequestInterface $request)
    {
        $actor = $request->getAttribute('actor');
        if ($actor instanceof Guest) {
            throw new Exception('permission_denied');
        }
        $this->client->actor = $actor;

        $data = $request->getParsedBody()->get('data', []);

        $fileId = Arr::get($data, 'attributes.id', null);
        if ($fileId === null) {
            throw new Exception('invalid_arguments');
        }

        $result = $this->client->fileDeleteFile($fileId);
        if ($result->status() != 200) {
            throw new Exception('bad_request');
        }

        $result = strtolower($result->body());
        if ($result !== '0') {
            // TODO
            throw new Exception('bad_request');
        }

        // $file = File::find($fileId);
        // return $file;
    }
}

<?php


namespace App\SourceLay\Api\Controller\FileShare;


use App\SourceLay\Api\Serializer\FileShareSerializer;
use App\SourceLay\Library\SourceLayClient;
use Discuz\Api\Controller\AbstractDeleteController;
use Discuz\Auth\Guest;
use Exception;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;

class DeleteFileShare extends AbstractDeleteController
{
    public $optionalInclude = [
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


    protected function delete(ServerRequestInterface $request)
    {
        $actor = $request->getAttribute('actor');
        if ($actor instanceof Guest) {
            throw new Exception('permission_denied');
        }
        $this->client->actor = $actor;

        $fileShareId = Arr::get($request->getQueryParams(), 'id');
        if ($fileShareId === null) {
            throw new Exception('invalid_arguments');
        }

        $result = $this->client->shareDeleteShareByShareId($fileShareId);
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

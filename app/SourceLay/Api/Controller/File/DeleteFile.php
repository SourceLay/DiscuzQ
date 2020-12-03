<?php


namespace App\SourceLay\Api\Controller\File;


use App\SourceLay\Api\Serializer\FileSerializer;
use App\SourceLay\Library\SourceLayClient;
use Discuz\Api\Controller\AbstractDeleteController;
use Discuz\Auth\Guest;
use Exception;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;

class DeleteFile extends AbstractDeleteController
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
    public $serializer = FileSerializer::class;

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

        $fileId = Arr::get($request->getQueryParams(), 'id');
        if ($fileId === null) {
            throw new Exception('invalid_arguments');
        }

        $result = $this->client->fileDeleteFile($fileId);

        // $file = File::find($fileId);
        // return $file;
    }
}

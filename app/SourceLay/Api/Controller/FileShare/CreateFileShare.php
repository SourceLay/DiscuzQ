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

class CreateFileShare extends AbstractCreateController
{
    public $optionalInclude = [
        'user', 'file'
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


        $data = $request->getParsedBody()->get('data', []);

        $fileShare = new FileShare();

        $fileShare->id = 0;
        $fileShare->file_id = Arr::get($data, 'attributes.file_id', null);;
        $fileShare->user_id = $actor->id;
        $fileShare->shared_desc = Arr::get($data, 'attributes.shared_desc', null);;
        $fileShare->shared_type = Arr::get($data, 'attributes.shared_type', 0);;
        $fileShare->password = $fileShare->shared_type == 1 ? Arr::get($data, 'attributes.shared_type', null) : null;
        $fileShare->is_anonymous = Arr::get($data, 'attributes.is_anonymous', false);;
        $fileShare->cost = $fileShare->shared_type == 2 ? Arr::get($data, 'attributes.cost', 0) : null;
        $fileShare->view_count = 0;
        $fileShare->download_count = 0;
        $fileShare->is_recommended = false;
        $fileShare->recommended_at = null;
        $fileShare->created_at = null;
        $fileShare->deleted_at = null;
        $fileShare->deleted_id = 0;

        if (
            $fileShare->file_id == null
            ||
            (!is_numeric($fileShare->shared_type))
            ||
            $fileShare->shared_type < 0
            ||
            $fileShare->shared_type > 2
            ||
            $fileShare->shared_type == 1 && ($fileShare->password == null || $fileShare->password == '')
            ||
            $fileShare->shared_type == 2 && $fileShare->cost <= 0
        ) {
            throw new Exception('invalid_arguments');
        }

        $result = $this->client->shareShareByAll($fileShare);

        $fileShare = FileShare::find($result);

        return $fileShare;
    }

}

<?php


namespace App\SourceLay\Library;


use App\SourceLay\Models\FileShare;
use Discuz\Auth\Guest;
use Exception;
use Illuminate\Http\Client\PendingRequest;
use Illuminate\Http\Client\Response;
use Illuminate\Support\Arr;

class SourceLayClient
{
    private $baseUrl;

    public $actor = null;

    /**
     * @param $url
     * @param $params
     * @return Response
     * @throws Exception
     */
    private function sendRequest($url, $params)
    {
        if ($this->actor == null || $this->actor instanceof Guest) {
            throw new Exception('permission_denied');
        }

        if ($this->baseUrl == null || $this->baseUrl == '') {
            throw new Exception('config_error');
        }

        $http = new PendingRequest();
        $http->asForm();
        $http->baseUrl($this->baseUrl);
        $params['userId'] = $this->actor->id;
        return $http->post($url, $params);
    }

    public function __construct()
    {
        $this->baseUrl = $this->config('sourcelay.server.url');
    }

    private function config(string $string, $default = null)
    {
        return (Arr::get(app()['discuz.config'], $string, $default));
    }

    ////////////////////////////////

    public function fileGetFileDownloadUrl($fileId)
    {
        return $this->sendRequest('/file/getFileDownloadUrl', [
            'fileId' => $fileId,
            'minutes' => 30
        ]);
    }

    public function fileGetShareDownloadUrl($shareId)
    {
        return $this->sendRequest('/file/getShareDownloadUrl', [
            'shareId' => $shareId,
            'minutes' => 30
        ]);
    }

    public function fileRequestUploadURL($fileName, $folder, $type, $size)
    {
        return $this->sendRequest('/file/requestUploadURL', [
            'name' => $fileName,
            'type' => $type,
            'size' => $size,
            'folder' => $folder,
        ]);
    }

    public function fileInsureUploadSuccessfully($fileId)
    {
        return $this->sendRequest('/file/insureUploadSuccessfully', [
            'fileId' => $fileId
        ]);
    }

    public function fileDeleteFile($fileId)
    {
        return $this->sendRequest('/file/deleteFile', [
            'fileId' => $fileId
        ]);
    }

    ////////////////////////////////

    public function like($shareId, $fileId, $isLike)
    {
        return $this->sendRequest('/like/like', [
            'shareId' => $shareId,
            'fileId' => $fileId,
            'isLike' => $isLike,
        ]);
    }

    ////////////////////////////////

    public function shareShareByAll(FileShare $fileShare) {
        return $this->sendRequest('/share/shareByAll', $fileShare->toRequestArray());
    }

    public function shareUpdate(FileShare $fileShare) {
        return $this->sendRequest('/share/update', $fileShare->toRequestArray());
    }

    // TODO 按照分享 id 删除分享

    ////////////////////////////////

    public function erectRelationBetweenTagAndFile($tagName, $fileId) {
        return $this->sendRequest('/tag/erectRelationBetweenTagAndFile', [
            'tagName' => $tagName,
            'fileId' => $fileId,
        ]);
    }
}

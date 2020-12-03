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

    private static $statuscode = [
            -100 => 'failed_operation',
            -101 => 'failed_operation_updateinfo',
            -102 => 'failed_operation_getinfo',

            -200 => 'failedfile_addfile',
            -201 => 'failedfile_cancelfile',
            -202 => 'failedfile_cancelcancelfile',

            -300 => 'failedfile_downloadfile',
            -301 => 'failedfile_downloadfileouttime',

            -400 => 'failedfile_faileddeletefile_failed',
            -401 => 'failedfile_faileddeletefile_deletenormalfile',
            -402 => 'failedfile_faileddeletefile_deletesharedfile',

            -500 => 'failedlike_addfile',
            -501 => 'failedlike_database',
            -502 => 'failedlike_exist',
            -503 => 'failedlike_notexist',

            -700 => 'failedpermission_failed',
            -701 => 'failedpermission_private',
            -702 => 'failedpermission_nothavepermission',
            -703 => 'failedpermission_notowner',
            -704 => 'failedpermission_password',
            -705 => 'failedpermission_insufficientfund',

            -800 => 'invalidoperation_failed',
            -801 => 'invalidoperation_words',
        ];

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
        $response = $http->post($url, $params);

        if ($response->status() != 200) {
            throw new Exception('bad_request');
        }

        $body = $response->body();
        if (is_numeric($body) && (((int)$body) < 0)) {
            $body = (int)$body;
            $reason = Arr::get(static::$statuscode, $body, null);
            if ($reason) {
                throw new Exception("sourcelay_".$reason);
            } else {
                throw new Exception("bad_request");
            }

        }

        return $response;
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
    public function getShareDownloadUrlByPassword($shareId, $password)
    {
        return $this->sendRequest('/file/getShareDownloadUrl', [
            'shareId' => $shareId,
            'password' => $password,
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

    public function shareDeleteShareByShareId($fileShareId) {
        return $this->sendRequest('/share/cancelSharedFile', [
            'shareId' => $fileShareId,
        ]);
    }


    ////////////////////////////////

    public function erectRelationBetweenTagAndFile($tagName, $fileId) {
        return $this->sendRequest('/tag/erectRelationBetweenTagAndFile', [
            'tagName' => $tagName,
            'fileId' => $fileId,
        ]);
    }
}

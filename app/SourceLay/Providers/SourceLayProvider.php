<?php

namespace App\SourceLay\Providers;

use App\SourceLay\Library\SourceLayClient;
use App\SourceLay\Listeners\FileShareBBCode;
use Discuz\Foundation\AbstractServiceProvider;
use Discuz\Http\RouteCollection;

class SourceLayProvider extends AbstractServiceProvider
{
    /**
     * 注册服务.
     *
     * @return void
     */
    public function register()
    {

    }

    /**
     * 启动函数
     */
    public function boot()
    {
        // 获取路由控制器
        $route = $this->getRoute();

        // API 路由组
        $route->group('/api/sourcelay', function (RouteCollection $route) {
            // 添加一个 API 路由
            $route->get('/file/{id}', 'sourcelay.file.list', \App\SourceLay\Api\Controller\File\DownloadFile::class);
            $route->get('/file', 'sourcelay.file.list', \App\SourceLay\Api\Controller\File\ListFile::class);
            $route->post('/file', 'sourcelay.file.create', \App\SourceLay\Api\Controller\File\CreateFile::class);
            $route->put('/file', 'sourcelay.file.commit', \App\SourceLay\Api\Controller\File\CommitFile::class);
            $route->delete('/file', 'sourcelay.file.delete', \App\SourceLay\Api\Controller\File\DeleteFile::class);

            $route->get('/fileshare', 'sourcelay.fileshare.list', \App\SourceLay\Api\Controller\FileShare\ListFileShare::class);
            $route->patch('/fileshare/{id}', 'sourcelay.fileshare.patch', \App\SourceLay\Api\Controller\FileShare\UpdateFileShare::class);
        });

        // 事件处理类
        $events = $this->app->make('events');

        // 订阅事件
        $events->subscribe(FileShareBBCode::class);

        $this->app->singleton('SourceLayClient', function ($app) {
            return new SourceLayClient();
        });
    }

    /**
     * @return RouteCollection
     */
    private function getRoute()
    {
        return $this->app->make(RouteCollection::class);
    }
}

<?php

namespace App\SourceLay\Providers;

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
            $route->get('/file', 'sourcelay.file.list', \App\SourceLay\Api\Controller\File\ListFile::class);
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

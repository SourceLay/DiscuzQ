<?php

namespace App\Paraparty\Providers;

use App\Paraparty\Api\Controller\Home\HomePageRecommended;
use App\Paraparty\Listeners\ActivitiesListener;
use App\Paraparty\Listeners\ReferencesListener;
use Discuz\Foundation\AbstractServiceProvider;
use Discuz\Http\RouteCollection;

class ParapartyProvider extends AbstractServiceProvider
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
     * 引导服务.
     *
     * @return void
     */
    public function boot()
    {
        // 事件处理类
        $events = $this->app->make('events');

        // 订阅事件
        $events->subscribe(ReferencesListener::class);
        $events->subscribe(ActivitiesListener::class);

        // 获取路由控制器
        $route = $this->getRoute();

        // API 路由组
        $route->group('/api/paraparty', function (RouteCollection $route) {
            // 添加一个 API 路由
            $route->get('/homepage', 'paraparty.homepage', HomePageRecommended::class);
        });

    }

    private function getRoute()
    {
        return $this->app->make(RouteCollection::class);
    }
}

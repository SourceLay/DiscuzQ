<?php

namespace App\Paraparty\Providers;

use App\Paraparty\Listeners\ReferencesListener;
use Discuz\Foundation\AbstractServiceProvider;

class ReferencesProvider extends AbstractServiceProvider
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
    }


}

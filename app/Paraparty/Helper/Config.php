<?php


namespace App\Paraparty\Helper;


use Illuminate\Support\Arr;

class Config
{

    /**
     * @param string $string
     * @param $default
     * @return mixed
     * @throws \Illuminate\Contracts\Container\BindingResolutionException
     */
    public static function get(string $string, $default)
    {
        return (Arr::get(app()['discuz.config'], $string, $default));
    }
}

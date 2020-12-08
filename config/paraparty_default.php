<?php

use Illuminate\Support\Str;

return [
    /**
     * 模仿 GitHub 的帖子引用传送门功能
     */
    "references" =>[
        "url" => [
            "detecting" => [

                /**
                 * 在帖子内容中检索出站内帖子地址
                 */
                // $pattern = "/((https|http):\\/\\/)?\\[::1\\](\\/|\\\\)details(\\/|\\\\)(?<tid>\\d+)([a-zA-Z=\\?\\d\\/#:\\[\\]-]{0,})/";
                "detecting_pattern" => "/((https|http):\\/\\/)?\\[::1\\](\\/|\\\\)details(\\/|\\\\)(?<tid>\\d+)([a-zA-Z=\\?\\d\\/#:\\[\\]-]{0,})/",

                /**
                 * 替换为目标格式
                 */
                "replace_pattern" => "#$5"
            ],
            "update" => [

                /**
                 * 在帖子内容中检索出引用标记
                 */
                "detecting_pattern" => "/(^|\\s)#(?<tid>\d+)/"
            ]
        ],

        /**
         * 引用标记用的 UID
         * 请保证本 uid 不会被普通用户使用
         */
        "bot_user_id" => 2
    ]
];

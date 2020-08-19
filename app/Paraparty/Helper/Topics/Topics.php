<?php


namespace App\Paraparty\Helper\Topics;

use App\Models\Post;
use App\Models\Topic;

class Topics
{
    static public function parser_topics(Post $post){
        $thread = $post -> thread;
        $title = trim($thread->title);

        $s = $title;
        $check_status = false;
        $check_str = '';
        $tags = [];
        $last_valid = 0;
        $i = 0;
        for ($i = 0; $i < strlen($s); $i++){
            $c = $s[$i];
            if ($check_status) {
                $check_str .= $c;
                if ($c == ']') {
                    $atag = trim($check_str, "[]");

                    //TODO 对 $atag 进行权限判断

                    $atopic = Topic::firstOrCreate(
                        ['content' => $atag],
                        ['user_id' => $post->user_id]
                    );

                    array_push($tags, $atopic -> id);
                    $check_status = false;
                    $last_valid = $i + 1;
                } else if ($c == '[') {
                    break;
                }
            } else {
                if ($c == '[') {
                    $check_str = '[';
                    $check_status = true;
                }
                else if ($c == ' ') {
                    continue;
                }
                else break;
            }
        }

        return $tags;
    }
}

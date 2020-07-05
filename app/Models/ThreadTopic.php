<?php

/**
 * Discuz & Tencent Cloud
 * This is NOT a freeware, use is subject to license terms
 */

/**
 * Eric Modified
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Relations\Pivot;
use s9e\TextFormatter\Utils;

use App\Paraparty\Topics\Topics as ParapartyTopics;

/**
 * Models a thread-topic state record in the database.
 *
 * @property int $id
 * @property int $thread_id
 * @property int $topic_id
 * @property Carbon|null $created_at
 * @property Thread $thread
 * @property Topic $topic
 */
class ThreadTopic extends Pivot
{

    const UPDATED_AT = null;

    public $incrementing = true;

    /**
     * 设置主题话题关联关系
     * @param Post $post
     */
    public static function setThreadTopic(Post $post)
    {
        if ($post->is_first) {

            // Eric Modified
            // $topics = Utils::getAttributeValues($post->parsedContent, 'TOPIC', 'id');

            $topics = ParapartyTopics::parser_topics($post);

            $post->thread->topic()->sync($topics);

            $post->thread->topic->each->refreshTopicThreadCount();
        }
    }
}

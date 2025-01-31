<?php

/**
 * Copyright (C) 2020 Tencent Cloud.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Eric Modified
 */

namespace App\Api\Serializer;

use App\Models\Post;
use Tobscure\JsonApi\Relationship;

class PostSerializer extends BasicPostSerializer
{
    /**
     * {@inheritdoc}
     *
     * @param Post $model
     */
    public function getDefaultAttributes($model)
    {
        $attributes = parent::getDefaultAttributes($model);

        $attributes['isFirst'] = (bool) $model->is_first;
        $attributes['isComment'] = false;

        return $attributes;
    }

    /**
     * @param $post
     * @return Relationship
     */
    protected function commentPosts($post)
    {
        if (!$this->canSee($post)) return null;  // Eric Modified
        return $this->hasMany($post, CommentPostSerializer::class);
    }

    /**
     * @param $post
     * @return Relationship
     */
    protected function lastThreeComments($post)
    {
        if (!$this->canSee($post)) return null;  // Eric Modified
        return $this->hasMany($post, CommentPostSerializer::class);
    }
}

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
use App\Traits\HasPaidContent;
use Discuz\Api\Serializer\AbstractSerializer;
use Illuminate\Contracts\Auth\Access\Gate;
use Tobscure\JsonApi\Relationship;

class BasicPostSerializer extends AbstractSerializer
{
    use HasPaidContent;

    /**
     * {@inheritdoc}
     */
    protected $type = 'posts';

    /**
     * @var Gate
     */
    protected $gate;

    /**
     * @param Gate $gate
     */
    public function __construct(Gate $gate)
    {
        $this->gate = $gate;
    }

    /**
     * {@inheritdoc}
     *
     * @param Post $model
     */
    protected function getDefaultAttributes($model)
    {
        $this->paidContent($model);

        $gate = $this->gate->forUser($this->actor);

        $canEdit = $gate->allows('edit', $model);

        $attributes = [
            'replyUserId'       => $model->reply_user_id,
            'replyPostId'       => $model->reply_post_id,       // Eric Modified
            // 'summary'           => $model->summary,
            // 'summaryText'       => $model->summary_text,
            // 'content'           => $model->content,          // Eric Modified
            // 'contentHtml'       => $model->formatContent(),
            'replyCount'        => (int) $model->reply_count,
            'likeCount'         => (int) $model->like_count,
            'longitude'         => $model->longitude,
            'latitude'          => $model->latitude,
            'createdAt'         => $this->formatDate($model->created_at),
            'updatedAt'         => $this->formatDate($model->updated_at),
            'isApproved'        => (int) $model->is_approved,
            'canEdit'           => $canEdit,
            'canApprove'        => $gate->allows('approve', $model),
            'canDelete'         => $gate->allows('delete', $model),
            'canHide'           => $gate->allows('hide', $model),
        ];

        if ($canEdit || $this->actor->id === $model->user_id) {
            $attributes += [
                'ip'    => $model->ip,
                'port'  => $model->port,
            ];
        }

        // Eric Modified
        $canSee = true;

        if ($model->deleted_at) {
            $attributes['isDeleted'] = true;
            $attributes['deletedAt'] = $this->formatDate($model->deleted_at);

            // Eric Modified
            if (!$this->actor->can('viewTrashed')) $canSee = false;

        } else {
            $attributes['isDeleted'] = false;
        }

        if ($model->is_approved != 1) {
            if (!$this->actor->can('approvePosts')) $canSee = false;
        }

        // Eric Modified
        if ($canSee) {
            $attributes['summary']      = $model->summary;
            $attributes['summaryText']  = $model->summary_text;
            $attributes['content']      = $model->content;
            $attributes['contentHtml']  = $model->formatContent();
        }
        else {
            $attributes['summary']      = null;
            $attributes['summaryText']  = null;
            $attributes['content']      = null;
            $attributes['contentHtml']  = null;
        }

        Post::setStateUser($this->actor);

        return $attributes;
    }

    /**
     * @param $post
     * @return Relationship
     */
    protected function user($post)
    {
        return $this->hasOne($post, UserSerializer::class);
    }

    /**
     * @param $post
     * @return Relationship
     */
    protected function thread($post)
    {
        return $this->hasOne($post, ThreadSerializer::class);
    }

    /**
     * @param $post
     * @return Relationship
     */
    protected function replyUser($post)
    {
        return $this->hasOne($post, UserSerializer::class);
    }

    /**
     * @param $post
     * @return Relationship
     */
    protected function deletedUser($post)
    {
        return $this->hasOne($post, UserSerializer::class);
    }

    /**
     * @param $post
     * @return Relationship
     */
    protected function likedUsers($post)
    {
        // Eric Modified
        $canSee = true;

        if ($post->deleted_at) {
            if (!$this->actor->can('viewTrashed')) $canSee = false;
        }

        if ($post->is_approved != 1) {
            if (!$this->actor->can('approvePosts')) $canSee = false;
        }

        if ($canSee) {
            return $this->hasMany($post, UserSerializer::class);
        }
        else {
            return null;
        }
    }

    /**
     * @param $post
     * @return Relationship
     */
    public function mentionUsers($post)
    {
        return $this->hasMany($post, UserSerializer::class);
    }

    /**
     * @param $post
     * @return Relationship
     */
    protected function images($post)
    {
        return $this->hasMany($post, AttachmentSerializer::class);
    }

    /**
     * @param $post
     * @return Relationship
     */
    protected function attachments($post)
    {
        return $this->hasMany($post, AttachmentSerializer::class);
    }

    /**
     * @param $post
     * @return Relationship
     */
    public function logs($post)
    {
        return $this->hasMany($post, UserActionLogsSerializer::class);
    }

    /**
     * @param $post
     * @return Relationship
     */
    public function lastDeletedLog($post)
    {
        return $this->hasOne($post, UserActionLogsSerializer::class);
    }
}

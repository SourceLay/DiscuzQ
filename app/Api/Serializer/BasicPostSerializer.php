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
use s9e\TextFormatter\Utils;
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

        // 插入文中的图片及附件 ID
        $contentAttachIds = collect(
            Utils::getAttributeValues($model->getRawOriginal('content'), 'IMG', 'title')
        )->merge(
            Utils::getAttributeValues($model->getRawOriginal('content'), 'URL', 'title')
        )->unique()->values();

        $attributes = [
            'replyUserId'       => $model->reply_user_id,
            'replyPostId'       => $model->reply_post_id,       // Eric Modified
            // 'summary'           => $model->summary,
            // 'summaryText'       => $model->summary_text,
            // 'content'           => $model->content,          // Eric Modified
            // 'contentHtml'       => $model->formatContent(),
            'replyCount'        => (int) $model->reply_count,
            'likeCount'         => (int) $model->like_count,
            'createdAt'         => $this->formatDate($model->created_at),
            'updatedAt'         => $this->formatDate($model->updated_at),
            'isApproved'        => (int) $model->is_approved,
            'canEdit'           => $canEdit,
            'canApprove'        => $gate->allows('approve', $model),
            'canDelete'         => $gate->allows('delete', $model),
            'canHide'           => $gate->allows('hide', $model),
            'contentAttachIds'  => $contentAttachIds,
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
            if (($model->user_id != $this->actor->id) && (!$this->actor->can('approvePosts'))) $canSee = false;
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

        // 楼层号
        if ($model->floor) {
            $attributes['floor']  = $model->floor;
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
        if (!$this->canSee($post)) return null;  // Eric Modified
        return $this->hasOne($post, ThreadSerializer::class);
    }

    /**
     * @param $post
     * @return Relationship
     */
    protected function replyUser($post)
    {
        if (!$this->canSee($post)) return null;  // Eric Modified
        return $this->hasOne($post, UserSerializer::class);
    }

    /**
     * @param $post
     * @return Relationship
     */
    protected function deletedUser($post)
    {
        if (!$this->canSee($post)) return null;  // Eric Modified
        return $this->hasOne($post, UserSerializer::class);
    }

    /**
     * @param $post
     * @return Relationship
     */
    protected function likedUsers($post)
    {
        if (!$this->canSee($post)) return null;  // Eric Modified
        return $this->hasMany($post, UserSerializer::class);
    }

    /**
     * @param $post
     * @return Relationship
     */
    public function mentionUsers($post)
    {
        if (!$this->canSee($post)) return null;  // Eric Modified
        return $this->hasMany($post, UserSerializer::class);
    }

    /**
     * @param $post
     * @return Relationship
     */
    protected function images($post)
    {
        if (!$this->canSee($post)) return null;  // Eric Modified
        return $this->hasMany($post, AttachmentSerializer::class);
    }

    /**
     * @param $post
     * @return Relationship
     */
    protected function attachments($post)
    {
        if (!$this->canSee($post)) return null;  // Eric Modified
        return $this->hasMany($post, AttachmentSerializer::class);
    }

    /**
     * @param $post
     * @return Relationship
     */
    public function logs($post)
    {
        if (!$this->canSee($post)) return null;  // Eric Modified
        return $this->hasMany($post, UserActionLogsSerializer::class);
    }

    /**
     * @param $post
     * @return Relationship
     */
    public function lastDeletedLog($post)
    {
        if (!$this->canSee($post)) return null;  // Eric Modified
        return $this->hasOne($post, UserActionLogsSerializer::class);
    }

    /**
     * 该回复是否可见
     *
     * @param $post
     * @return bool
     */
    protected function canSee($post)
    {
        $canSee = true;

        if ($post->deleted_at) {
            if (!$this->actor->can('viewTrashed')) $canSee = false;
        }

        if ($post->is_approved != 1) {
            if (($post->user_id != $this->actor->id) && (!$this->actor->can('approvePosts'))) $canSee = false;
        }

        return $canSee;
    }
}

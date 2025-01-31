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

namespace App\Api\Controller\Topic;

use App\Api\Serializer\TopicSerializer;
use App\Repositories\TopicRepository;
use Discuz\Api\Controller\AbstractResourceController;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;

class ResourceTopicController extends AbstractResourceController
{
    public $serializer = TopicSerializer::class;

    public $optionalInclude = ['user'];

    public $topics;

    public function __construct(TopicRepository $topics)
    {
        $this->topics = $topics;
    }

    /**
     * {@inheritdoc}
     */
    protected function data(ServerRequestInterface $request, Document $document)
    {
        $id = Arr::get($request->getQueryParams(), 'id', 0);

        try {
            if (is_numeric($id)) {
                return $this->topics->findOrFail($id);
            }
        } catch (\Exception $e){}

        $id = urldecode($id);

        return $this->topics->searchOrFail($id);
    }
}

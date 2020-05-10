<?php

/**
 * Discuz & Tencent Cloud
 * This is NOT a freeware, use is subject to license terms
 */

/**
 * Eric Modified
 */

use Discuz\Database\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateReferences extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $this->schema()->create('paraparty_reference', function (Blueprint $table) {
            $table->id()->comment('引用编号');
            $table->unsignedBigInteger('post_id')->comment('回复编号');
            $table->unsignedBigInteger('target_tid')->comment('目标帖子编号');
            $table->unsignedBigInteger('target_pid')->comment('目标回复编号');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        $this->schema()->dropIfExists('paraparty_reference');
    }
}

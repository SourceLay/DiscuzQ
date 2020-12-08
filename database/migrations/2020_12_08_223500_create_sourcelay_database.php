<?php

use Discuz\Database\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateSourcelayDatabase extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $this->schema()->create('sourcelay_file_info', function (Blueprint $table) use (&$tableName) {
            $tableName = config('database.connections.mysql.prefix') . $table->getTable();

            $table->id()->comment("文件编号");
            $table->bigInteger('user_id')->comment('上传用户id');
            $table->string('name')->comment('文件名');
            $table->string('type',127)->comment('文件MIME类型');
            $table->string('folder')->comment('文件所在的目录');
            $table->bigInteger('size')->comment('文件大小');
            $table->string('md5')->nullable()->comment('文件校验码');
            $table->smallInteger('status')->nullable()->comment('文件状态');
            $table->integer('download_count')->default('0')->comment('文件下载量');
            $table->integer('like_count')->default('0')->comment('文件点赞量');
            $table->datetime('created_at')->comment('文件上传时间');
            $table->datetime('updated_at')->comment('文件更新时间');
            $table->tinyInteger('is_shared')->comment('文件是否分享');
            $table->tinyInteger('is_essence')->comment('文件是否加精');
            $table->datetime('deleted_at')->nullable()->comment('文件删除时间');
            $table->bigInteger('deleted_id')->nullable()->comment('执行删除操作的用户id');
            $table->string('random_id',64)->nullable()->comment('随机生成的文件id');
            $table->string('storage_name',64)->nullable()->comment('在COS中的存储名');
        });
        $sql = "ALTER TABLE $tableName " .
            "MODIFY COLUMN `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '文件更新时间' AFTER `created_at`";
        $this->schema()->getConnection()->statement($sql);

        $this->schema()->create('sourcelay_file_like_info', function (Blueprint $table) {
            $table->id()->comment('点赞id');
            $table->bigInteger('user_id')->comment('用户id');
            $table->datetime('created_at')->comment('点赞时间');
            $table->bigInteger('file_id')->nullable()->comment('文件id');

            $table->index('user_id');
            $table->index('file_id');
        });

        $this->schema()->create('sourcelay_file_shared_info', function (Blueprint $table) {
            $table->id()->comment('分享id');
            $table->bigInteger('file_id')->comment('文件id');
            $table->bigInteger('user_id')->comment('文件分享者');
            $table->string('shared_desc')->nullable()->comment('文件分享描述');
            $table->smallInteger('shared_type')->comment('文件分享类型(0免费，1密码，2付费）');
            $table->string('password',128)->nullable()->comment('文件分享密码');
            $table->tinyInteger('is_anonymous')->comment('文件是否匿名分享');
            $table->integer('cost')->nullable()->comment('文件所需积分');
            $table->integer('view_count')->nullable()->comment('文件浏览数');
            $table->integer('download_count')->nullable()->comment('文件下载数');
            $table->tinyInteger('is_recommended')->comment('是否被推荐');
            $table->datetime('recommended_at')->nullable()->comment('推荐时间');
            $table->datetime('created_at')->nullable()->comment('分享时间');
            $table->datetime('deleted_at')->nullable()->comment('撤销分享时间');
            $table->bigInteger('deleted_id')->nullable()->comment('撤销分享的id');
        });

        $this->schema()->create('sourcelay_file_sharedorder', function (Blueprint $table) {
            $table->bigInteger('order_id')->comment('订单编号');
            $table->bigInteger('fileshared_id')->comment('文件分享编号');
            $table->datetime('created_at')->comment('订单创建时间');
            $table->datetime('updated_at')->comment('订单更新时间');
            $table->primary('order_id');

            $table->index('fileshared_id');
        });

        $this->schema()->create('sourcelay_file_tag_relation_info', function (Blueprint $table) {
            $table->id()->comment('记录编号');
            $table->bigInteger('file_id')->comment('文件id');
            $table->bigInteger('tag_id')->comment('标签编号');;
            $table->datetime('created_at')->nullable()->comment('关系建立时间');;

            $table->index('file_id');
            $table->index('tag_id');
        });

        $this->schema()->create('sourcelay_file_thread_relation_info', function (Blueprint $table) {
            $table->id()->comment('关系编号');
            $table->bigInteger('file_id')->nullable()->comment('文件编号');
            $table->bigInteger('fileshare_id')->nullable()->comment('分享编号');
            $table->bigInteger('thread_id')->nullable()->comment('帖子编号');
            $table->bigInteger('post_id')->nullable()->comment('回复编号');
            $table->integer('priority')->nullable()->comment('对应帖子权重');
            $table->datetime('created_at')->nullable()->comment('关系建立时间');

            $table->index(['file_id', 'priority']);
            $table->index(['fileshare_id', 'priority']);
        });

        $this->schema()->create('sourcelay_tag_info', function (Blueprint $table) {
            $table->id()->comment('标签编号');
            $table->string('name')->nullable()->comment('tag名');
            $table->bigInteger('user_id')->nullable()->comment('创建tag的用户id');
            $table->integer('file_count')->nullable()->comment('与该tag相关的文件数');
            $table->integer('download_count')->nullable()->comment('与该tag相关的文件下载数');
            $table->integer('view_count')->nullable()->comment('该tag下文件的浏览数');
            $table->tinyInteger('is_recommended')->nullable()->comment('是否推荐该tag');
            $table->datetime('recommended_at')->nullable()->comment('推荐时间');
        });

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        $this->schema()->dropIfExists('sourcelay_file_info');
        $this->schema()->dropIfExists('sourcelay_file_like_info');
        $this->schema()->dropIfExists('sourcelay_file_shared_info');
        $this->schema()->dropIfExists('sourcelay_file_sharedorder');
        $this->schema()->dropIfExists('sourcelay_file_tag_relation_info');
        $this->schema()->dropIfExists('sourcelay_file_thread_relation_info');
        $this->schema()->dropIfExists('sourcelay_tag_info');
    }
}

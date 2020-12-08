<?php

use Discuz\Database\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateParapartyHomepage extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $this->schema()->create('paraparty_homepage_banners', function (Blueprint $table) {
            $table->id()->comment('横幅编号');
            $table->smallInteger('status')->comment('横幅状态，1表示可用，0表示不可用');
            $table->integer('weight')->comment('权重');
            $table->string('title')->comment('横幅标题');
            $table->string('sub_title')->comment('横幅小标题');
            $table->string('bin_text')->comment('按钮文本');
            $table->string('url')->comment('按钮超链接');
            $table->string('image')->comment('横幅图片地址');
            $table->string('background')->comment('横幅背景图');
        });

        $this->schema()->create('paraparty_homepage_sliders', function (Blueprint $table) {
            $table->id()->comment('幻灯片编号');
            $table->smallInteger('status')->comment('横幅状态，1表示可用，0表示不可用');
            $table->integer('weight')->comment('权重');
            $table->string('title')->comment('横幅标题');
            $table->string('author')->comment('作者');
            $table->string('image')->comment('幻灯片图片地址');
            $table->integer('thread_id')->comment('帖子编号');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        $this->schema()->dropIfExists('paraparty_homepage_banners');
        $this->schema()->dropIfExists('paraparty_homepage_sliders');
    }
}

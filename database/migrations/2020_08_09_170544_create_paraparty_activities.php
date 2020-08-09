<?php

use Discuz\Database\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateParapartyActivities extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $this->schema()->create('paraparty_activities', function (Blueprint $table) {
            $table->id()->index()->comment('回复编号');
            $table->unsignedBigInteger('thread_id')->index()->comment('帖子编号');
            $table->tinyInteger('is_first')->unsigned()->default(0)->comment('是否首个回复');
            $table->unsignedBigInteger('category_id')->comment('板块编号');
            $table->dateTime('created_at')->index()->comment('创建时间');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        $this->schema()->dropIfExists('paraparty_activities');
    }
}

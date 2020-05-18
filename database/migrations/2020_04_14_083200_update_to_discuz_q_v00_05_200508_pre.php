<?php

/**
 * Eric Modified
 * 本文件建立于 20200518
 */

use Discuz\Database\Migration;
use Illuminate\Database\Schema\Blueprint;

class UpdateToDiscuzQV0005200508Pre extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $this->schema()->table('users', function (Blueprint $table) {
			$table->tinyInteger('mobile_confirmed')->unsigned()->default(0)->comment('手机号是否验证');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        $this->schema()->table('users', function (Blueprint $table) {
			$table->dropColumn('mobile_confirmed');
		});
    }
}

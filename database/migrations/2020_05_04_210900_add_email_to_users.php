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

class AddEmailToUsers extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $this->schema()->table('users', function (Blueprint $table) {
            $table->string('email', 512)->nullable()->comment('注册邮箱')->after('register_reason');
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
			$table->dropColumn('email');
		});
    }
}

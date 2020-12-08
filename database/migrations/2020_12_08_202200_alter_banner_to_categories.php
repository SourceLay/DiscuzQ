<?php

use Discuz\Database\Migration;
use Illuminate\Database\Schema\Blueprint;

class AlterBannerToCategories extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $this->schema()->table('categories', function (Blueprint $table) {
            $table->string('banner')->default('')->comment('板块头图');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        $this->schema()->table('threads', function (Blueprint $table) {
            //
        });
    }
}

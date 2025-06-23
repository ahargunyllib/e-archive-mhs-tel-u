<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('achievements', function (Blueprint $table) {
            $table->ulid('id')->primary();
            $table->string('name');
            $table->date('date');
            $table->integer("type")->default(1); // 1: internal, 2: external
            $table->integer("set_type")->default(1); // 1: regular, 2: special
            $table->string('achiever');
            $table->string('member')->nullable();
            $table->string('certificate');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('achievements');
    }
};

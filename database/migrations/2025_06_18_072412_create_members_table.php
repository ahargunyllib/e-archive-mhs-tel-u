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
        Schema::create('members', function (Blueprint $table) {
            $table->ulid('id')->primary();
            $table->string('name');
            $table->string('address');
            $table->string('contact');
            $table->string('division');
            $table->integer('set_type')->default(1);
            $table->integer('batch_year')->default(1);
            $table->integer('period')->default(1);
            $table->string('photo_profile')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('members');
    }
};

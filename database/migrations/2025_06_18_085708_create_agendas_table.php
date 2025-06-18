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
        Schema::create('agendas', function (Blueprint $table) {
            $table->ulid("id")->primary();
            $table->string("name");
            $table->string("description");
            $table->date("date");
            $table->string("work_program");
            $table->integer("set_type")->default(1);
            $table->string("relationship");
            $table->float("estimated_cost");
            $table->string("proposal");
            $table->string("report");
            $table->integer("status")->default(1);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('agendas');
    }
};

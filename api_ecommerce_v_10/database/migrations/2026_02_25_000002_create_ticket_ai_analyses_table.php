<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('ticket_ai_analyses', function (Blueprint $table) {
            $table->id();
            $table->foreignId('ticket_id')->unique()->constrained('support_tickets')->onDelete('cascade');
            $table->unsignedTinyInteger('staff_rating')->nullable();   // 1–5 AI assessment
            $table->boolean('treated_poorly')->default(false);
            $table->text('poor_treatment_reason')->nullable();
            $table->string('main_issue')->nullable();
            $table->string('resolved')->nullable();  // 'sí' | 'no' | 'parcialmente'
            $table->text('summary')->nullable();
            $table->timestamp('analyzed_at')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('ticket_ai_analyses');
    }
};

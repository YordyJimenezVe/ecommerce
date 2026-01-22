<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMissingCommerceTables extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // 1. Categories
        if (!Schema::hasTable('categories')) {
            Schema::create('categories', function (Blueprint $table) {
                $table->id();
                $table->string('name');
                $table->string('imagen')->nullable();
                $table->string('icono')->nullable();
                $table->timestamps();
                $table->softDeletes();
            });
        }

        // 2. Subcategories (New Table)
        if (!Schema::hasTable('subcategories')) {
            Schema::create('subcategories', function (Blueprint $table) {
                $table->id();
                $table->unsignedBigInteger('categorie_id'); // Relation to global Category
                $table->string('name');
                $table->timestamps();
                $table->softDeletes();

                $table->foreign('categorie_id')->references('id')->on('categories')->onDelete('cascade');
            });
        }

        // 3. Products
        if (!Schema::hasTable('products')) {
            Schema::create('products', function (Blueprint $table) {
                $table->id();
                $table->string('title');
                $table->string('slug')->unique();
                $table->string('sku')->nullable();
                $table->unsignedBigInteger('categorie_id');
                $table->decimal('price_soles', 10, 2)->default(0);
                $table->decimal('price_usd', 10, 2)->default(0);
                $table->string('imagen')->nullable();
                $table->text('resumen')->nullable();
                $table->longText('description')->nullable();
                $table->string('tags')->nullable();
                $table->integer('stock')->default(0);
                $table->tinyInteger('state')->default(1); // 1: Active, 2: Inactive?
                $table->tinyInteger('type_inventario')->default(1);
                $table->timestamps();
                $table->softDeletes();

                $table->foreign('categorie_id')->references('id')->on('categories')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        // Careful with dropping tables if they were pre-existing
        // Just providing logic for new ones
        Schema::dropIfExists('subcategories');
        Schema::dropIfExists('products');
        Schema::dropIfExists('categories');
    }
}

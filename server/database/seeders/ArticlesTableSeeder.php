<?php
// database/seeders/ArticlesTableSeeder.php
namespace Database\Seeders;


use Illuminate\Database\Seeder;
use App\Models\Article;

class ArticlesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Article::factory()->count(10)->create();
    }
}

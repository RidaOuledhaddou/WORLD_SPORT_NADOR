<?php
namespace Database\Factories;

// database/factories/ArticleFactory.php

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Article;

class ArticleFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Article::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'title' => $this->faker->sentence(rand(1, 2)),
            'content' => $this->faker->sentence(rand(4, 6), true),
        ];
    }
}

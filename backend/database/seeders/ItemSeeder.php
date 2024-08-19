<?php

namespace Database\Seeders;

use App\Models\Item;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ItemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Item::factory()->create([
            [
                'name_item' => 'test1',
                'info' => 'info test 1'
            ],
            [
                'name_item' => 'test2',
                'info' => 'info test 2'
            ],
            [
                'name_item' => 'test3',
                'info' => 'info test 3'
            ],
            [
                'name_item' => 'test4',
                'info' => 'info test 4'
            ],
        ]);
    }
}

<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->clearPersistentSessions();

        $this->call([
            RoleSeeder::class,
            ProductTypeSeeder::class,
            ProvinceSeeder::class,
            UserSeeder::class,
            ProductSeeder::class,
            CommentSeeder::class,
        ]);

        $this->clearPersistentSessions();
    }

    protected function clearPersistentSessions(): void
    {
        $sessionPath = storage_path('framework/sessions');

        if (! File::exists($sessionPath)) {
            return;
        }

        foreach (File::files($sessionPath) as $file) {
            File::delete($file);
        }
    }
}
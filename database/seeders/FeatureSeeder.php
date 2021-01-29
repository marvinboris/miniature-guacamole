<?php

namespace Database\Seeders;

use App\Models\Feature;
use App\Models\Role;
use Illuminate\Database\Seeder;

class FeatureSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $features = [
            [
                'name' => "Cycles",
                'prefix' => 'cycles',
            ],
            [
                'name' => "Levels",
                'prefix' => 'levels',
            ],
            [
                'name' => "Classrooms",
                'prefix' => 'classrooms',
            ],
            [
                'name' => "Years",
                'prefix' => 'years',
            ],
            [
                'name' => "Students",
                'prefix' => 'students',
            ],
            [
                'name' => "Subjects",
                'prefix' => 'subjects',
            ],
            [
                'name' => "Sessions",
                'prefix' => 'sessions',
            ],
            [
                'name' => "Trimesters",
                'prefix' => 'trimesters',
            ],
            [
                'name' => "Sequences",
                'prefix' => 'sequences',
            ],
            [
                'name' => "Exam Types",
                'prefix' => 'exam-types',
            ],
            [
                'name' => "Exams",
                'prefix' => 'exams',
            ],
            [
                'name' => "Marks",
                'prefix' => 'marks',
            ],
            [
                'name' => "CMS",
                'prefix' => 'cms',
            ],
            [
                'name' => "Users",
                'prefix' => 'users',
            ],
            [
                'name' => "Roles",
                'prefix' => 'roles',
            ],
            [
                'name' => "Features",
                'prefix' => 'features',
            ],
            [
                'name' => "Languages",
                'prefix' => 'languages',
            ],
        ];

        foreach ($features as $feature) {
            Feature::create($feature);
        }

        foreach (Role::all() as $role) {
            foreach (Feature::all() as $feature) {
                $role->features()->attach($feature->id, [
                    'access' => json_encode(['c', 'u', 'd'])
                ]);
            }
        }
    }
}

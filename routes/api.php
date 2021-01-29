<?php

use App\Models\Language;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::prefix('content')->name('content.')->group(function () {
    Route::get('{language}', function ($lang) {
        $jsonString = file_get_contents(base_path('cms.json'));
        $cmsFile = json_decode($jsonString, true);

        $abbr = $lang;
        if (Language::whereAbbr($lang)->count() === 0) $abbr = env('MIX_DEFAULT_LANG');

        $cms = [
            'global' => $cmsFile['global'],
            'pages' => $cmsFile['pages'][$abbr],
        ];

        return response()->json([
            'cms' => $cms,
        ]);
    })->name('cms');
});

<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
use Illuminate\Support\Facades\Http;

Route::get('/acara', function () {
    $response = Http::withHeaders([
        'Authorization' => 'Bearer ' . env('SUPABASE_SERVICE_ROLE_KEY'),
        'apikey' => env('SUPABASE_SERVICE_ROLE_KEY'),
    ])->get(env('SUPABASE_URL') . '/rest/v1/acara?select=*');
    

    return $response->json();
});

Route::post('/acara', function (Request $request) {
    Log::info('Data diterima:', $request->all());

    $data = [
        'acara' => $request->acara,
        'deskripsi' => $request->deskripsi,
        'lokasi' => $request->lokasi,
        'tanggal' => $request->tanggal,
        'waktu_mulai' => $request->waktu_mulai,
        'waktu_selesai' => $request->waktu_selesai,
        'biaya' => (int) $request->biaya,
        'kuota' => (int) $request->kuota,
        'status' => $request->status,
        'poster' => $request->poster,
    ];

    $response = Http::withHeaders([
        'apikey' => env('SUPABASE_SERVICE_ROLE_KEY'),
        'Authorization' => 'Bearer ' . env('SUPABASE_SERVICE_ROLE_KEY'),
        'Content-Type' => 'application/json',
    ])->post(env('SUPABASE_URL') . '/rest/v1/acara', $data);

    Log::info('Response dari Supabase', ['data' => $data]);

    return $response->json();
});



Route::get('/acara/filter', function () {
    $response = Http::withToken(env('SUPABASE_SERVICE_ROLE_KEY'))
        ->get(env('SUPABASE_URL') . '/rest/v1/acara', [
            'select' => '*',
            'lokasi' => 'eq.Manahan',
            'order' => 'tanggal.desc'
        ]);

    return $response->json();
});

Route::patch('/acara/{id}', function ($id, Illuminate\Http\Request $request) {
    $response = Http::withToken(env('SUPABASE_SERVICE_ROLE_KEY'))
        ->patch(env('SUPABASE_URL') . "/rest/v1/acara?id=eq.$id", [
            'lokasi' => $request->lokasi,
            'status' => $request->status
        ]);

    return $response->json();
});

Route::delete('/acara/{id}', function ($id) {
    $response = Http::withToken(env('SUPABASE_SERVICE_ROLE_KEY'))
        ->delete(env('SUPABASE_URL') . "/rest/v1/acara?id=eq.$id");

    return response()->json(['message' => 'Deleted']);
});



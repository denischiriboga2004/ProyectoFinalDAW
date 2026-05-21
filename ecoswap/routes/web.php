<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\ProductController;
use App\Models\Product;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

// Ruta principal simplificada (oculta tus propios productos si estás logueado)
Route::get('/', function () {
    $query = Product::with(['productImages', 'user'])->where('status', 'active');

    if (Auth::check()) {
        $query->where('user_id', '!=', Auth::id());
    }

    $products = $query->get()->map(function ($product) {
        $product->product_images = $product->productImages->map(function ($img) {
            // CORREGIDO: Evita duplicar la URL si ya se guardó con http:// o /storage en la BD
            $path = $img->image_path;
            $img->url = (str_starts_with($path, 'http') || str_starts_with($path, '/storage')) 
                ? $path 
                : Storage::url($path); 
            return $img;
        });
        return $product;
    });

    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'products' => $products,
    ]);
})->name('welcome');

// Rutas protegidas para usuarios autenticados
Route::middleware('auth')->group(function () {
    
    // NUEVA RUTA: Carga únicamente tus productos con sus imágenes públicas
    Route::get('/mis-productos', function () {
        $myProducts = Product::with(['productImages'])
            ->where('user_id', Auth::id())
            ->get()
            ->map(function ($product) {
                $product->product_images = $product->productImages->map(function ($img) {
                    // CORREGIDO: Evita duplicar la URL si ya se guardó con http:// o /storage en la BD
                    $path = $img->image_path;
                    $img->url = (str_starts_with($path, 'http') || str_starts_with($path, '/storage')) 
                        ? $path 
                        : Storage::url($path); 
                    return $img;
                });
                return $product;
            });

        return Inertia::render('Products/MyProducts', [
            'products' => $myProducts
        ]);
    })->name('products.my');

    // Perfil de usuario
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    
    // Chats
    Route::get('/chat/{product}', [ChatController::class, 'show'])->name('chat.show');
    Route::post('/chat/{product}', [ChatController::class, 'send'])->name('chat.store');
    
    // CRUD de Productos
    Route::get('/products/create', [ProductController::class, 'create'])->name('products.create');
    Route::post('/products', [ProductController::class, 'store'])->name('products.store');
    Route::get('/products/{product}/edit', [ProductController::class, 'edit'])->name('products.edit');
    
    // Soportamos el método PUT simulado de Inertia para actualizar los archivos
    Route::put('/products/{product}', [ProductController::class, 'update'])->name('products.update');
});

require __DIR__.'/auth.php';
<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\ProductController;
use App\Models\Product;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use App\Models\Province;

// Ruta principal simplificada (oculta tus propios productos si estás logueado)
Route::get('/', function () {
    $query = Product::with(['productImages', 'user', 'comments.user'])->where('status', 'active');

    if (Auth::check()) {
        $query->where('user_id', '!=', Auth::id());
    }

    $products = $query->get()->map(function ($product) {
        $product->product_images = $product->productImages->map(function ($img) {
            // CORREGIDO: Usa el campo url cuando existe y solo transforma rutas locales.
            $path = $img->url ?? $img->image_path;
            $img->url = (str_starts_with($path, 'http') || str_starts_with($path, '/storage'))
                ? $path
                : Storage::url($path);
            return $img;
        });
        $product->images = $product->product_images;
        return $product;
    });

    $provinces = Province::orderBy('name')->get();

    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'products' => $products,
        'provinces' => $provinces,
    ]);
})->name('welcome');

// Perfil público de usuario
Route::get('/users/{user}', [ProfileController::class, 'show'])->name('users.show');

// Rutas protegidas para usuarios autenticados (soporta sesión o token Bearer)
Route::middleware('auth.session.or.token')->group(function () {
    
    // NUEVA RUTA: Carga únicamente tus productos con sus imágenes públicas
    Route::get('/mis-productos', function () {
        $myProducts = Product::with(['productImages'])
            ->where('user_id', Auth::id())
            ->get()
            ->map(function ($product) {
                $product->product_images = $product->productImages->map(function ($img) {
                    $path = $img->url ?? $img->image_path;
                    $img->url = (str_starts_with($path, 'http') || str_starts_with($path, '/storage'))
                        ? $path
                        : Storage::url($path);
                    return $img;
                });
                $product->images = $product->product_images;
                return $product;
            });

        return Inertia::render('Products/MyProducts', [
            'products' => $myProducts
        ]);
    })->name('products.my');

    // Dashboard administrativo
    Route::get('/dashboard', [AdminController::class, 'dashboard'])->name('dashboard');

    Route::get('/dashboard/users', [AdminController::class, 'users'])->name('dashboard.users');
    Route::get('/dashboard/users/create', [AdminController::class, 'createUser'])->name('dashboard.users.create');
    Route::post('/dashboard/users', [AdminController::class, 'storeUser'])->name('dashboard.users.store');
    Route::get('/admin/users/{user}/edit', [AdminController::class, 'editUser'])->name('admin.users.edit');
    Route::put('/admin/users/{user}', [AdminController::class, 'updateUser'])->name('admin.users.update');
    Route::put('/admin/users/{user}/status', [AdminController::class, 'toggleUserStatus'])->name('admin.users.toggleStatus');

    Route::get('/dashboard/products', [AdminController::class, 'products'])->name('dashboard.products');
    Route::get('/dashboard/products/create', [ProductController::class, 'create'])->name('dashboard.products.create');
    Route::post('/dashboard/products', [ProductController::class, 'store'])->name('dashboard.products.store');
    Route::get('/dashboard/products/{product}/edit', [ProductController::class, 'edit'])->name('dashboard.products.edit');
    Route::put('/dashboard/products/{product}', [ProductController::class, 'update'])->name('dashboard.products.update');

    Route::get('/dashboard/comments', [AdminController::class, 'comments'])->name('dashboard.comments');
    Route::get('/dashboard/comments/create', [AdminController::class, 'createComment'])->name('dashboard.comments.create');
    Route::post('/dashboard/comments', [AdminController::class, 'storeComment'])->name('dashboard.comments.store');
    Route::get('/admin/comments/{comment}/edit', [AdminController::class, 'editComment'])->name('admin.comments.edit');
    Route::put('/admin/comments/{comment}', [AdminController::class, 'updateComment'])->name('admin.comments.update');
    Route::put('/admin/comments/{comment}/status', [AdminController::class, 'toggleCommentStatus'])->name('admin.comments.toggleStatus');

    Route::get('/dashboard/images', [AdminController::class, 'images'])->name('dashboard.images');
    Route::get('/dashboard/images/create', [AdminController::class, 'createImage'])->name('dashboard.images.create');
    Route::post('/dashboard/images', [AdminController::class, 'storeImage'])->name('dashboard.images.store');

    Route::get('/dashboard/roles', [AdminController::class, 'roles'])->name('dashboard.roles');
    Route::get('/dashboard/roles/create', [AdminController::class, 'createRole'])->name('dashboard.roles.create');
    Route::post('/dashboard/roles', [AdminController::class, 'storeRole'])->name('dashboard.roles.store');

    Route::get('/dashboard/exchanges', [AdminController::class, 'exchanges'])->name('dashboard.exchanges');
    Route::get('/dashboard/exchanges/create', [AdminController::class, 'createExchange'])->name('dashboard.exchanges.create');
    Route::post('/dashboard/exchanges', [AdminController::class, 'storeExchange'])->name('dashboard.exchanges.store');

    Route::get('/dashboard/product-types', [AdminController::class, 'productTypes'])->name('dashboard.productTypes');
    Route::get('/dashboard/product-types/create', [AdminController::class, 'createProductType'])->name('dashboard.productTypes.create');
    Route::post('/dashboard/product-types', [AdminController::class, 'storeProductType'])->name('dashboard.productTypes.store');

    Route::put('/admin/products/{product}/status', [AdminController::class, 'toggleProductStatus'])->name('admin.products.toggleStatus');

    // Perfil de usuario
    Route::post('/users/{user}/comments', [ProfileController::class, 'storeComment'])->name('users.comments.store');

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
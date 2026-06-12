    <?php

    use App\Http\Controllers\ProfileController;
    use App\Http\Controllers\AdminController;
    use App\Http\Controllers\UserController;
    use App\Http\Controllers\ChatController;
    use App\Http\Controllers\ProductController;
    use App\Http\Controllers\ContactController;
    use App\Http\Controllers\NotificationController;
    use App\Models\Product;
    use App\Models\ProductType;
    use Illuminate\Support\Facades\Route;
    use Illuminate\Support\Facades\Auth;
    use Illuminate\Support\Facades\Storage;
    use Inertia\Inertia;
    use App\Models\Province;

    // Ruta principal simplificada (oculta tus propios productos si estás logueado)
    Route::get('/', function () {
        $query = Product::with(['productImages', 'user', 'comments.user', 'type'])->where('status', 'active');

        if (Auth::check()) {
            $query->where('user_id', '!=', Auth::id());
        }

        // Aplicar filtros de query: provincia y tipo de producto (categoría)
        $selectedProvince = request()->query('province');
        if ($selectedProvince) {
            $query->where('province', $selectedProvince);
        }

        $selectedProductType = request()->query('product_type_id') ?? request()->query('product_type');
        if ($selectedProductType) {
            $query->where('product_type_id', $selectedProductType);
        }

        $unreadNotificationsByProduct = collect();
        if (Auth::check()) {
            $unreadNotificationsByProduct = \App\Models\Notification::where('user_id', Auth::id())
                ->where('type', 'message')
                ->where('read', false)
                ->get()
                ->groupBy('product_id')
                ->map->count();
        }

        $products = $query->get()->map(function ($product) use ($unreadNotificationsByProduct) {
            $filteredImages = $product->productImages
                ->filter(fn ($img) => ($img->status ?? 'active') !== 'inactive')
                ->values()
                ->map(function ($img) {
                    // CORREGIDO: Usa el campo url cuando existe y solo transforma rutas locales.
                    $path = $img->url ?? $img->image_path;
                    $img->url = (str_starts_with($path, 'http') || str_starts_with($path, '/storage'))
                        ? $path
                        : Storage::url($path);
                    return $img;
                });

            $product->setRelation('productImages', $filteredImages);
            $product->product_images = $filteredImages;
            $product->images = $filteredImages;
            $product->unread_messages = $unreadNotificationsByProduct->get($product->id, 0);
            return $product;
        });

        $provinces = Province::orderBy('name')->get();
        $productTypes = ProductType::orderBy('name')->get();

        return Inertia::render('Welcome', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'products' => $products,
            'provinces' => $provinces,
            'productTypes' => $productTypes,
            'filters' => [
                'province' => $selectedProvince,
                'product_type_id' => $selectedProductType,
            ],
        ]);
    })->name('welcome');

    Route::get('/contacto', [ContactController::class, 'index'])->name('contacto');
    Route::post('/contacto-enviar', [ContactController::class, 'send'])->name('contacto.send');

    // Ruta de prueba para enviar un correo de diagnóstico (solo para desarrollo)
    Route::get('/contacto-test', function () {
        $recipient = config('mail.contact_address', env('CONTACT_DEST_EMAIL', 'dcp00@iesemilidarder.com'));
        $fromAddress = config('mail.from.address', 'no-reply@ecoswap.local');
        $fromName = config('mail.from.name', config('app.name', 'EcoSwap'));

        try {
            \Illuminate\Support\Facades\Mail::raw("Correo de prueba desde EcoSwap", function ($message) use ($recipient, $fromAddress, $fromName) {
                $message->to($recipient)
                        ->from($fromAddress, $fromName)
                        ->subject('Prueba de correo EcoSwap');
            });
            return response('Email test disparado a ' . $recipient);
        } catch (\Throwable $e) {
            return response('Error al enviar: ' . $e->getMessage(), 500);
        }
    });

    // Perfil público de usuario
    Route::get('/users/{user}', [ProfileController::class, 'show'])->name('users.show');

    // Rutas protegidas para usuarios autenticados (soporta sesión o token Bearer)
    Route::middleware(['auth.session.or.token', 'active.user'])->group(function () {
        
        // NUEVA RUTA: Carga únicamente tus productos con sus imágenes públicas
        Route::get('/mis-productos', function () {
            $myProducts = Product::with(['productImages', 'type'])
                ->where('user_id', Auth::id())
                ->get()
                ->map(function ($product) {
                    $filteredImages = $product->productImages
                        ->filter(fn ($img) => ($img->status ?? 'active') !== 'inactive')
                        ->values()
                        ->map(function ($img) {
                            $path = $img->url ?? $img->image_path;
                            $img->url = (str_starts_with($path, 'http') || str_starts_with($path, '/storage'))
                                ? $path
                                : Storage::url($path);
                            return $img;
                        });

                    $product->setRelation('productImages', $filteredImages);
                    $product->product_images = $filteredImages;
                    $product->images = $filteredImages;
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
        Route::put('/admin/images/{image}/status', [AdminController::class, 'toggleImageStatus'])->name('admin.images.toggleStatus');

        Route::get('/dashboard/roles', [AdminController::class, 'roles'])->name('dashboard.roles');
        Route::get('/dashboard/roles/create', [AdminController::class, 'createRole'])->name('dashboard.roles.create');
        Route::post('/dashboard/roles', [AdminController::class, 'storeRole'])->name('dashboard.roles.store');

        Route::get('/dashboard/exchanges', [AdminController::class, 'exchanges'])->name('dashboard.exchanges');
        Route::get('/dashboard/exchanges/create', [AdminController::class, 'createExchange'])->name('dashboard.exchanges.create');
        Route::post('/dashboard/exchanges', [AdminController::class, 'storeExchange'])->name('dashboard.exchanges.store');

        Route::get('/dashboard/product-types', [AdminController::class, 'productTypes'])->name('dashboard.productTypes');
        Route::get('/dashboard/product-types/create', [AdminController::class, 'createProductType'])->name('dashboard.productTypes.create');
        Route::post('/dashboard/product-types', [AdminController::class, 'storeProductType'])->name('dashboard.productTypes.store');
        Route::put('/admin/product-types/{type}/status', [AdminController::class, 'toggleProductTypeStatus'])->name('admin.productTypes.toggleStatus');

        Route::put('/admin/products/{product}/status', [AdminController::class, 'toggleProductStatus'])->name('admin.products.toggleStatus');

        // Perfil de usuario
        Route::post('/users/{user}/comments', [ProfileController::class, 'storeComment'])->name('users.comments.store');

        Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
        Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
        
        // Chats
        Route::get('/chat', [ChatController::class, 'index'])->name('chat.index');
        Route::get('/chat/{product}', [ChatController::class, 'show'])->name('chat.show');
        Route::get('/chat/{product}/messages', [ChatController::class, 'messages'])->name('chat.messages');
        Route::post('/chat/{product}', [ChatController::class, 'send'])->name('chat.store');

        Route::get('/notificaciones', [NotificationController::class, 'index'])->name('notifications.index');
        Route::put('/notificaciones/{notification}/read', [NotificationController::class, 'update'])->name('notifications.read');
        
        // CRUD de Productos
        Route::get('/products/create', [ProductController::class, 'create'])->name('products.create');
        Route::post('/products', [ProductController::class, 'store'])->name('products.store');
        Route::get('/products/{product}/edit', [ProductController::class, 'edit'])->name('products.edit');
        
        // Soportamos el método PUT simulado de Inertia para actualizar los archivos
        Route::put('/products/{product}', [ProductController::class, 'update'])->name('products.update');
    });

    Route::post('/contacto', [ContactController::class, 'enviar']);
    require __DIR__.'/auth.php';
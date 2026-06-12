<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Storage;
use App\Models\Product;
use App\Models\ProductType;
use App\Models\ProductImage;
use App\Models\Province;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth; 
use Inertia\Inertia;

class ProductController extends Controller
{
    /**
     * Muestra las publicaciones del usuario autenticado (Mis Productos).
     * CORREGIDO: Mapea la relación para inyectar la propiedad con guion bajo (product_images)
     * igual que haces en la ruta principal para que React la lea perfectamente.
     */
    public function myProducts()
    {
        $products = Auth::user()->products()
            ->with(['productImages'])
            ->latest()
            ->get()
            ->map(function ($product) {
                $filteredImages = $product->productImages
                    ->filter(fn ($img) => ($img->status ?? 'active') !== 'inactive')
                    ->values();

                $product->setRelation('productImages', $filteredImages);
                $product->product_images = $filteredImages;
                $product->images = $filteredImages;
                return $product;
            });

        return Inertia::render('Products/MyProducts', [
            'products' => $products
        ]);
    }

    public function create()
    {
        $categories = ProductType::select('id', 'name')->get();
        $provinces = Province::orderBy('name')->get();

        return Inertia::render('Products/Create', [
            'categories' => $categories,
            'provinces' => $provinces,
        ]);
    }

    public function store(Request $request)
    {
        // 1. Validamos los campos de texto y el array de imágenes
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'product_type_id' => 'required|exists:product_types,id',
            'province' => 'required|string|max:255|exists:provinces,name',
            'estimated_value' => 'required|numeric|min:0',
            'swap_for' => 'required|string|max:255',
            'description' => 'required|string',
            'images' => 'required|array|min:1', 
            'images.*' => 'image|mimes:jpeg,png,jpg,webp|max:5120', 
        ]);

        // 2. Creamos el registro del producto asociado al usuario
        $product = Auth::user()->products()->create([
            'name' => $validated['name'],
            'product_type_id' => $validated['product_type_id'],
            'province' => $validated['province'],
            'estimated_value' => $validated['estimated_value'],
            'swap_for' => $validated['swap_for'],
            'description' => $validated['description'],
        ]);

        // 3. Procesamos cada imagen generando su URL pública limpia
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $imageFile) {
                if ($imageFile->isValid()) {
                    // Guarda el archivo físico en storage/app/public/products
                    $path = $imageFile->store('products', 'public');

                    // Genera de forma limpia la URL exacta usando la configuración del .env
                    $urlCompleta = asset(Storage::url($path));

                    $product->productImages()->create([
                        'url'     => $urlCompleta,
                        'is_main' => false
                    ]);
                }
            }
        }

        // 4. Redireccionamos de vuelta
        return redirect()->route('welcome')->with('success', '¡Objeto publicado con éxito!');
    }

    public function edit(Product $product)
    {
        if ($product->user_id !== Auth::id()) {
            return abort(403, 'No tienes permiso para editar este producto.');
        }

        // Cargamos las imágenes asociadas para que React las pinte
        $product->load('productImages');
        
        // Sincronizamos ambas propiedades para blindar cualquier llamada en el frontend
        $product->images = $product->productImages;
        $product->product_images = $product->productImages;

        $categories = ProductType::select('id', 'name')->get();
        $provinces = Province::orderBy('name')->get();

        return Inertia::render('Products/Edit', [
            'product' => $product,
            'categories' => $categories,
            'provinces' => $provinces,
        ]);
    }

    public function update(Request $request, Product $product)
    {
        if ($product->user_id !== Auth::id()) {
            return abort(403, 'No tienes permiso para actualizar este producto.');
        }

        // 1. Validar los datos
        $request->validate([
            'name' => 'required|string|max:255',
            'product_type_id' => 'required|exists:product_types,id',
            'province' => 'required|string|max:255|exists:provinces,name',
            'estimated_value' => 'required|numeric|min:0',
            'status' => 'required|in:active,pending,swapped',
            'swap_for' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'new_images.*' => 'image|mimes:jpeg,png,jpg,webp|max:5120', 
        ]);

        // 2. Actualizar los datos básicos del producto
        $product->update([
            'name' => $request->name,
            'product_type_id' => $request->product_type_id,
            'province' => $request->province,
            'estimated_value' => $request->estimated_value,
            'status' => $request->status,
            'swap_for' => $request->swap_for,
            'description' => $request->description,
        ]);

        // 3. ELIMINAR las imágenes que el usuario marcó para borrar
        if ($request->has('deleted_images')) {
            foreach ($request->deleted_images as $imageId) {
                $image = ProductImage::find($imageId);
                if ($image) {
                    // Extraemos el nombre real del archivo usando su nombre base
                    $filename = basename($image->url);
                    
                    // Lo eliminamos físicamente de la carpeta de productos
                    Storage::disk('public')->delete('products/' . $filename);

                    // Borrar el registro de la Base de Datos
                    $image->delete();
                }
            }
        }

        // 4. GUARDAR las nuevas imágenes en el servidor
        if ($request->hasFile('new_images')) {
            foreach ($request->file('new_images') as $file) {
                if ($file->isValid()) {
                    $path = $file->store('products', 'public');
                    $urlCompleta = asset(Storage::url($path));

                    $product->productImages()->create([
                        'url'     => $urlCompleta,
                        'is_main' => false
                    ]);
                }
            }
        }

        // 5. CORREGIDO: Redireccionar al nombre exacto de la ruta declarado en web.php ('products.my')
        return redirect()->route('products.my')->with('success', 'Producto actualizado correctamente.');
    }
}
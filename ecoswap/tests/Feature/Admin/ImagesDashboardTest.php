<?php

namespace Tests\Feature\Admin;

use App\Models\Product;
use App\Models\ProductImage;
use App\Models\ProductType;
use App\Models\Role;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ImagesDashboardTest extends TestCase
{
    use RefreshDatabase;

    public function test_toggle_image_status_changes_status_value(): void
    {
        $adminRole = Role::firstOrCreate(['id' => 1], ['name' => 'admin']);
        $admin = User::factory()->create([
            'role_id' => $adminRole->id,
            'status' => 'active',
        ]);

        $user = User::factory()->create(['status' => 'active']);
        $type = ProductType::create([
            'name' => 'Test type',
            'status' => 'active',
        ]);

        $product = Product::create([
            'name' => 'Producto activo',
            'description' => 'Desc',
            'status' => 'active',
            'user_id' => $user->id,
            'province' => 'Barcelona',
            'product_type_id' => $type->id,
        ]);

        $image = ProductImage::create([
            'product_id' => $product->id,
            'url' => '/storage/active.jpg',
            'is_main' => false,
            'status' => 'active',
        ]);

        $response = $this->actingAs($admin)->put("/admin/images/{$image->id}/status");

        $response->assertRedirect();
        $this->assertDatabaseHas('product_images', [
            'id' => $image->id,
            'status' => 'inactive',
        ]);
    }

    public function test_dashboard_images_only_shows_images_from_active_users(): void
    {
        $adminRole = Role::firstOrCreate(['id' => 1], ['name' => 'admin']);
        $admin = User::factory()->create([
            'role_id' => $adminRole->id,
            'status' => 'active',
        ]);

        $activeUser = User::factory()->create(['status' => 'active']);
        $inactiveUser = User::factory()->create(['status' => 'inactive']);
        $type = ProductType::create([
            'name' => 'Test type',
            'status' => 'active',
        ]);

        $activeProduct = Product::create([
            'name' => 'Producto activo',
            'description' => 'Desc',
            'status' => 'active',
            'user_id' => $activeUser->id,
            'province' => 'Barcelona',
            'product_type_id' => $type->id,
        ]);

        $inactiveProduct = Product::create([
            'name' => 'Producto inactivo',
            'description' => 'Desc',
            'status' => 'active',
            'user_id' => $inactiveUser->id,
            'province' => 'Barcelona',
            'product_type_id' => $type->id,
        ]);

        ProductImage::create([
            'product_id' => $activeProduct->id,
            'url' => '/storage/active.jpg',
            'is_main' => true,
            'status' => 'active',
        ]);

        ProductImage::create([
            'product_id' => $inactiveProduct->id,
            'url' => '/storage/inactive.jpg',
            'is_main' => false,
            'status' => 'active',
        ]);

        $response = $this->actingAs($admin)->get('/dashboard/images');

        $response->assertOk();
        $response->assertSee('active.jpg');
        $response->assertDontSee('inactive.jpg');
    }

    public function test_home_page_only_returns_active_images_for_products(): void
    {
        $user = User::factory()->create(['status' => 'active']);
        $type = ProductType::create([
            'name' => 'Test type',
            'status' => 'active',
        ]);

        $product = Product::create([
            'name' => 'Producto con imágenes',
            'description' => 'Desc',
            'status' => 'active',
            'user_id' => $user->id,
            'province' => 'Barcelona',
            'product_type_id' => $type->id,
        ]);

        ProductImage::create([
            'product_id' => $product->id,
            'url' => '/storage/visible.jpg',
            'is_main' => true,
            'status' => 'active',
        ]);

        ProductImage::create([
            'product_id' => $product->id,
            'url' => '/storage/hidden.jpg',
            'is_main' => false,
            'status' => 'inactive',
        ]);

        $response = $this->get('/');

        $response->assertOk();
        $response->assertSee('visible.jpg');
        $response->assertDontSee('hidden.jpg');
    }
}

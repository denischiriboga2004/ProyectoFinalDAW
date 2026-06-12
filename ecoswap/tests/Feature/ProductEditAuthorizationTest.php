<?php

namespace Tests\Feature;

use App\Models\Product;
use App\Models\ProductType;
use App\Models\Role;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ProductEditAuthorizationTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_can_edit_other_users_products(): void
    {
        $adminRole = Role::firstOrCreate(['id' => 1], ['name' => 'admin']);
        $admin = User::factory()->create([
            'role_id' => $adminRole->id,
            'status' => 'active',
        ]);

        $owner = User::factory()->create([
            'role_id' => 2,
            'status' => 'active',
        ]);

        $type = ProductType::create([
            'name' => 'Test type',
            'status' => 'active',
        ]);

        $product = Product::create([
            'name' => 'Producto de otro usuario',
            'description' => 'Descripción',
            'estimated_value' => 100,
            'status' => 'active',
            'swap_for' => 'Algo',
            'province' => 'Madrid',
            'product_type_id' => $type->id,
            'user_id' => $owner->id,
        ]);

        $response = $this->actingAs($admin)->get("/products/{$product->id}/edit");

        $response->assertOk();
    }
}

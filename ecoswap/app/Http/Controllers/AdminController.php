<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Exchange;
use App\Models\Product;
use App\Models\ProductImage;
use App\Models\ProductType;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AdminController extends Controller
{
    private function ensureAdmin(): void
    {
        if (!Auth::check() || Auth::user()->role_id !== 1) {
            abort(403);
        }
    }

    public function dashboard()
    {
        $this->ensureAdmin();

        return Inertia::render('Dashboard', [
            'usersCount' => User::count(),
            'productsCount' => Product::count(),
            'commentsCount' => Comment::count(),
            'rolesCount' => Role::count(),
            'typesCount' => ProductType::count(),
            'exchangesCount' => Exchange::count(),
            'imagesCount' => ProductImage::count(),
        ]);
    }

    public function users()
    {
        $this->ensureAdmin();

        return Inertia::render('Dashboard/Users', [
            'users' => User::with('role')->orderBy('created_at', 'desc')->get(),
            'roles' => Role::orderBy('name')->get(),
        ]);
    }

    public function createUser()
    {
        $this->ensureAdmin();

        return Inertia::render('Dashboard/CreateUser', [
            'roles' => Role::orderBy('name')->get(),
        ]);
    }

    public function products()
    {
        $this->ensureAdmin();

        return Inertia::render('Dashboard/Products', [
            'products' => Product::with(['user', 'type'])->orderBy('created_at', 'desc')->get(),
            'types' => ProductType::orderBy('name')->get(),
            'users' => User::orderBy('name')->get(),
        ]);
    }

    public function comments()
    {
        $this->ensureAdmin();

        return Inertia::render('Dashboard/Comments', [
            'comments' => Comment::with(['user', 'product', 'targetUser'])->orderBy('created_at', 'desc')->get(),
            'users' => User::orderBy('name')->get(),
            'products' => Product::orderBy('name')->get(),
        ]);
    }

    public function createComment()
    {
        $this->ensureAdmin();

        return Inertia::render('Dashboard/CreateComment', [
            'users' => User::orderBy('name')->get(),
            'products' => Product::orderBy('name')->get(),
        ]);
    }

    public function images()
    {
        $this->ensureAdmin();

        return Inertia::render('Dashboard/Images', [
            'images' => ProductImage::with('product')->orderBy('created_at', 'desc')->get(),
            'products' => Product::orderBy('name')->get(),
        ]);
    }

    public function createImage()
    {
        $this->ensureAdmin();

        return Inertia::render('Dashboard/CreateImage', [
            'products' => Product::orderBy('name')->get(),
        ]);
    }

    public function roles()
    {
        $this->ensureAdmin();

        return Inertia::render('Dashboard/Roles', [
            'roles' => Role::orderBy('name')->get(),
        ]);
    }

    public function createRole()
    {
        $this->ensureAdmin();

        return Inertia::render('Dashboard/CreateRole');
    }

    public function exchanges()
    {
        $this->ensureAdmin();

        return Inertia::render('Dashboard/Exchanges', [
            'exchanges' => Exchange::with(['userOffering', 'userReceiving', 'productOffered', 'productRequested'])->orderBy('created_at', 'desc')->get(),
            'users' => User::orderBy('name')->get(),
            'products' => Product::orderBy('name')->get(),
        ]);
    }

    public function createExchange()
    {
        $this->ensureAdmin();

        return Inertia::render('Dashboard/CreateExchange', [
            'users' => User::orderBy('name')->get(),
            'products' => Product::orderBy('name')->get(),
        ]);
    }

    public function productTypes()
    {
        $this->ensureAdmin();

        return Inertia::render('Dashboard/ProductTypes', [
            'types' => ProductType::orderBy('name')->get(),
        ]);
    }

    public function createProductType()
    {
        $this->ensureAdmin();

        return Inertia::render('Dashboard/CreateProductType');
    }

    public function editUser(User $user)
    {
        $this->ensureAdmin();

        return Inertia::render('Dashboard/EditUser', [
            'user' => $user,
        ]);
    }

    public function updateUser(Request $request, User $user)
    {
        $this->ensureAdmin();

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:users,email,' . $user->id,
            'status' => 'required|in:active,inactive',
        ]);

        $user->update($validated);

        return redirect()->route('dashboard.users');
    }

    public function storeUser(Request $request)
    {
        $this->ensureAdmin();

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:users,email',
            'password' => 'required|string|min:6',
            'role_id' => 'nullable|exists:roles,id',
            'status' => 'required|in:active,inactive',
        ]);

        User::create(array_merge($validated, ['password' => bcrypt($validated['password'])]));

        return redirect()->route('dashboard.users');
    }

    public function editComment(Comment $comment)
    {
        $this->ensureAdmin();

        return Inertia::render('Dashboard/EditComment', [
            'comment' => $comment->load(['user', 'product']),
        ]);
    }

    public function updateComment(Request $request, Comment $comment)
    {
        $this->ensureAdmin();

        $validated = $request->validate([
            'content' => 'required|string|max:2000',
            'rating' => 'nullable|integer|min:1|max:5',
            'status' => 'required|in:active,inactive',
        ]);

        $comment->update($validated);

        return redirect()->route('dashboard.comments');
    }

    public function storeComment(Request $request)
    {
        $this->ensureAdmin();

        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'product_id' => 'required|exists:products,id',
            'content' => 'required|string|max:2000',
            'rating' => 'nullable|integer|min:1|max:5',
            'status' => 'required|in:active,inactive',
        ]);

        Comment::create($validated);

        return redirect()->route('dashboard.comments');
    }

    public function storeImage(Request $request)
    {
        $this->ensureAdmin();

        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
            'url' => 'required|string|max:1000',
            'is_main' => 'sometimes|boolean',
        ]);

        ProductImage::create($validated);

        return redirect()->route('dashboard.images');
    }

    public function storeRole(Request $request)
    {
        $this->ensureAdmin();

        $validated = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        Role::create($validated);

        return redirect()->route('dashboard.roles');
    }

    public function storeExchange(Request $request)
    {
        $this->ensureAdmin();

        $validated = $request->validate([
            'user_offering_id' => 'required|exists:users,id',
            'user_receiving_id' => 'required|exists:users,id',
            'product_offered_id' => 'required|exists:products,id',
            'product_requested_id' => 'required|exists:products,id',
            'status' => 'required|string|max:255',
        ]);

        Exchange::create($validated);

        return redirect()->route('dashboard.exchanges');
    }

    public function storeProductType(Request $request)
    {
        $this->ensureAdmin();

        $validated = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        ProductType::create($validated);

        return redirect()->route('dashboard.productTypes');
    }

    public function toggleUserStatus(User $user)
    {
        $this->ensureAdmin();

        $user->status = $user->status === 'active' ? 'inactive' : 'active';
        $user->save();

        return back();
    }

    public function toggleProductStatus(Product $product)
    {
        $this->ensureAdmin();

        $product->status = $product->status === 'active' ? 'inactive' : 'active';
        $product->save();

        return back();
    }

    public function toggleCommentStatus(Comment $comment)
    {
        $this->ensureAdmin();

        $comment->status = $comment->status === 'active' ? 'inactive' : 'active';
        $comment->save();

        return back();
    }
}

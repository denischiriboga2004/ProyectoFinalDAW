<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Models\Comment;
use App\Models\Product;
use App\Models\User;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    public function show(User $user)
    {
        $user->load(['role', 'address']);

        $products = $user->products()
            ->with(['type', 'productImages', 'user', 'comments.user'])
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($product) {
                $product->product_images = $product->productImages;
                return $product;
            });

        return Inertia::render('Users/Show', [
            'profileUser' => $user,
            'products' => $products,
            'comments' => Comment::with('user')
                ->where('status', 'active')
                ->where(function ($query) use ($user) {
                    $query->where('target_user_id', $user->id)
                        ->orWhere(function ($query) use ($user) {
                            $query->whereNull('target_user_id')
                                ->whereHas('product', function ($query) use ($user) {
                                    $query->where('user_id', $user->id);
                                });
                        });
                })
                ->orderBy('created_at', 'desc')
                ->get(),
        ]);
    }

    public function storeComment(Request $request, User $user)
    {
        if (!Auth::check() || Auth::id() === $user->id) {
            abort(403);
        }

        $validated = $request->validate([
            'content' => 'required|string|max:2000',
            'rating' => 'nullable|integer|min:1|max:5',
        ]);

        Comment::create([
            'user_id' => Auth::id(),
            'target_user_id' => $user->id,
            'product_id' => null,
            'content' => $validated['content'],
            'rating' => $validated['rating'] ?? null,
            'status' => 'active',
        ]);

        return Redirect::route('users.show', $user);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        if ($request->hasFile('photo')) {
            if ($request->user()->profile_photo_path) {
                Storage::disk('public')->delete($request->user()->profile_photo_path);
            }

            $validated['profile_photo_path'] = $request
                ->file('photo')
                ->store('profile-photos', 'public');
        }

        unset($validated['photo']);

        $request->user()->fill($validated);

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return Redirect::route('profile.edit');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}

<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class AdminMiddleware
{
    public function handle(Request $request, Closure $next): Response
    {
        // 1. Verificamos si el usuario está logueado Y si su rol es 1 (Admin)
        if (Auth::check() && Auth::user()->role_id == 1) {
            return $next($request); // Lo deja pasar
        }

        // 2. Si no es admin, lo mandamos al home (o donde quieras)
        return redirect('/')->with('error', 'No tienes permisos de administrador.');
    }
}
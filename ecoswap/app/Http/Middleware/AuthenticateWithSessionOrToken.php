<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthenticateWithSessionOrToken
{
    /**
     * Handle an incoming request.
     *
     * Intenta autenticar primero con sesión, luego con Bearer token.
     */
    public function handle(Request $request, Closure $next)
    {
        // Intentar autenticar con sesión primero
        if (Auth::check()) {
            return $next($request);
        }

        // Intentar autenticar con Bearer token
        $token = $this->extractBearerToken($request);
        if ($token) {
            $user = $this->authenticateWithToken($token);
            if ($user) {
                Auth::setUser($user);
                return $next($request);
            }
        }

        // Si no hay autenticación válida, redirigir a login
        return redirect()->route('login');
    }

    /**
     * Extraer token Bearer del header Authorization.
     */
    private function extractBearerToken(Request $request): ?string
    {
        $header = $request->header('Authorization');
        if ($header && str_starts_with($header, 'Bearer ')) {
            return substr($header, 7);
        }
        return null;
    }

    /**
     * Validar token y obtener usuario.
     */
    private function authenticateWithToken(string $token)
    {
        // Buscar el token en personal_access_tokens
        $accessToken = \Laravel\Sanctum\PersonalAccessToken::findToken($token);
        
        if (!$accessToken || $accessToken->expires_at && now()->isAfter($accessToken->expires_at)) {
            return null;
        }

        return $accessToken->tokenable;
    }
}

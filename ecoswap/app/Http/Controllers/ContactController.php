<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;

class ContactController extends Controller
{
    public function index()
    {
        return Inertia::render('Contact');
    }

    public function send(Request $request)
    {
        $validated = $request->validate([
            'email' => ['required', 'email'],
            'motivo' => ['required', 'string', 'max:255'],
            'mensaje' => ['required', 'string'],
        ]);

        $apiKey = env('RESEND_API_KEY');
        if (! $apiKey) {
            return redirect()->back()
                ->withErrors(['general' => 'La clave RESEND_API_KEY no está configurada.'])
                ->withInput();
        }

        $recipient = config('mail.contact_address', env('CONTACT_DEST_EMAIL', 'dcp00@iesemilidarder.com'));
        $fromAddress = config('mail.from.address', 'onboarding@resend.dev');
        $subject = "Nuevo contacto desde EcoSwap: {$validated['motivo']}";

        $html = '<p>Correo de contacto desde: ' . e($validated['email']) . '</p>';
        $html .= '<p>Motivo: ' . e($validated['motivo']) . '</p>';
        $html .= '<p>' . nl2br(e($validated['mensaje'])) . '</p>';

        try {
            $response = Http::withToken($apiKey)
                ->acceptJson()
                ->post('https://api.resend.com/emails', [
                    'from' => $fromAddress,
                    'to' => $recipient,
                    'subject' => $subject,
                    'html' => $html,
                    'headers' => [
                        'Reply-To' => $validated['email'],
                    ],
                ]);

            if ($response->failed()) {
                Log::error('Contacto email error', [
                    'status' => $response->status(),
                    'body' => $response->body(),
                    'recipient' => $recipient,
                    'data' => $validated,
                ]);

                return redirect()->back()
                    ->withErrors(['general' => 'Error al enviar el correo. Por favor, inténtalo más tarde.'])
                    ->withInput();
            }
        } catch (\Throwable $exception) {
            Log::error('Contacto email exception', [
                'exception' => $exception->getMessage(),
                'recipient' => $recipient,
                'data' => $validated,
            ]);

            return redirect()->back()
                ->withErrors(['general' => 'Error al enviar el correo. Por favor, inténtalo más tarde.'])
                ->withInput();
        }

        return redirect()->route('contacto')
            ->with('success', '¡Mensaje enviado con éxito! Nos pondremos en contacto pronto.');
    }
}

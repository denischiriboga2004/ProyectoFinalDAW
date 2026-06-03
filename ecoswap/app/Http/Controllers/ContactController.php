<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class ContactController extends Controller
{
    public function index()
    {
        return Inertia::render('Contact');
    }

    public function send(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'mensaje' => 'required|string',
        ]);

        $datos = [
            'email_cliente' => $request->email,
            'mensaje' => $request->mensaje,
        ];

        try {
            Mail::raw("Nueva consulta de: {$datos['email_cliente']}\n\nMensaje: {$datos['mensaje']}", function ($message) use ($datos) {
                $message->to('areajuridica@aliad.es')
                        ->from(config('mail.from.address'), 'Web Canal Denuncias')
                        ->replyTo($datos['email_cliente'])
                        ->subject('Nuevo mensaje Web de: ' . $datos['email_cliente']);
            });
        } catch (\Throwable $exception) {
            Log::error('Error al enviar contacto por correo', [
                'error' => $exception->getMessage(),
                'datos' => $datos,
            ]);

            return back()->withErrors([
                'general' => 'Hubo un problema al enviar el mensaje. Por favor, inténtalo de nuevo más tarde.',
            ])->withInput();
        }

        return back()->with('success', '¡Mensaje enviado con éxito! Nos pondremos en contacto pronto.');
    }
}

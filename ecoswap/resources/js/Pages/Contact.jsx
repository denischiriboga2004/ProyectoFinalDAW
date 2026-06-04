import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function Contact({ auth }) {
    const { flash = {} } = usePage().props || {};
    const { data, setData, post, processing, reset, errors } = useForm({
        email: '',
        motivo: '',
        mensaje: '',
    });
    const [feedback, setFeedback] = useState({ type: null, message: '' });

    const handleSubmit = (event) => {
        event.preventDefault();
        setFeedback({ type: null, message: '' });

        post('/contacto-enviar', {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                reset();
                setFeedback({
                    type: 'success',
                    message: '¡Mensaje enviado con éxito! Nos pondremos en contacto pronto.',
                });
            },
            onError: () => {
                setFeedback({
                    type: 'error',
                    message: 'Hubo un problema al enviar el mensaje. Por favor, revisa los campos.',
                });
            },
        });
    };

    return (
        <div className="min-h-screen bg-[#07111F] text-white">
            <Head title="Contacto - EcoSwap" />

            <header className="border-b border-white/10 bg-[#0f223b]/60 py-6 backdrop-blur-xl">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-12">
                    <Link href="/" className="text-sm font-semibold text-white/70 transition hover:text-white">
                        ← Volver al inicio
                    </Link>
                    {auth?.user ? (
                        <span className="text-sm text-white/70">Hola, {auth.user.name}</span>
                    ) : (
                        <Link href="/login" className="text-sm text-cyan-300 hover:text-white">
                            Inicia sesión
                        </Link>
                    )}
                </div>
            </header>

            <main className="mx-auto max-w-4xl px-6 py-16 lg:px-12">
                <div className="rounded-[32px] border border-white/10 bg-white/5 p-10 shadow-2xl shadow-cyan-500/10 backdrop-blur-xl">
                    <h1 className="text-4xl font-black text-white">Contacto</h1>
                    <p className="mt-3 text-white/60">
                        ¿Tienes alguna duda o necesitas ayuda? Envíanos tu mensaje y te responderemos lo antes posible.
                    </p>

                    {(flash.success || feedback.message) && (
                        <div
                            className={`mt-6 rounded-2xl border px-4 py-3 text-sm ${
                                (flash.success || feedback.type === 'success')
                                    ? 'border-emerald-400/30 bg-emerald-500/10 text-emerald-200'
                                    : 'border-rose-400/30 bg-rose-500/10 text-rose-200'
                            }`}
                        >
                            {flash.success || feedback.message}
                        </div>
                    )}

                    {errors.general && (
                        <div className="mt-6 rounded-2xl border border-rose-400/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-100">
                            {errors.general}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                        <div>
                            <label htmlFor="email" className="text-sm font-semibold text-white/80">
                                Correo electrónico
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={data.email}
                                onChange={(event) => setData('email', event.target.value)}
                                className="mt-3 w-full rounded-3xl border border-white/10 bg-[#061118] px-5 py-4 text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20"
                                placeholder="tu@email.com"
                            />
                            {errors.email && (
                                <p className="mt-2 text-sm text-rose-400">{errors.email}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="motivo" className="text-sm font-semibold text-white/80">
                                Motivo del contacto
                            </label>
                            <input
                                id="motivo"
                                type="text"
                                value={data.motivo}
                                onChange={(event) => setData('motivo', event.target.value)}
                                className="mt-3 w-full rounded-3xl border border-white/10 bg-[#061118] px-5 py-4 text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20"
                                placeholder="¿Por qué nos escribes?"
                            />
                            {errors.motivo && (
                                <p className="mt-2 text-sm text-rose-400">{errors.motivo}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="mensaje" className="text-sm font-semibold text-white/80">
                                Mensaje
                            </label>
                            <textarea
                                id="mensaje"
                                value={data.mensaje}
                                onChange={(event) => setData('mensaje', event.target.value)}
                                className="mt-3 h-40 w-full rounded-3xl border border-white/10 bg-[#061118] px-5 py-4 text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20"
                                placeholder="Escribe tu mensaje aquí..."
                            />
                            {errors.mensaje && (
                                <p className="mt-2 text-sm text-rose-400">{errors.mensaje}</p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="inline-flex items-center justify-center rounded-full bg-cyan-400 px-6 py-3 text-sm font-bold uppercase tracking-[0.18em] text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            Enviar mensaje
                        </button>
                    </form>
                </div>
            </main>
        </div>
    );
}

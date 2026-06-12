import { useEffect } from 'react';
import InputError from '@/Components/InputError';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('login'));
    };

    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#07111F] px-6 text-white">
            <Head title="Iniciar Sesión - EcoSwap" />

            <div className="absolute left-[-150px] top-[-150px] h-[400px] w-[400px] rounded-full bg-[#00C896] opacity-20 blur-3xl"></div>
            <div className="absolute bottom-[-200px] right-[-100px] h-[500px] w-[500px] rounded-full bg-cyan-400 opacity-10 blur-3xl"></div>

            <div className="absolute inset-0 opacity-5">
                <div className="h-full w-full bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:60px_60px]"></div>
            </div>

            <div className="relative z-10 w-full max-w-md">
                <div className="mb-10 text-center">
                    <Link href="/" className="inline-flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-[#00C896] to-cyan-400 text-xl font-black text-black shadow-lg">
                            ♻
                        </div>
                        <h1 className="text-3xl font-black tracking-tight">
                            EcoSwap
                        </h1>
                    </Link>

                    <p className="mt-4 text-white/60">
                        Bienvenido de nuevo a la economía circular
                    </p>
                </div>

                <div className="rounded-[35px] border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-2xl lg:p-10">
                    {status && (
                        <div className="mb-4 text-center text-sm font-medium text-[#00C896]">
                            {status}
                        </div>
                    )}

                    <form
                        method="post"
                        action={route('login')}
                        onSubmit={submit}
                        className="space-y-6"
                    >
                        <div>
                            <label
                                className="mb-2 block text-sm font-medium text-white/70"
                                htmlFor="email"
                            >
                                Correo Electrónico
                            </label>

                            <input
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="w-full rounded-2xl border border-white/10 bg-[#07111F] p-4 text-white placeholder:text-white/30 focus:border-[#00C896] focus:ring-0 focus:outline-none transition-all"
                                autoComplete="username"
                                onChange={(e) =>
                                    setData('email', e.target.value)
                                }
                                placeholder="tu@ejemplo.com"
                                required
                            />

                            <InputError
                                message={errors.email}
                                className="mt-2"
                            />
                        </div>

                        <div>
                            <div className="mb-2 flex items-center justify-between">
                                <label
                                    className="text-sm font-medium text-white/70"
                                    htmlFor="password"
                                >
                                    Contraseña
                                </label>


                            </div>

                            <input
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="w-full rounded-2xl border border-white/10 bg-[#07111F] p-4 text-white placeholder:text-white/30 focus:border-[#00C896] focus:ring-0 focus:outline-none transition-all"
                                autoComplete="current-password"
                                onChange={(e) =>
                                    setData('password', e.target.value)
                                }
                                placeholder="••••••••"
                                required
                            />

                            <InputError
                                message={errors.password}
                                className="mt-2"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full rounded-2xl bg-gradient-to-r from-[#00C896] to-cyan-400 py-4 text-lg font-bold text-black shadow-xl transition hover:scale-[1.02] active:scale-95 disabled:opacity-50"
                        >
                            {processing
                                ? 'Iniciando sesión...'
                                : 'Entrar'}
                        </button>
                    </form>

                    <div className="mt-8 text-center text-sm text-white/50">
                        ¿No tienes una cuenta?{' '}
                        <Link
                            href={route('register')}
                            className="font-bold text-white hover:text-[#00C896] transition"
                        >
                            Regístrate gratis
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
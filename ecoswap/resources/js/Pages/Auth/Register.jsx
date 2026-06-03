import { useEffect } from 'react';
import InputError from '@/Components/InputError';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('register'));
    };

    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#07111F] px-6 py-12 text-white">
            <Head title="Únete a EcoSwap" />

            {/* BACKGROUND EFFECTS */}
            <div className="absolute left-[-150px] top-[-150px] h-[400px] w-[400px] rounded-full bg-[#00C896] opacity-20 blur-3xl"></div>
            <div className="absolute bottom-[-200px] right-[-100px] h-[500px] w-[500px] rounded-full bg-cyan-400 opacity-10 blur-3xl"></div>

            {/* GRID BACKGROUND */}
            <div className="absolute inset-0 opacity-5">
                <div className="h-full w-full bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:60px_60px]"></div>
            </div>

            <div className="relative z-10 w-full max-w-lg">
                {/* LOGO AREA */}
                <div className="mb-8 text-center">
                    <Link href="/" className="inline-flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-[#00C896] to-cyan-400 text-xl font-black text-black shadow-lg">
                            ♻
                        </div>
                        <h1 className="text-3xl font-black tracking-tight">EcoSwap</h1>
                    </Link>
                    <h2 className="mt-6 text-4xl font-bold">Crea tu cuenta</h2>
                    <p className="mt-2 text-white/60">Empieza a intercambiar y salvar el planeta.</p>
                </div>

                {/* REGISTER CARD */}
                <div className="rounded-[40px] border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-2xl lg:p-12">
                    <form onSubmit={submit} className="space-y-5">
                        {/* NAME */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-white/70" htmlFor="name">
                                Nombre completo
                            </label>
                            <input
                                id="name"
                                name="name"
                                value={data.name}
                                className="w-full rounded-2xl border border-white/10 bg-white/10 p-4 text-white placeholder:text-white/30 focus:border-[#00C896] focus:ring-0 focus:outline-none transition-all"
                                autoComplete="name"
                                onChange={(e) => setData('name', e.target.value)}
                                placeholder="Ej. Juan Pérez"
                                required
                            />
                            <InputError message={errors.name} className="mt-2" />
                        </div>

                        {/* EMAIL */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-white/70" htmlFor="email">
                                Correo Electrónico
                            </label>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="w-full rounded-2xl border border-white/10 bg-white/10 p-4 text-white placeholder:text-white/30 focus:border-[#00C896] focus:ring-0 focus:outline-none transition-all"
                                autoComplete="username"
                                onChange={(e) => setData('email', e.target.value)}
                                placeholder="tu@email.com"
                                required
                            />
                            <InputError message={errors.email} className="mt-2" />
                        </div>


                        {/* PASSWORDS GRID */}
                        <div className="grid gap-5 md:grid-cols-2">
                            <div>
                                <label className="mb-2 block text-sm font-medium text-white/70" htmlFor="password">
                                    Contraseña
                                </label>
                                <input
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    className="w-full rounded-2xl border border-white/10 bg-white/10 p-4 text-white placeholder:text-white/30 focus:border-[#00C896] focus:ring-0 focus:outline-none transition-all"
                                    autoComplete="new-password"
                                    onChange={(e) => setData('password', e.target.value)}
                                    placeholder="••••••••"
                                    required
                                />
                                <InputError message={errors.password} className="mt-2" />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-white/70" htmlFor="password_confirmation">
                                    Confirmar
                                </label>
                                <input
                                    id="password_confirmation"
                                    type="password"
                                    name="password_confirmation"
                                    value={data.password_confirmation}
                                    className="w-full rounded-2xl border border-white/10 bg-white/10 p-4 text-white placeholder:text-white/30 focus:border-[#00C896] focus:ring-0 focus:outline-none transition-all"
                                    autoComplete="new-password"
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    placeholder="••••••••"
                                    required
                                />
                                <InputError message={errors.password_confirmation} className="mt-2" />
                            </div>
                        </div>

                        {/* SUBMIT */}
                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full rounded-2xl bg-gradient-to-r from-[#00C896] to-cyan-400 py-4 text-lg font-bold text-black shadow-xl transition hover:scale-[1.02] active:scale-95 disabled:opacity-50"
                            >
                                {processing ? 'Creando cuenta...' : 'Registrarse'}
                            </button>
                        </div>
                    </form>

                    {/* LOGIN LINK */}
                    <div className="mt-8 text-center text-sm text-white/50">
                        ¿Ya tienes cuenta?{' '}
                        <Link href={route('login')} className="font-bold text-white hover:text-[#00C896] transition">
                            Inicia sesión aquí
                        </Link>
                    </div>
                </div>

                {/* TERMS FOOTER */}
                <p className="mt-8 text-center text-xs text-white/30">
                    Al registrarte, aceptas nuestros Términos de Servicio y 
                    la Política de Privacidad de EcoSwap.
                </p>
            </div>
        </div>
    );
}
import { Head, Link } from '@inertiajs/react';

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="EcoSwap" />

            <div className="min-h-screen overflow-hidden bg-[#07111F] text-white">

                {/* BACKGROUND EFFECTS */}
                <div className="absolute left-[-200px] top-[-200px] h-[500px] w-[500px] rounded-full bg-[#00C896] opacity-20 blur-3xl"></div>

                <div className="absolute bottom-[-250px] right-[-150px] h-[500px] w-[500px] rounded-full bg-cyan-400 opacity-20 blur-3xl"></div>

                {/* GRID BACKGROUND */}
                <div className="absolute inset-0 opacity-10">
                    <div className="h-full w-full bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:60px_60px]"></div>
                </div>

                {/* NAVBAR */}
                <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-white/5 backdrop-blur-xl">

                    <div className="flex items-center justify-between px-10 py-5 lg:px-20">

                        {/* LOGO */}
                        <div className="flex items-center gap-3">

                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-[#00C896] to-cyan-400 text-xl font-black text-black shadow-lg">
                                ♻
                            </div>

                            <h1 className="text-3xl font-black tracking-tight">
                                EcoSwap
                            </h1>
                        </div>

                        {/* NAV */}
                        <nav className="hidden items-center gap-10 lg:flex">

                            <a href="#" className="text-white/70 transition hover:text-white">
                                Inicio
                            </a>

                            <a href="#" className="text-white/70 transition hover:text-white">
                                Explorar
                            </a>

                            <a href="#" className="text-white/70 transition hover:text-white">
                                Intercambios
                            </a>

                            <a href="#" className="text-white/70 transition hover:text-white">
                                Cómo funciona
                            </a>
                        </nav>

                        {/* AUTH */}
                        <div className="flex items-center gap-4">

                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="rounded-2xl bg-gradient-to-r from-[#00C896] to-cyan-400 px-6 py-3 font-bold text-black transition hover:scale-105"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="text-white/70 transition hover:text-white"
                                    >
                                        Iniciar sesión
                                    </Link>

                                    <Link
                                        href={route('register')}
                                        className="rounded-2xl bg-gradient-to-r from-[#00C896] to-cyan-400 px-6 py-3 font-bold text-black transition hover:scale-105"
                                    >
                                        Registrarse
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </header>

                {/* HERO */}
                <section className="relative grid min-h-screen grid-cols-1 lg:grid-cols-2">

                    {/* LEFT */}
                    <div className="flex flex-col justify-center px-10 pt-40 lg:px-24">

                        <span className="mb-8 w-fit rounded-full border border-white/10 bg-white/10 px-5 py-2 text-sm font-medium backdrop-blur-xl">
                            ♻ Plataforma de Economía Circular
                        </span>

                        <h1 className="max-w-3xl text-6xl font-black leading-tight lg:text-8xl">
                            Intercambia.
                            <span className="bg-gradient-to-r from-[#00C896] to-cyan-400 bg-clip-text text-transparent">
                                {" "}Reutiliza.
                            </span>
                            {" "}Conecta.
                        </h1>

                        <p className="mt-8 max-w-2xl text-xl leading-relaxed text-white/70">
                            Convierte objetos olvidados en nuevas oportunidades.
                            EcoSwap conecta personas para intercambiar productos
                            sin dinero y reducir residuos.
                        </p>

                        {/* BUTTONS */}
                        <div className="mt-10 flex flex-wrap gap-5">

                            <Link
                                href={route('register')}
                                className="rounded-2xl bg-gradient-to-r from-[#00C896] to-cyan-400 px-8 py-4 text-lg font-bold text-black shadow-2xl transition hover:scale-105"
                            >
                                Empezar ahora
                            </Link>

                            <button className="rounded-2xl border border-white/10 bg-white/10 px-8 py-4 text-lg font-semibold backdrop-blur-xl transition hover:bg-white/20">
                                Explorar productos
                            </button>
                        </div>

                        {/* STATS */}
                        <div className="mt-16 flex flex-wrap gap-12">

                            <div>
                                <h3 className="text-5xl font-black text-[#00C896]">
                                    +12K
                                </h3>

                                <p className="mt-2 text-white/60">
                                    Intercambios realizados
                                </p>
                            </div>

                            <div>
                                <h3 className="text-5xl font-black text-cyan-400">
                                    8T
                                </h3>

                                <p className="mt-2 text-white/60">
                                    Residuos evitados
                                </p>
                            </div>

                            <div>
                                <h3 className="text-5xl font-black text-white">
                                    100%
                                </h3>

                                <p className="mt-2 text-white/60">
                                    Sin dinero
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT */}
                    <div className="relative hidden items-center justify-center lg:flex">

                        {/* MAIN CARD */}
                        <div className="relative w-[520px] rounded-[40px] border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur-2xl">

                            <img
                                src="https://images.unsplash.com/photo-1511994298241-608e28f14fde"
                                alt="Camera"
                                className="h-[550px] w-full rounded-[30px] object-cover"
                            />

                            <div className="mt-6">

                                <div className="flex items-center justify-between">

                                    <h3 className="text-3xl font-bold">
                                        Cámara Vintage
                                    </h3>

                                    <span className="rounded-full bg-[#00C896]/20 px-4 py-2 text-sm text-[#00C896]">
                                        Disponible
                                    </span>
                                </div>

                                <p className="mt-4 text-lg text-white/60">
                                    Busco intercambio por consola o tablet.
                                </p>

                                <div className="mt-6 flex items-center justify-between">

                                    <span className="text-lg font-semibold text-cyan-400">
                                        Madrid
                                    </span>

                                    <button className="rounded-xl bg-white/10 px-5 py-3 backdrop-blur-xl transition hover:bg-white/20">
                                        Ver producto
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                </section>

                {/* SEARCH SECTION */}
                <section className="relative z-20 -mt-20 px-6 pb-24 lg:px-20">

                    <div className="rounded-[40px] border border-white/10 bg-white/10 p-8 shadow-2xl backdrop-blur-2xl">

                        <div className="grid gap-5 lg:grid-cols-4">

                            <input
                                type="text"
                                placeholder="Buscar productos..."
                                className="rounded-2xl border border-white/10 bg-white/10 p-5 text-white placeholder:text-white/40 focus:border-[#00C896] focus:outline-none"
                            />

                            <select className="rounded-2xl border border-white/10 bg-white/10 p-5 text-white focus:border-[#00C896] focus:outline-none">
                                <option className="text-black">Categoría</option>
                                <option className="text-black">Electrónica</option>
                                <option className="text-black">Libros</option>
                                <option className="text-black">Ropa</option>
                            </select>

                            <select className="rounded-2xl border border-white/10 bg-white/10 p-5 text-white focus:border-[#00C896] focus:outline-none">
                                <option className="text-black">Ubicación</option>
                                <option className="text-black">Madrid</option>
                                <option className="text-black">Barcelona</option>
                                <option className="text-black">Valencia</option>
                            </select>

                            <button className="rounded-2xl bg-gradient-to-r from-[#00C896] to-cyan-400 p-5 text-lg font-bold text-black transition hover:scale-[1.02]">
                                Buscar
                            </button>
                        </div>
                    </div>
                </section>

                {/* PRODUCTS */}
                <section className="px-6 py-20 lg:px-20">

                    <div className="mb-16">

                        <h2 className="text-5xl font-black">
                            Productos destacados
                        </h2>

                        <p className="mt-4 text-xl text-white/60">
                            Objetos esperando una segunda vida.
                        </p>
                    </div>

                    <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-3">

                        {[1, 2, 3].map((item) => (
                            <div
                                key={item}
                                className="group overflow-hidden rounded-[35px] border border-white/10 bg-white/10 shadow-2xl backdrop-blur-xl transition duration-500 hover:-translate-y-3 hover:border-[#00C896]/40"
                            >

                                <div className="overflow-hidden">

                                    <img
                                        src="https://images.unsplash.com/photo-1512496015851-a90fb38ba796"
                                        alt="Product"
                                        className="h-[320px] w-full object-cover transition duration-700 group-hover:scale-110"
                                    />
                                </div>

                                <div className="p-8">

                                    <div className="flex items-center justify-between">

                                        <h3 className="text-2xl font-bold">
                                            Bicicleta Vintage
                                        </h3>

                                        <span className="rounded-full bg-[#00C896]/20 px-3 py-1 text-sm text-[#00C896]">
                                            Buen estado
                                        </span>
                                    </div>

                                    <p className="mt-5 text-white/60">
                                        Ideal para ciudad. Intercambio por libros,
                                        cámara o tecnología.
                                    </p>

                                    <div className="mt-8 flex items-center justify-between">

                                        <span className="font-semibold text-cyan-400">
                                            📍 Madrid
                                        </span>

                                        <button className="rounded-xl bg-white/10 px-5 py-3 transition hover:bg-white/20">
                                            Ver más
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* HOW IT WORKS */}
                <section className="px-6 py-24 lg:px-20">

                    <div className="mb-16 text-center">

                        <h2 className="text-5xl font-black">
                            ¿Cómo funciona?
                        </h2>

                        <p className="mt-5 text-xl text-white/60">
                            Intercambiar nunca había sido tan fácil.
                        </p>
                    </div>

                    <div className="grid gap-10 md:grid-cols-3">

                        <div className="rounded-[35px] border border-white/10 bg-white/10 p-10 backdrop-blur-xl transition hover:-translate-y-2">

                            <div className="text-6xl">
                                📦
                            </div>

                            <h3 className="mt-8 text-3xl font-bold">
                                Publica
                            </h3>

                            <p className="mt-5 text-white/60">
                                Sube productos que ya no utilices y dales una
                                nueva oportunidad.
                            </p>
                        </div>

                        <div className="rounded-[35px] border border-white/10 bg-white/10 p-10 backdrop-blur-xl transition hover:-translate-y-2">

                            <div className="text-6xl">
                                🔍
                            </div>

                            <h3 className="mt-8 text-3xl font-bold">
                                Encuentra
                            </h3>

                            <p className="mt-5 text-white/60">
                                Descubre objetos interesantes cerca de ti.
                            </p>
                        </div>

                        <div className="rounded-[35px] border border-white/10 bg-white/10 p-10 backdrop-blur-xl transition hover:-translate-y-2">

                            <div className="text-6xl">
                                💬
                            </div>

                            <h3 className="mt-8 text-3xl font-bold">
                                Intercambia
                            </h3>

                            <p className="mt-5 text-white/60">
                                Habla con otros usuarios y acordad el intercambio.
                            </p>
                        </div>
                    </div>
                </section>

                {/* FOOTER */}
                <footer className="border-t border-white/10 bg-black/20 px-6 py-10 backdrop-blur-xl lg:px-20">

                    <div className="flex flex-col items-center justify-between gap-6 md:flex-row">

                        <div>

                            <h3 className="text-3xl font-black">
                                EcoSwap
                            </h3>

                            <p className="mt-3 text-white/50">
                                Plataforma de economía circular moderna.
                            </p>
                        </div>

                        <div className="flex gap-8 text-white/60">

                            <a href="#" className="transition hover:text-white">
                                Privacidad
                            </a>

                            <a href="#" className="transition hover:text-white">
                                Contacto
                            </a>

                            <a href="#" className="transition hover:text-white">
                                Ayuda
                            </a>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
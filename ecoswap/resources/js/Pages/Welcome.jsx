import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

export default function Welcome({ auth, products }) {
    // ESTADOS PARA EL MODAL Y CARRUSEL
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [currentImgIndex, setCurrentImgIndex] = useState(0);

    // FUNCIÓN PARA REDIRIGIR AL CHAT
    const handleChatRedirect = (sellerId) => {
        if (!auth.user) {
            router.get(route('login'));
            return;
        }
        // Redirige a una ruta de chat (debes tenerla definida en Laravel)
        router.get(`/chat/${sellerId}`);
    };

    // NAVEGACIÓN DEL CARRUSEL
    const nextImg = (e, images) => {
        e.stopPropagation();
        setCurrentImgIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    const prevImg = (e, images) => {
        e.stopPropagation();
        setCurrentImgIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

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
                        <div className="flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-[#00C896] to-cyan-400 text-xl font-black text-black shadow-lg">
                                ♻
                            </div>
                            <h1 className="text-3xl font-black tracking-tight">EcoSwap</h1>
                        </div>

                        <nav className="hidden items-center gap-10 lg:flex">
                            <a href="#" className="text-white/70 transition hover:text-white">Inicio</a>
                            <a href="#" className="text-white/70 transition hover:text-white">Explorar</a>
                            <a href="#" className="text-white/70 transition hover:text-white">Intercambios</a>
                            <a href="#" className="text-white/70 transition hover:text-white">Cómo funciona</a>
                        </nav>

                        <div className="flex items-center gap-4">
                            {auth.user ? (
                                <div className="flex items-center gap-6">
                                    <span className="hidden text-sm font-medium text-white/70 md:block">
                                        Hola, <span className="text-[#00C896]">{auth.user.name}</span>
                                    </span>
                                    {auth.user.role_id === 1 && (
                                        <Link href={route('dashboard')} className="text-sm font-bold text-cyan-400 transition hover:text-white">Dashboard</Link>
                                    )}
                                    <Link href={route('logout')} method="post" as="button" className="rounded-2xl border border-white/10 bg-white/5 px-6 py-3 font-bold text-white transition hover:bg-red-500/20">
                                        Cerrar sesión
                                    </Link>
                                </div>
                            ) : (
                                <>
                                    <Link href={route('login')} className="text-white/70 transition hover:text-white">Iniciar sesión</Link>
                                    <Link href={route('register')} className="rounded-2xl bg-gradient-to-r from-[#00C896] to-cyan-400 px-6 py-3 font-bold text-black transition hover:scale-105">
                                        Registrarse
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </header>

                {/* HERO */}
                <section className="relative grid min-h-screen grid-cols-1 lg:grid-cols-2">
                    <div className="flex flex-col justify-center px-10 pt-40 lg:px-24">
                        <span className="mb-8 w-fit rounded-full border border-white/10 bg-white/10 px-5 py-2 text-sm font-medium backdrop-blur-xl">
                            ♻ Plataforma de Economía Circular
                        </span>
                        <h1 className="max-w-3xl text-6xl font-black leading-tight lg:text-8xl">
                            Intercambia.
                            <span className="bg-gradient-to-r from-[#00C896] to-cyan-400 bg-clip-text text-transparent"> Reutiliza.</span>
                            {" "}Conecta.
                        </h1>
                        <p className="mt-8 max-w-2xl text-xl leading-relaxed text-white/70">
                            Convierte objetos olvidados en nuevas oportunidades. EcoSwap conecta personas para intercambiar productos sin dinero y reducir residuos.
                        </p>
                        <div className="mt-10 flex flex-wrap gap-5">
                            <Link href={auth.user ? '#' : route('register')} className="rounded-2xl bg-gradient-to-r from-[#00C896] to-cyan-400 px-8 py-4 text-lg font-bold text-black shadow-2xl transition hover:scale-105">
                                {auth.user ? 'Explorar Mercado' : 'Empezar ahora'}
                            </Link>
                            <button className="rounded-2xl border border-white/10 bg-white/10 px-8 py-4 text-lg font-semibold backdrop-blur-xl transition hover:bg-white/20">
                                Explorar productos
                            </button>
                        </div>

                        {/* STATS */}
                        <div className="mt-16 flex flex-wrap gap-12">
                            <div>
                                <h3 className="text-5xl font-black text-[#00C896]">+12K</h3>
                                <p className="mt-2 text-white/60">Intercambios realizados</p>
                            </div>
                            <div>
                                <h3 className="text-5xl font-black text-cyan-400">8T</h3>
                                <p className="mt-2 text-white/60">Residuos evitados</p>
                            </div>
                            <div>
                                <h3 className="text-5xl font-black text-white">100%</h3>
                                <p className="mt-2 text-white/60">Sin dinero</p>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT - CARD CAMARA VINTAGE RESPONSIVE */}
                    <div className="relative hidden items-center justify-center lg:flex p-10">
                        <div className="relative w-full max-w-[380px] xl:max-w-[500px] max-h-[85vh] rounded-[40px] border border-white/10 bg-white/10 p-5 shadow-2xl backdrop-blur-2xl transition-all hover:border-[#00C896]/30">
                            <img
                                src="https://images.unsplash.com/photo-1511994298241-608e28f14fde"
                                alt="Camera"
                                className="h-[350px] xl:h-[500px] w-full rounded-[30px] object-cover shadow-inner"
                            />
                            <div className="mt-6 px-2">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-2xl xl:text-3xl font-bold">Cámara Vintage</h3>
                                    <span className="rounded-full bg-[#00C896]/20 px-4 py-1 text-sm font-bold text-[#00C896]">Disponible</span>
                                </div>
                                <p className="mt-3 text-white/60 text-sm xl:text-base">Busco intercambio por consola o tablet.</p>
                                <div className="mt-6 flex items-center justify-between">
                                    <span className="text-lg font-semibold text-cyan-400">Madrid</span>
                                    <button className="rounded-xl bg-white/10 px-6 py-3 backdrop-blur-xl transition hover:bg-white/20 text-sm font-bold">Ver producto</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* SEARCH SECTION */}
                <section className="relative z-20 -mt-20 px-6 pb-24 lg:px-20">
                    <div className="rounded-[40px] border border-white/10 bg-white/10 p-8 shadow-2xl backdrop-blur-2xl">
                        <div className="grid gap-5 lg:grid-cols-4">
                            <input type="text" placeholder="Buscar productos..." className="rounded-2xl border border-white/10 bg-white/10 p-5 text-white placeholder:text-white/40 focus:border-[#00C896] focus:outline-none" />
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
                            <button className="rounded-2xl bg-gradient-to-r from-[#00C896] to-cyan-400 p-5 text-lg font-bold text-black transition hover:scale-[1.02]">Buscar</button>
                        </div>
                    </div>
                </section>

                {/* PRODUCTS SECTION */}
                <section className="px-6 py-20 lg:px-20">
                    <div className="mb-16">
                        <h2 className="text-5xl font-black">Productos destacados</h2>
                        <p className="mt-4 text-xl text-white/60">Objetos esperando una segunda vida.</p>
                    </div>

                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {products && products.map((product) => (
                            <div key={product.id} className="group overflow-hidden rounded-[35px] border border-white/10 bg-white/10 shadow-2xl backdrop-blur-xl transition duration-500 hover:-translate-y-3 hover:border-[#00C896]/40">
                                <div className="relative overflow-hidden">
                                    <img src={product.product_images?.[0]?.url || "https://images.unsplash.com/photo-1512496015851-a90fb38ba796"} alt={product.name} className="h-[280px] w-full object-cover transition duration-700 group-hover:scale-110" />
                                    <div className="absolute top-4 right-4">
                                        <span className="rounded-full bg-black/40 backdrop-blur-md px-3 py-1 text-xs font-bold text-cyan-400 border border-white/10">{product.estimated_value}€ Est.</span>
                                    </div>
                                </div>
                                <div className="p-7">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-xl font-bold truncate pr-2">{product.name}</h3>
                                        <span className="shrink-0 rounded-full bg-[#00C896]/20 px-3 py-1 text-[10px] uppercase font-bold tracking-wider text-[#00C896]">
                                            {product.status === 'active' ? 'Nuevo' : product.status}
                                        </span>
                                    </div>
                                    <p className="mt-4 text-sm text-white/60 line-clamp-2 min-h-[40px]">{product.description}</p>
                                    <div className="mt-6 flex items-center justify-between border-t border-white/5 pt-5">
                                        <div className="flex items-center gap-2">
                                            <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-[#00C896] to-cyan-400 flex items-center justify-center text-[10px] text-black font-bold">
                                                {product.user?.name.charAt(0)}
                                            </div>
                                            <span className="text-xs font-medium text-white/70">{product.user?.name}</span>
                                        </div>
                                        <button 
                                            onClick={() => { setSelectedProduct(product); setCurrentImgIndex(0); }}
                                            className="rounded-xl bg-white/5 border border-white/10 px-4 py-2 text-xs font-bold transition hover:bg-[#00C896] hover:text-black"
                                        >
                                            Ver más
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* MODAL DETALLE CON CARRUSEL Y CHAT (ESTILO WALLAPOP) */}
                {selectedProduct && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={() => setSelectedProduct(null)}></div>
                        
                        <div className="relative flex h-full max-h-[90vh] w-full max-w-6xl overflow-hidden rounded-[40px] border border-white/10 bg-[#0A1625] shadow-2xl flex-col lg:flex-row">
                            
                            {/* LADO IZQUIERDO: CARRUSEL DE IMÁGENES */}
                            <div className="relative w-full lg:w-3/5 bg-black flex items-center justify-center group overflow-hidden">
                                {selectedProduct.product_images && selectedProduct.product_images.length > 0 ? (
                                    <>
                                        <img 
                                            src={selectedProduct.product_images[currentImgIndex].url} 
                                            className="h-full w-full object-contain transition-all duration-500" 
                                            alt={selectedProduct.name} 
                                        />
                                        {/* Controles Carrusel */}
                                        {selectedProduct.product_images.length > 1 && (
                                            <>
                                                <button onClick={(e) => prevImg(e, selectedProduct.product_images)} className="absolute left-5 h-12 w-12 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-[#00C896] transition-all opacity-0 group-hover:opacity-100">❮</button>
                                                <button onClick={(e) => nextImg(e, selectedProduct.product_images)} className="absolute right-5 h-12 w-12 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-[#00C896] transition-all opacity-0 group-hover:opacity-100">❯</button>
                                                <div className="absolute bottom-6 flex gap-2">
                                                    {selectedProduct.product_images.map((_, idx) => (
                                                        <div key={idx} className={`h-1.5 rounded-full transition-all ${idx === currentImgIndex ? 'w-8 bg-[#00C896]' : 'w-2 bg-white/30'}`}></div>
                                                    ))}
                                                </div>
                                            </>
                                        )}
                                    </>
                                ) : (
                                    <img src="https://images.unsplash.com/photo-1512496015851-a90fb38ba796" className="h-full w-full object-contain" alt="Placeholder" />
                                )}
                            </div>

                            {/* LADO DERECHO: INFORMACIÓN Y CHAT */}
                            <div className="flex w-full flex-col lg:w-2/5 p-8 lg:p-12 overflow-y-auto custom-scrollbar bg-[#0D1B2D]">
                                <button onClick={() => setSelectedProduct(null)} className="absolute right-8 top-8 z-50 text-white/50 hover:text-white transition-colors text-2xl">✕</button>
                                
                                <div className="mb-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="rounded-full bg-[#00C896]/20 px-4 py-1 text-xs font-black uppercase text-[#00C896] tracking-tighter">
                                            {selectedProduct.status}
                                        </span>
                                        <span className="text-3xl font-black text-cyan-400">{selectedProduct.estimated_value}€</span>
                                    </div>
                                    <h2 className="text-4xl font-black leading-tight">{selectedProduct.name}</h2>
                                </div>

                                <div className="space-y-8">
                                    <div>
                                        <h4 className="text-xs font-black uppercase text-white/30 tracking-widest mb-3">Descripción</h4>
                                        <p className="text-lg text-white/80 leading-relaxed">{selectedProduct.description}</p>
                                    </div>

                                    <hr className="border-white/5" />

                                    {/* PERFIL USUARIO Y BOTÓN CHAT */}
                                    <div className="flex items-center gap-5 p-6 rounded-[30px] border border-white/5 bg-white/5">
                                        <div className="h-16 w-16 rounded-full bg-gradient-to-tr from-[#00C896] to-cyan-400 flex items-center justify-center text-2xl text-black font-black">
                                            {selectedProduct.user?.name.charAt(0)}
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-xs font-bold text-white/30 uppercase">Vendedor</p>
                                            <p className="text-xl font-bold">{selectedProduct.user?.name}</p>
                                        </div>
                                        <button 
                                            onClick={() => handleChatRedirect(selectedProduct.user_id)}
                                            className="rounded-2xl bg-[#00C896] px-6 py-3 font-black text-black hover:scale-105 transition-transform"
                                        >
                                            Chat
                                        </button>
                                    </div>

                                    {/* COMENTARIOS */}
                                    <div>
                                        <h4 className="text-xs font-black uppercase text-white/30 tracking-widest mb-4">Comentarios</h4>
                                        <div className="space-y-4">
                                            {selectedProduct.comments?.length > 0 ? (
                                                selectedProduct.comments.map((c) => (
                                                    <div key={c.id} className="rounded-2xl bg-black/20 p-5 border border-white/5 text-sm text-white/70 italic">
                                                        "{c.content}"
                                                    </div>
                                                ))
                                            ) : (
                                                <p className="text-sm text-white/20 italic">No hay comentarios sobre este producto.</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* HOW IT WORKS */}
                <section className="px-6 py-24 lg:px-20">
                    <div className="mb-16 text-center">
                        <h2 className="text-5xl font-black">¿Cómo funciona?</h2>
                        <p className="mt-5 text-xl text-white/60">Intercambiar nunca había sido tan fácil.</p>
                    </div>
                    <div className="grid gap-10 md:grid-cols-3">
                        <div className="rounded-[35px] border border-white/10 bg-white/10 p-10 backdrop-blur-xl transition hover:-translate-y-2">
                            <div className="text-6xl">📦</div>
                            <h3 className="mt-8 text-3xl font-bold">Publica</h3>
                            <p className="mt-5 text-white/60">Sube productos que ya no utilices y dales una nueva oportunidad.</p>
                        </div>
                        <div className="rounded-[35px] border border-white/10 bg-white/10 p-10 backdrop-blur-xl transition hover:-translate-y-2">
                            <div className="text-6xl">🔍</div>
                            <h3 className="mt-8 text-3xl font-bold">Encuentra</h3>
                            <p className="mt-5 text-white/60">Descubre objetos interesantes cerca de ti.</p>
                        </div>
                        <div className="rounded-[35px] border border-white/10 bg-white/10 p-10 backdrop-blur-xl transition hover:-translate-y-2">
                            <div className="text-6xl">💬</div>
                            <h3 className="mt-8 text-3xl font-bold">Intercambia</h3>
                            <p className="mt-5 text-white/60">Habla con otros usuarios y acordad el intercambio.</p>
                        </div>
                    </div>
                </section>

                {/* FOOTER */}
                <footer className="border-t border-white/10 bg-black/20 px-6 py-10 backdrop-blur-xl lg:px-20">
                    <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
                        <div>
                            <h3 className="text-3xl font-black">EcoSwap</h3>
                            <p className="mt-3 text-white/50">Plataforma de economía circular moderna.</p>
                        </div>
                        <div className="flex gap-8 text-white/60">
                            <a href="#" className="transition hover:text-white">Privacidad</a>
                            <a href="#" className="transition hover:text-white">Contacto</a>
                            <a href="#" className="transition hover:text-white">Ayuda</a>
                        </div>
                    </div>
                </footer>
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
                .custom-scrollbar::-webkit-scrollbar { width: 5px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #00C896; }
            `}} />
        </>
    );
}
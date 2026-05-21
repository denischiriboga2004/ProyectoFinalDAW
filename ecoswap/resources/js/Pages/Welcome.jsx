import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

export default function Welcome({ auth, products }) {

    const [selectedProduct, setSelectedProduct] = useState(null);
    const [currentImgIndex, setCurrentImgIndex] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedZone, setSelectedZone] = useState('Todas');

    const filteredProducts = products?.filter((product) => {
        const query = searchQuery.trim().toLowerCase();
        const nameMatch = product.name?.toLowerCase().includes(query);
        const descriptionMatch = product.description?.toLowerCase().includes(query);
        const productZone = product.user?.address?.city || product.user?.address?.province || 'Zona desconocida';
        const zoneMatch = selectedZone === 'Todas' || productZone.toLowerCase() === selectedZone.toLowerCase();

        return (!query || nameMatch || descriptionMatch) && zoneMatch;
    }) || [];

    const handleChatRedirect = (productId) => {
        if (!auth.user) {
            router.get(route('login'));
            return;
        }

        router.get(route('chat.show', productId));
    };

    const handleUploadButtonClick = () => {
        if (auth.user) {
            router.get(route('products.create')); 
        } else {
            router.get(route('login')); 
        }
    };

    const nextImg = (e, images) => {
        e.stopPropagation();
        setCurrentImgIndex((prev) =>
            prev === images.length - 1 ? 0 : prev + 1
        );
    };

    const prevImg = (e, images) => {
        e.stopPropagation();
        setCurrentImgIndex((prev) =>
            prev === 0 ? images.length - 1 : prev - 1
        );
    };

    return (
        <>
            <Head title="EcoSwap" />

            <div className="min-h-screen overflow-x-hidden bg-[#07111F] text-white relative">

                <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                    <div className="absolute left-[-200px] top-[-200px] h-[500px] w-[500px] rounded-full bg-[#00C896] opacity-20 blur-3xl"></div>
                    <div className="absolute top-20 right-0 h-[600px] w-[600px] translate-x-1/3 rounded-full bg-cyan-400 opacity-20 blur-[120px]"></div>
                    <div className="absolute inset-0 opacity-10">
                        <div className="h-full w-full bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:60px_60px]"></div>
                    </div>
                </div>

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
                            {auth.user && (
                                <Link href="/mis-productos" className="text-[#00C896] font-bold transition hover:text-white">
                                    Mis Productos
                                </Link>
                            )}
                        </nav>

                        <div className="flex items-center gap-4">
                            {auth.user ? (
                                <div className="flex items-center gap-6">
                                    <span className="hidden text-sm font-medium text-white/70 md:block">
                                        Hola, <span className="text-[#00C896]">{auth.user.name}</span>
                                    </span>
                                    {auth.user.role_id === 1 && (
                                        <Link href={route('dashboard')} className="text-sm font-bold text-cyan-400 transition hover:text-white">
                                            Dashboard
                                        </Link>
                                    )}
                                    <Link href={route('logout')} method="post" as="button" className="rounded-2xl border border-white/10 bg-white/5 px-6 py-3 font-bold text-white transition hover:bg-red-500/20">
                                        Cerrar sesión
                                    </Link>
                                </div>
                            ) : (
                                <>
                                    <Link href={route('login')} className="text-white/70 transition hover:text-white">
                                        Iniciar sesión
                                    </Link>
                                    <Link href={route('register')} className="rounded-2xl bg-gradient-to-r from-[#00C896] to-cyan-400 px-6 py-3 font-bold text-black transition hover:scale-105">
                                        Registrarse
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </header>

                <section className="relative grid min-h-screen grid-cols-1 lg:grid-cols-2 z-10">
                    <div className="flex flex-col justify-center px-10 pt-40 lg:px-24">
                        <span className="mb-8 w-fit rounded-full border border-white/10 bg-white/10 px-5 py-2 text-sm font-medium backdrop-blur-xl">
                            Plataforma de Economía Circular
                        </span>

                        <h1 className="max-w-3xl text-6xl font-black leading-tight lg:text-8xl">
                            Intercambia.
                            <span className="bg-gradient-to-r from-[#00C896] to-cyan-400 bg-clip-text text-transparent"> Reutiliza.</span>
                            Conecta.
                        </h1>

                        <p className="mt-8 max-w-2xl text-xl leading-relaxed text-white/70">
                            Convierte objetos olvidados en nuevas oportunidades. EcoSwap conecta personas para intercambiar productos sin dinero y reducir residuos.
                        </p>

                        <div className="mt-10 flex flex-wrap gap-5">
                            <a href="#explore-section" className="rounded-2xl bg-gradient-to-r from-[#00C896] to-cyan-400 px-8 py-4 text-lg font-bold text-black shadow-2xl transition hover:scale-105 flex items-center justify-center">
                                Explorar Mercado
                            </a>
                            <button onClick={handleUploadButtonClick} className="rounded-2xl border border-white/10 bg-white/10 px-8 py-4 text-lg font-semibold backdrop-blur-xl transition hover:bg-white/20 hover:border-[#00C896]/50">
                                Subir productos
                            </button>
                        </div>
                    </div>

                    <div className="relative hidden items-center justify-center p-10 lg:flex">
                        <div className="relative w-full max-w-[380px] xl:max-w-[500px] max-h-[85vh] rounded-[40px] border border-white/10 bg-white/10 p-5 shadow-2xl backdrop-blur-2xl transition-all hover:border-[#00C896]/30">
                            <img src="https://images.unsplash.com/photo-1511994298241-608e28f14fde" alt="Camera" className="h-[350px] xl:h-[500px] w-full rounded-[30px] object-cover shadow-inner" />
                            <div className="mt-6 px-2">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-2xl xl:text-3xl font-bold">Cámara Vintage</h3>
                                    <span className="rounded-full bg-[#00C896]/20 px-4 py-1 text-sm font-bold text-[#00C896]">Disponible</span>
                                </div>
                                <p className="mt-3 text-sm text-white/60 xl:text-base">Busco intercambio por consola o tablet.</p>
                                <div className="mt-6 flex items-center justify-between">
                                    <span className="text-lg font-semibold text-cyan-400">Madrid</span>
                                    <button className="rounded-xl bg-white/10 px-6 py-3 text-sm font-bold backdrop-blur-xl transition hover:bg-white/20">Ver producto</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="explore-section" className="relative px-6 py-8 lg:px-20 z-10">
                    <div className="mb-8 grid gap-4 lg:flex lg:items-center lg:justify-between">
                        <div>
                            <h2 className="text-4xl font-black">Filtrar productos</h2>
                            <p className="mt-2 text-white/60">Busca por nombre y selecciona la zona deseada.</p>
                        </div>
                        <div className="grid w-full gap-4 lg:w-[60%] lg:grid-cols-[1.5fr_1fr]">
                            <label className="relative block">
                                <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Buscar productos..." className="w-full rounded-3xl border border-white/10 bg-white/10 px-5 py-4 text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30" />
                            </label>
                            <label className="block">
                                <select value={selectedZone} onChange={(e) => setSelectedZone(e.target.value)} className="w-full rounded-3xl border border-white/10 bg-white/10 px-5 py-4 text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30">
                                    <option>Todas</option>
                                    <option>Madrid</option>
                                    <option>Barcelona</option>
                                    <option>Valencia</option>
                                    <option>Sevilla</option>
                                </select>
                            </label>
                        </div>
                    </div>
                </section>

                <section className="relative px-6 py-10 lg:px-20 z-10">
                    <div className="mb-16">
                        <h2 className="text-5xl font-black">Productos destacados</h2>
                        <p className="mt-4 text-xl text-white/60">Objetos esperando una segunda vida.</p>
                    </div>

                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {filteredProducts.length > 0 ? filteredProducts.map((product) => (
                            <div key={product.id} className="group overflow-hidden rounded-[35px] border border-white/10 bg-white/10 shadow-2xl backdrop-blur-xl transition duration-500 hover:-translate-y-3 hover:border-[#00C896]/40">
                                <div className="relative overflow-hidden">
                                    {/* CORRECCIÓN AQUÍ: Se cambió product.product_images?.[0]?.url por product.images?.[0]?.image_path */}
                                    <img 
                                        src={product.images?.[0]?.image_path || "https://images.unsplash.com/photo-1512496015851-a90fb38ba796"} 
                                        alt={product.name} 
                                        className="h-[280px] w-full object-cover transition duration-700 group-hover:scale-110" 
                                    />
                                    <div className="absolute right-4 top-4">
                                        <span className="rounded-full border border-white/10 bg-black/40 px-3 py-1 text-xs font-bold text-cyan-400 backdrop-blur-md">
                                            {product.estimated_value}€ Est.
                                        </span>
                                    </div>
                                </div>

                                <div className="p-7">
                                    <div className="flex items-center justify-between">
                                        <h3 className="truncate pr-2 text-xl font-bold">{product.name}</h3>
                                        <span className="shrink-0 rounded-full bg-[#00C896]/20 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#00C896]">
                                            {product.status === 'active' ? 'Nuevo' : product.status}
                                        </span>
                                    </div>
                                    <p className="mt-4 min-h-[40px] line-clamp-2 text-sm text-white/60">{product.description}</p>
                                    <div className="mt-6 flex items-center justify-between border-t border-white/5 pt-5">
                                        <div className="flex items-center gap-2">
                                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-tr from-[#00C896] to-cyan-400 text-[10px] font-bold text-black">
                                                {product.user?.name.charAt(0)}
                                            </div>
                                            <span className="text-xs font-medium text-white/70">{product.user?.name}</span>
                                        </div>
                                        <button onClick={() => { setSelectedProduct(product); setCurrentImgIndex(0); }} className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold transition hover:bg-[#00C896] hover:text-black">
                                            Ver más
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )) : (
                            <div className="col-span-full rounded-[35px] border border-white/10 bg-white/10 p-10 text-center text-white/70">
                                No hay productos que coincidan con la búsqueda.
                            </div>
                        )}
                    </div>
                </section>

                <section className="relative px-6 py-24 lg:px-20 z-10">
                    <div className="mb-16 text-center">
                        <h2 className="text-5xl font-black">¿Cómo funciona?</h2>
                        <p className="mt-5 text-xl text-white/60">Intercambiar nunca había sido tan fácil.</p>
                    </div>

                    <div className="grid gap-10 md:grid-cols-3">
                        <div className="rounded-[35px] border border-white/10 bg-white/10 p-10 backdrop-blur-xl transition hover:-translate-y-2">
                            <div className="text-6xl">📦</div>
                            <h3 className="mt-8 text-3xl font-bold">Publica</h3>
                            <p className="mt-5 text-white/60">Sube productos que ya no utilices and dales una nueva oportunidad.</p>
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

                {selectedProduct && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={() => setSelectedProduct(null)}></div>
                        <div className="relative flex h-full max-h-[90vh] w-full max-w-6xl overflow-hidden rounded-[40px] border border-white/10 bg-[#0A1625] shadow-2xl flex-col lg:flex-row">
                            <div className="group relative flex w-full items-center justify-center overflow-hidden bg-black lg:w-3/5">
                                {/* CORRECCIÓN AQUÍ: Cambiado de product_images a images y de .url a .image_path */}
                                {selectedProduct.images && selectedProduct.images.length > 0 ? (
                                    <>
                                        <img src={selectedProduct.images[currentImgIndex].image_path} className="h-full w-full object-contain transition-all duration-500" alt={selectedProduct.name} />
                                        {selectedProduct.images.length > 1 && (
                                            <>
                                                <button onClick={(e) => prevImg(e, selectedProduct.images)} className="absolute left-5 flex h-12 w-12 items-center justify-center rounded-full bg-black/50 text-white opacity-0 transition-all group-hover:opacity-100 hover:bg-[#00C896]">❮</button>
                                                <button onClick={(e) => nextImg(e, selectedProduct.images)} className="absolute right-5 flex h-12 w-12 items-center justify-center rounded-full bg-black/50 text-white opacity-0 transition-all group-hover:opacity-100 hover:bg-[#00C896]">❯</button>
                                            </>
                                        )}
                                    </>
                                ) : (
                                    <img src="https://images.unsplash.com/photo-1512496015851-a90fb38ba796" className="h-full w-full object-contain" alt="Placeholder" />
                                )}
                            </div>

                            <div className="custom-scrollbar flex w-full flex-col overflow-y-auto bg-[#0D1B2D] p-8 lg:w-2/5 lg:p-12">
                                <button onClick={() => setSelectedProduct(null)} className="absolute right-8 top-8 z-50 text-2xl text-white/50 transition-colors hover:text-white">✕</button>
                                <div className="mb-6">
                                    <div className="mb-4 flex items-center justify-between">
                                        <span className="rounded-full bg-[#00C896]/20 px-4 py-1 text-xs font-black uppercase tracking-tighter text-[#00C896]">{selectedProduct.status}</span>
                                        <span className="text-3xl font-black text-cyan-400">{selectedProduct.estimated_value}€</span>
                                    </div>
                                    <h2 className="text-4xl font-black leading-tight">{selectedProduct.name}</h2>
                                </div>

                                <div className="space-y-8">
                                    <div>
                                        <h4 className="mb-3 text-xs font-black uppercase tracking-widest text-white/30">Descripción</h4>
                                        <p className="text-lg leading-relaxed text-white/80">{selectedProduct.description}</p>
                                    </div>
                                    {selectedProduct.swap_for && (
                                        <div>
                                            <h4 className="mb-3 text-xs font-black uppercase tracking-widest text-[#00C896]/70">Busca a cambio</h4>
                                            <p className="text-lg leading-relaxed text-[#00C896] font-medium">{selectedProduct.swap_for}</p>
                                        </div>
                                    )}
                                    <hr className="border-white/5" />
                                    <div className="flex items-center gap-5 rounded-[30px] border border-white/5 bg-white/5 p-6">
                                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-tr from-[#00C896] to-cyan-400 text-2xl font-black text-black">
                                            {selectedProduct.user?.name.charAt(0)}
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-xs font-bold uppercase text-white/30">Usuario</p>
                                            <p className="text-xl font-bold">{selectedProduct.user?.name}</p>
                                        </div>
                                        <button onClick={() => handleChatRedirect(selectedProduct.id)} className="rounded-2xl bg-[#00C896] px-6 py-3 font-black text-black transition-transform hover:scale-105">Chat</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <footer className="relative border-t border-white/10 bg-black/20 px-6 py-10 backdrop-blur-xl lg:px-20 z-10">
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

            <style dangerouslySetInnerHTML={{
                __html: `
                    .custom-scrollbar::-webkit-scrollbar { width: 5px; }
                    .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                    .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
                    .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #00C896; }
                `
            }} />
        </>
    );
}
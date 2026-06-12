import { Head, Link, router } from "@inertiajs/react";
import { useEffect, useState } from "react";

export default function Welcome({ auth, products, provinces, productTypes, filters }) {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [currentImgIndex, setCurrentImgIndex] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedZone, setSelectedZone] = useState("Todas");
    const [selectedCategory, setSelectedCategory] = useState(filters?.product_type_id ?? "Todas");
    const [visibleCount, setVisibleCount] = useState(10);
    const [showProfileMenu, setShowProfileMenu] = useState(false);


    const filteredProducts =
        products?.filter((product) => {
            const query = searchQuery.trim().toLowerCase();
            const nameMatch = product.name?.toLowerCase().includes(query);
            const descriptionMatch = product.description
                ?.toLowerCase()
                .includes(query);
            const productProvince =
                product.province ||
                product.user?.address?.province ||
                product.user?.address?.city ||
                "Zona desconocida";
            const productCategory = product.product_type_id || product.product_type || null;
            const zoneMatch =
                selectedZone === "Todas" ||
                productProvince.toLowerCase() === selectedZone.toLowerCase();

            const categoryMatch =
                !selectedCategory ||
                selectedCategory === "Todas" ||
                String(productCategory) === String(selectedCategory);

            return (!query || nameMatch || descriptionMatch) && zoneMatch && categoryMatch;
        }) || [];

    const visibleProducts = filteredProducts.slice(0, visibleCount);
    const hasMoreProducts = filteredProducts.length > visibleCount;

    useEffect(() => {
        setVisibleCount(10);
    }, [searchQuery, selectedZone, selectedCategory]);

    const handleChatRedirect = (productId) => {
        // Intenta ir directamente al chat
        // Si no está autenticado, la middleware lo redirigirá al login
        // guardando la URL intended para regresar aquí después
        router.get(route("chat.show", productId));
    };

    const handleUploadButtonClick = () => {
        // Intenta ir directamente a crear un producto
        // Si no está autenticado, la middleware lo redirigirá al login
        // guardando la URL intended para regresar aquí después
        router.get(route("products.create"));
    };

    // Abre el chat: muestra la pantalla de chat vacía sin conversación seleccionada.
    // Si no hay usuario, la middleware lo redirigirá al login guardando la URL intended.
    const openChatHome = () => {
        router.get(route("chat.index"));
    };

    const nextImg = (e, images) => {
        e.stopPropagation();
        setCurrentImgIndex((prev) =>
            prev === images.length - 1 ? 0 : prev + 1,
        );
    };

    const prevImg = (e, images) => {
        e.stopPropagation();
        setCurrentImgIndex((prev) =>
            prev === 0 ? images.length - 1 : prev - 1,
        );
    };

    const heroProduct =
        products && products.length > 0
            ? products[0]
            : {
                  id: "placeholder",
                  name: "Cámara Vintage",
                  description: "Busco intercambio por consola o tablet.",
                  estimated_value: 35,
                  status: "Disponible",
                  user: { name: "Usuario", address: { city: "Madrid" } },
                  product_images: [],
                  images: [],
              };

    return (
        <>
            <Head title="EcoSwap" />

            <div id="top" className="min-h-screen overflow-x-hidden bg-[#07111F] text-white relative">
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
                            <h1 className="text-3xl font-black tracking-tight">
                                EcoSwap
                            </h1>
                        </div>

                        <nav className="hidden items-center gap-10 lg:flex">
                            <a
                                href="#top"
                                className="text-white/70 transition hover:text-white"
                            >
                                Inicio
                            </a>
                            {auth.user && (
                                <a
                                    onClick={openChatHome}
                                    className="cursor-pointer text-white/70 transition hover:text-white"
                                >
                                    Chat
                                </a>
                            )}
                            <a
                                href="#products-section"
                                className="text-white/70 transition hover:text-white"
                            >
                                Explorar
                            </a>
                           
                            <a
                                href="#how-it-works"
                                className="text-white/70 transition hover:text-white"
                            >
                                Cómo funciona
                            </a>
                            <Link
                                href="/contacto"
                                className="text-white/70 transition hover:text-white"
                            >
                                Contacto
                            </Link>
                            {auth.user && (
                                <Link
                                    href="/mis-productos"
                                    className="text-[#00C896] font-bold transition hover:text-white"
                                >
                                    Mis Productos
                                </Link>
                            )}
                        </nav>

                        <div className="flex items-center gap-4">
                            {auth.user ? (
                                <div className="flex items-center gap-4">
                                    {auth.user.role_id === 1 && (
                                        <Link
                                            href={route("dashboard")}
                                            className="text-sm font-bold text-cyan-400 transition hover:text-white"
                                        >
                                            Dashboard
                                        </Link>
                                    )}
                                    <div
                                        className="relative"
                                        tabIndex={0}
                                        onBlur={(e) => {
                                            if (!e.currentTarget.contains(e.relatedTarget)) {
                                                setShowProfileMenu(false);
                                            }
                                        }}
                                    >
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowProfileMenu(
                                                    (value) => !value,
                                                )
                                            }
                                            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white transition hover:bg-white/20 focus:outline-none"
                                        >
                                            {auth.user.profile_photo_path ? (
                                                <img
                                                    src={`/storage/${auth.user.profile_photo_path}`}
                                                    alt={auth.user.name}
                                                    className="h-10 w-10 rounded-full object-cover"
                                                />
                                            ) : (
                                                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#00C896] text-sm font-bold text-black">
                                                    {auth.user.name?.charAt(0).toUpperCase()}
                                                </span>
                                            )}
                                        </button>

                                        {showProfileMenu && (
                                            <div className="absolute right-0 mt-2 w-44 rounded-3xl border border-white/10 bg-[#0B1726] p-2 shadow-2xl backdrop-blur-xl">
                                                <Link
                                                    href={route('profile.edit')}
                                                    className="block rounded-2xl px-4 py-3 text-sm text-white transition hover:bg-white/10"
                                                >
                                                    Perfil
                                                </Link>
                                                <Link
                                                    href={route('logout')}
                                                    method="post"
                                                    as="button"
                                                    className="block w-full rounded-2xl px-4 py-3 text-left text-sm text-white transition hover:bg-white/10"
                                                >
                                                    Cerrar sesión
                                                </Link>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <Link
                                        href={route("login")}
                                        className="text-white/70 transition hover:text-white"
                                    >
                                        Iniciar sesión
                                    </Link>
                                    <Link
                                        href={route("register")}
                                        className="rounded-2xl bg-gradient-to-r from-[#00C896] to-cyan-400 px-6 py-3 font-bold text-black transition hover:scale-105"
                                    >
                                        Registrarse
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </header>

                <section className="relative grid min-h-screen grid-cols-1 gap-8 md:grid-cols-2 z-10">
                    <div className="flex flex-col justify-center px-6 pt-24 md:px-10 lg:px-24">
                        <span className="mb-8 w-fit rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur-xl">
                            Plataforma de Economía Circular
                        </span>

                        <h1 className="max-w-full text-3xl font-black leading-snug md:max-w-2xl md:text-4xl lg:text-5xl xl:text-5xl">
                            Intercambia.
                            <span className="bg-gradient-to-r from-[#00C896] to-cyan-400 bg-clip-text text-transparent">
                                {" "}
                                Reutiliza.
                            </span>
                            Conecta.
                        </h1>

                        <p className="mt-6 max-w-xl text-base leading-relaxed text-white/70 md:text-lg">
                            Convierte objetos olvidados en nuevas oportunidades.
                            EcoSwap conecta personas para intercambiar productos
                            sin dinero y reducir residuos.
                        </p>

                        <div className="mt-10 flex flex-wrap gap-5">
                            <a
                                href="#products-section"
                                className="rounded-2xl bg-gradient-to-r from-[#00C896] to-cyan-400 px-6 py-4 text-base font-bold text-black shadow-2xl transition hover:scale-105 flex items-center justify-center"
                            >
                                Explorar Mercado
                            </a>
                            {auth.user && (
                                <button
                                    onClick={openChatHome}
                                    className="rounded-2xl border border-white/10 bg-white/10 px-6 py-4 text-base font-bold text-white transition hover:bg-white/20"
                                >
                                    Chat
                                </button>
                            )}
                            <button
                                onClick={handleUploadButtonClick}
                                className="rounded-2xl border border-white/10 bg-white/10 px-6 py-4 text-base font-semibold backdrop-blur-xl transition hover:bg-white/20 hover:border-[#00C896]/50"
                            >
                                Subir productos
                            </button>
                        </div>
                    </div>

                    <div className="relative flex items-center justify-center p-6">
                        <div className="relative w-full max-w-[300px] sm:max-w-[340px] xl:max-w-[420px] rounded-[28px] border border-white/10 bg-white/10 p-3 shadow-2xl backdrop-blur-2xl transition-all hover:border-[#00C896]/30">
                            {heroProduct.product_images?.[0]?.url || heroProduct.images?.[0]?.url ? (
                                <img
                                    src={heroProduct.product_images?.[0]?.url || heroProduct.images?.[0]?.url}
                                    alt={heroProduct.name}
                                    className="h-[220px] sm:h-[300px] w-full rounded-[20px] object-cover shadow-inner"
                                />
                            ) : (
                                <div className="flex h-[220px] sm:h-[300px] w-full items-center justify-center rounded-[20px] bg-slate-900/80 text-sm text-slate-300 shadow-inner">
                                    No hay imágenes
                                </div>
                            )}
                            <div className="mt-4 px-2">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-lg sm:text-2xl font-bold">
                                        {heroProduct.name}
                                    </h3>
                                    <span className="rounded-full bg-[#00C896]/20 px-3 py-1 text-sm font-bold text-[#00C896]">
                                        {heroProduct.status}
                                    </span>
                                </div>
                                <p className="mt-2 text-sm text-white/60 line-clamp-2">
                                    {heroProduct.description}
                                </p>
                                {heroProduct.swap_for && (
                                    <p className="mt-3 text-sm font-medium text-[#00C896]">
                                        Busca a cambio: {heroProduct.swap_for}
                                    </p>
                                )}
                                <div className="mt-4 flex items-center justify-between">
                                    <span className="text-sm font-semibold text-cyan-400">
                                        {heroProduct.user?.address?.city || heroProduct.user?.name}
                                    </span>
                                    <button
                                        onClick={() => {
                                            setSelectedProduct(heroProduct);
                                            setCurrentImgIndex(0);
                                        }}
                                        className="rounded-xl bg-white/10 px-4 py-2 text-sm font-bold backdrop-blur-xl transition hover:bg-white/20"
                                    >
                                        Ver producto
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="products-section" className="relative px-6 pt-32 pb-32 lg:px-20 z-10">
                    <div className="mb-16">
                        <h2 className="text-5xl font-black">
                            Descubre productos cerca de ti
                        </h2>
                        <p className="mt-4 text-xl text-white/60">
                            Objetos esperando una segunda vida.
                        </p>

                        <div className="mt-10 grid gap-4 md:grid-cols-2">
                            <label className="relative block">
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) =>
                                        setSearchQuery(e.target.value)
                                    }
                                    placeholder="Buscar productos..."
                                    className="w-full rounded-3xl border border-white/10 bg-[#07111F] px-5 py-4 text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30"
                                />
                            </label>

                            <div className="flex w-full items-center gap-3">
                                <select
                                    value={selectedZone}
                                    onChange={(e) => setSelectedZone(e.target.value)}
                                    className="w-1/2 rounded-3xl border border-white/10 bg-[#07111F] px-5 py-4 text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30"
                                >
                                    <option value="Todas">Todas</option>
                                    {provinces && provinces.map((p) => (
                                        <option key={p.id} value={p.name}>{p.name}</option>
                                    ))}
                                </select>

                                <select
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                    className="w-1/2 rounded-3xl border border-white/10 bg-[#07111F] px-5 py-4 text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30"
                                >
                                    <option value="Todas">Todas</option>
                                    {productTypes && productTypes.map((t) => (
                                        <option key={t.id} value={t.id}>{t.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {visibleProducts.length > 0 ? (
                            visibleProducts.map((product) => (
                                <div
                                    key={product.id}
                                    className="group overflow-hidden rounded-[35px] border border-white/10 bg-white/10 shadow-2xl backdrop-blur-xl transition duration-500 hover:-translate-y-3 hover:border-[#00C896]/40"
                                >
                                    <div className="relative overflow-hidden">
                                        {product.product_images?.[0]?.url || product.images?.[0]?.url ? (
                                            <img
                                                src={product.product_images?.[0]?.url || product.images?.[0]?.url}
                                                alt={product.name}
                                                className="h-[280px] w-full object-cover transition duration-700 group-hover:scale-110"
                                            />
                                        ) : (
                                            <div className="flex h-[280px] w-full items-center justify-center bg-slate-900/80 text-sm text-slate-300">
                                                No hay imágenes
                                            </div>
                                        )}
                                        <div className="absolute right-4 top-4">
                                            <span className="rounded-full border border-white/10 bg-black/40 px-3 py-1 text-xs font-bold text-cyan-400 backdrop-blur-md">
                                                {product.estimated_value}€ Est.
                                            </span>
                                        </div>
                                    </div>

                                    <div className="p-7">
                                        <div className="flex items-center justify-between">
                                            <h3 className="truncate pr-2 text-xl font-bold">
                                                {product.name}
                                            </h3>
                                            <span className="shrink-0 rounded-full bg-[#00C896]/20 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#00C896]">
                                                {product.status === "active"
                                                    ? "Nuevo"
                                                    : product.status}
                                            </span>
                                        </div>
                                        <p className="mt-4 min-h-[40px] line-clamp-2 text-sm text-white/60">
                                            {product.description}
                                        </p>
                                        <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-white/50">
                                            {product.type?.name && (
                                                <span className="rounded-full bg-cyan-400/10 px-2 py-1 text-xs font-medium text-cyan-400">
                                                    {product.type.name}
                                                </span>
                                            )}
                                            <span>•</span>
                                            <span>
                                                {product.province || product.user?.address?.province || product.user?.address?.city || 'Ubicación no disponible'}
                                            </span>
                                        </div>
                                        {product.swap_for && (
                                            <p className="mt-3 text-sm font-medium text-[#00C896]">
                                                Busca a cambio: {product.swap_for}
                                            </p>
                                        )}
                                        <div className="mt-6 flex items-center justify-between border-t border-white/5 pt-5">
                                            <div className="flex items-center gap-2">
                                            <Link
                                                href={route('users.show', product.user?.id)}
                                                className="text-xs font-medium text-white/70 transition hover:text-[#00C896]"
                                            >
                                                <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-tr from-[#00C896] to-cyan-400 text-[10px] font-bold text-black">
                                                    {product.user?.name.charAt(
                                                        0,
                                                    )}
                                                </div>
                                                <span className="ml-2">{product.user?.name}</span>
                                            </Link>
                                        </div>
                                            <button
                                                onClick={() => {
                                                    setSelectedProduct(product);
                                                    setCurrentImgIndex(0);
                                                }}
                                                className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold transition hover:bg-[#00C896] hover:text-black"
                                            >
                                                Ver más
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full rounded-[35px] border border-white/10 bg-white/10 p-10 text-center text-white/70">
                                No hay productos que coincidan con la búsqueda.
                            </div>
                        )}
                    </div>
                    {hasMoreProducts && (
                        <div className="mt-10 flex justify-center">
                            <button
                                onClick={() => setVisibleCount((count) => count + 10)}
                                className="rounded-2xl bg-[#00C896] px-8 py-4 text-base font-bold text-black transition hover:bg-cyan-300"
                            >
                                Cargar más
                            </button>
                        </div>
                    )}
                </section>

                <section id="how-it-works" className="relative px-6 pt-32 pb-24 lg:px-20 z-10">
                    <div className="mb-16 text-center">
                        <h2 className="text-5xl font-black">¿Cómo funciona?</h2>
                        <p className="mt-5 text-xl text-white/60">
                            Intercambiar nunca había sido tan fácil.
                        </p>
                    </div>

                    <div className="grid gap-10 md:grid-cols-3">
                        <div className="rounded-[35px] border border-white/10 bg-white/10 p-10 backdrop-blur-xl transition hover:-translate-y-2">
                            <svg className="h-16 w-16 text-[#00C896]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <h3 className="mt-8 text-3xl font-bold">Publica</h3>
                            <p className="mt-5 text-white/60">
                                Sube productos que ya no utilices y dales una
                                nueva oportunidad.
                            </p>
                        </div>
                        <div className="rounded-[35px] border border-white/10 bg-white/10 p-10 backdrop-blur-xl transition hover:-translate-y-2">
                            <svg className="h-16 w-16 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <h3 className="mt-8 text-3xl font-bold">
                                Encuentra
                            </h3>
                            <p className="mt-5 text-white/60">
                                Descubre objetos interesantes cerca de ti.
                            </p>
                        </div>
                        <div className="rounded-[35px] border border-white/10 bg-white/10 p-10 backdrop-blur-xl transition hover:-translate-y-2">
                            <svg className="h-16 w-16 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                            <h3 className="mt-8 text-3xl font-bold">
                                Intercambia
                            </h3>
                            <p className="mt-5 text-white/60">
                                Habla con otros usuarios y acordad el
                                intercambio.
                            </p>
                        </div>
                    </div>
                </section>

                {selectedProduct && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <div
                            className="absolute inset-0 bg-black/90 backdrop-blur-md"
                            onClick={() => setSelectedProduct(null)}
                        ></div>
                        <div className="relative flex h-full max-h-[90vh] w-full max-w-6xl overflow-hidden rounded-[40px] border border-white/10 bg-[#0A1625] shadow-2xl flex-col lg:flex-row">
                            <div className="group relative flex w-full items-center justify-center overflow-hidden bg-black lg:w-3/5">
                                {(selectedProduct.product_images &&
                                    selectedProduct.product_images.length >
                                        0) ||
                                (selectedProduct.images &&
                                    selectedProduct.images.length > 0) ? (
                                    <>
                                        {selectedProduct.product_images?.[0]?.url || selectedProduct.images?.[0]?.url ? (
                                            <img
                                                src={
                                                    selectedProduct.product_images?.[currentImgIndex]?.url ||
                                                    selectedProduct.images?.[currentImgIndex]?.url
                                                }
                                                className="h-full w-full object-contain transition-all duration-500"
                                                alt={selectedProduct.name}
                                            />
                                        ) : (
                                            <div className="flex h-full w-full items-center justify-center bg-black text-sm text-slate-300">
                                                No hay imágenes
                                            </div>
                                        )}
                                        {(selectedProduct.product_images
                                            ?.length > 1 ||
                                            selectedProduct.images?.length >
                                                1) && (
                                            <>
                                                <button
                                                    onClick={(e) =>
                                                        prevImg(
                                                            e,
                                                            selectedProduct.images,
                                                        )
                                                    }
                                                    className="absolute left-5 flex h-12 w-12 items-center justify-center rounded-full bg-black/50 text-white opacity-0 transition-all group-hover:opacity-100 hover:bg-[#00C896]"
                                                >
                                                    ❮
                                                </button>
                                                <button
                                                    onClick={(e) =>
                                                        nextImg(
                                                            e,
                                                            selectedProduct.images,
                                                        )
                                                    }
                                                    className="absolute right-5 flex h-12 w-12 items-center justify-center rounded-full bg-black/50 text-white opacity-0 transition-all group-hover:opacity-100 hover:bg-[#00C896]"
                                                >
                                                    ❯
                                                </button>
                                            </>
                                        )}
                                    </>
                                ) : (
                                    <div className="flex h-full w-full items-center justify-center bg-black text-sm text-slate-300">
                                        No hay imágenes
                                    </div>
                                )}
                            </div>

                            <div className="custom-scrollbar flex w-full flex-col overflow-y-auto bg-[#0D1B2D] p-8 lg:w-2/5 lg:p-12">
                                <button
                                    onClick={() => setSelectedProduct(null)}
                                    className="absolute right-8 top-8 z-50 text-2xl text-white/50 transition-colors hover:text-white"
                                >
                                    ✕
                                </button>
                                <div className="mb-6">
                                    <div className="mb-4 flex items-center justify-between">
                                        <span className="rounded-full bg-[#00C896]/20 px-4 py-1 text-xs font-black uppercase tracking-tighter text-[#00C896]">
                                            {selectedProduct.status}
                                        </span>
                                        <span className="text-3xl font-black text-cyan-400">
                                            {selectedProduct.estimated_value}€
                                        </span>
                                    </div>
                                    <h2 className="text-4xl font-black leading-tight">
                                        {selectedProduct.name}
                                    </h2>
                                    <div className="mt-3 flex flex-wrap items-center gap-3 text-sm">
                                        {selectedProduct.type?.name && (
                                            <span className="rounded-full bg-cyan-400/10 px-3 py-1 text-xs font-medium text-cyan-400">
                                                {selectedProduct.type.name}
                                            </span>
                                        )}
                                        <span className="text-white/40">•</span>
                                        <span className="text-white/70">
                                            {selectedProduct.province || selectedProduct.user?.address?.province || selectedProduct.user?.address?.city || 'Ubicación no disponible'}
                                        </span>
                                    </div>
                                </div>

                                <div className="space-y-8">
                                    <div>
                                        <h4 className="mb-3 text-xs font-black uppercase tracking-widest text-white/30">
                                            Descripción
                                        </h4>
                                        <p className="text-lg leading-relaxed text-white/80">
                                            {selectedProduct.description}
                                        </p>
                                    </div>
                                    {selectedProduct.swap_for && (
                                        <div>
                                            <h4 className="mb-3 text-xs font-black uppercase tracking-widest text-[#00C896]/70">
                                                Busca a cambio
                                            </h4>
                                            <p className="text-lg leading-relaxed text-[#00C896] font-medium">
                                                {selectedProduct.swap_for}
                                            </p>
                                        </div>
                                    )}
                                    <hr className="border-white/5" />
                                    <div className="flex items-center gap-5 rounded-[30px] border border-white/5 bg-white/5 p-6">
                                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-tr from-[#00C896] to-cyan-400 text-2xl font-black text-black">
                                            {selectedProduct.user?.name.charAt(
                                                0,
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-xs font-bold uppercase text-white/30">
                                                Usuario
                                            </p>
                                            <Link
                                                href={route('users.show', selectedProduct.user?.id)}
                                                className="text-xl font-bold text-white transition hover:text-[#00C896]"
                                            >
                                                {selectedProduct.user?.name}
                                            </Link>
                                        </div>
                                        <button
                                            onClick={() =>
                                                handleChatRedirect(
                                                    selectedProduct.id,
                                                )
                                            }
                                            className="rounded-2xl bg-[#00C896] px-6 py-3 font-black text-black transition-transform hover:scale-105"
                                        >
                                            Chat
                                        </button>
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
                            <p className="mt-3 text-white/50">
                                Plataforma de economía circular moderna.
                            </p>
                        </div>
                        <div className="flex flex-col items-center gap-4 md:flex-row md:gap-8">
                            <div className="flex gap-8 text-white/60">
                                <a href="#" className="transition hover:text-white">
                                    Privacidad
                                </a>
                                <a href="/contacto" className="transition hover:text-white">
                                    Ayuda
                                </a>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>

            <style
                dangerouslySetInnerHTML={{
                    __html: `
                    .custom-scrollbar::-webkit-scrollbar { width: 5px; }
                    .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                    .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
                    .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #00C896; }
                `,
                }}
            />
        </>
    );
}

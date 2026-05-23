import { Head, Link } from "@inertiajs/react";

export default function MyProducts({ products = [], auth }) {
    return (
        <>
            <Head title="Mis Productos - EcoSwap" />

            <div className="min-h-screen overflow-x-hidden bg-[#07111F] text-white relative">
                {/* Fondos Decorativos */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                    <div className="absolute left-[-200px] top-[-200px] h-[500px] w-[500px] rounded-full bg-[#00C896] opacity-10 blur-3xl"></div>
                    <div className="absolute inset-0 opacity-5">
                        <div className="h-full w-full bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:60px_60px]"></div>
                    </div>
                </div>

                {/* Navbar / Header */}
                <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-white/5 backdrop-blur-xl">
                    <div className="flex items-center justify-between px-10 py-5 lg:px-20">
                        <div className="flex items-center gap-3">
                            <Link href="/" className="flex items-center gap-3">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-[#00C896] to-cyan-400 text-xl font-black text-black shadow-lg">
                                    ♻
                                </div>
                                <h1 className="text-3xl font-black tracking-tight">
                                    EcoSwap
                                </h1>
                            </Link>
                            <span className="hidden rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-medium backdrop-blur-xl md:block">
                                Mis Publicaciones
                            </span>
                        </div>

                        <div className="flex items-center gap-4">
                            <Link
                                href="/products/create"
                                className="rounded-2xl bg-gradient-to-r from-[#00C896] to-cyan-400 px-6 py-3 font-bold text-black transition hover:scale-105"
                            >
                                + Subir Producto
                            </Link>
                        </div>
                    </div>
                </header>

                {/* Contenido Principal */}
                <main className="relative max-w-7xl mx-auto px-6 pt-40 pb-20 z-10">
                    <div className="mb-12">
                        <h2 className="text-5xl font-black">
                            Mis productos en intercambio
                        </h2>
                        <p className="mt-4 text-xl text-white/60">
                            Aquí puedes revisar y gestionar las cosas que has
                            subido a la plataforma.
                        </p>
                    </div>

                    {products.length === 0 ? (
                        <div className="rounded-[35px] border border-white/10 bg-white/5 p-20 text-center backdrop-blur-xl">
                            <p className="text-xl text-white/50 font-medium">
                                Aún no has añadido ningún producto.
                            </p>
                            <Link
                                href="/products/create"
                                className="mt-6 inline-block text-sm font-bold text-[#00C896] hover:underline"
                            >
                                Publica tu primer objeto ahora
                            </Link>
                        </div>
                    ) : (
                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {products.map((product) => {
                                const images =
                                    product.product_images ||
                                    product.productImages ||
                                    [];
                                const rawImage =
                                    images.length > 0
                                        ? images[0].url || images[0].image_path
                                        : null;

                                const normalizeImageUrl = (value) => {
                                    if (!value) return null;
                                    if (
                                        value.startsWith("http://") ||
                                        value.startsWith("https://")
                                    )
                                        return value;
                                    if (value.startsWith("/storage/"))
                                        return value;
                                    if (value.startsWith("storage/"))
                                        return `/${value}`;
                                    if (value.startsWith("/public/"))
                                        return `/storage/${value.replace(/^\/public\//, "")}`;
                                    return `/storage/${value.replace(/^public\//, "")}`;
                                };

                                const firstImage = normalizeImageUrl(rawImage);

                                const hasValidImage =
                                    firstImage &&
                                    firstImage.trim() !== "" &&
                                    !firstImage.endsWith("/storage/");

                                return (
                                    <div
                                        key={product.id}
                                        className="group overflow-hidden rounded-[35px] border border-white/10 bg-white/10 shadow-2xl backdrop-blur-xl p-4 flex flex-col justify-between"
                                    >
                                        {/* Contenedor de la Imagen */}
                                        <div className="relative aspect-square w-full rounded-[25px] overflow-hidden bg-black/40 mb-5">
                                            {hasValidImage ? (
                                                <img
                                                    src={firstImage}
                                                    alt={product.name}
                                                    className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                                                    onError={(e) => {
                                                        e.target.style.display =
                                                            "none";
                                                        const fallback =
                                                            e.target
                                                                .nextSibling;
                                                        if (fallback)
                                                            fallback.style.display =
                                                                "flex";
                                                    }}
                                                />
                                            ) : null}

                                            {/* Fallback si no hay foto */}
                                            <div
                                                className="w-full h-full flex flex-col gap-2 items-center justify-center text-sm text-white/30"
                                                style={{
                                                    display: hasValidImage
                                                        ? "none"
                                                        : "flex",
                                                }}
                                            >
                                                <span>📷</span>
                                                <span>Sin foto disponible</span>
                                            </div>

                                            {/* Badge de Estado */}
                                            <div className="absolute right-3 top-3">
                                                <span className="rounded-full bg-black/60 backdrop-blur-md px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#00C896]">
                                                    {product.status}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Detalles del Producto */}
                                        <div>
                                            <h3 className="truncate text-xl font-bold px-2">
                                                {product.name}
                                            </h3>
                                            <p className="mt-2 line-clamp-2 text-sm text-white/60 px-2 min-h-[40px]">
                                                {product.description}
                                            </p>

                                            <div className="mt-4 pt-4 border-t border-white/5 flex justify-between items-center px-2 text-xs">
                                                <span className="text-white/50">
                                                    Cambio por:{" "}
                                                    <strong className="text-white">
                                                        {product.swap_for ||
                                                            "Cualquier cosa"}
                                                    </strong>
                                                </span>
                                                <span className="font-bold text-cyan-400 text-sm">
                                                    {product.estimated_value}€
                                                </span>
                                            </div>

                                            {/* Acción: Editar */}
                                            <div className="mt-4 pt-2">
                                                <Link
                                                    href={`/products/${product.id}/edit`}
                                                    className="w-full block text-center rounded-xl border border-white/10 bg-white/5 py-2.5 text-xs font-bold transition hover:bg-[#00C896] hover:text-black"
                                                >
                                                    Editar Producto
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </main>
            </div>
        </>
    );
}

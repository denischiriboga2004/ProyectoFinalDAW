import { Head, Link, router, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function Show({ profileUser, products, comments, auth }) {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [currentImgIndex, setCurrentImgIndex] = useState(0);
    const canComment = auth.user && auth.user.id !== profileUser.id;
    const form = useForm({
        content: '',
        rating: '',
    });

    const submit = (event) => {
        event.preventDefault();
        form.post(route('users.comments.store', profileUser.id), {
            preserveScroll: true,
            onSuccess: () => form.reset('content', 'rating'),
        });
    };

    const handleChatRedirect = (productId) => {
        if (!auth.user) {
            router.get(route('login'));
            return;
        }

        router.get(route('chat.show', productId));
    };

    const nextImg = (event, images) => {
        event.stopPropagation();
        setCurrentImgIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    const prevImg = (event, images) => {
        event.stopPropagation();
        setCurrentImgIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white">
            <Head title={`${profileUser.name} · Perfil`} />

            <header className="relative overflow-hidden bg-[#07101b] pb-20 pt-8 sm:pt-10">
                <div className="absolute inset-x-0 top-0 h-80 bg-gradient-to-b from-cyan-500/10 to-transparent" />
                <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
                    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.3em] text-slate-300 transition hover:text-white"
                        >
                               <div className="flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-[#00C896] to-cyan-400 text-xl font-black text-black shadow-lg">
                                ♻
                            </div>
                            <h1 className="text-3xl font-black tracking-tight">
                                EcoSwap
                            </h1>
                        </div>
                        </Link>
                        <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.3em] text-slate-200">
                            {profileUser.role?.name ?? 'Usuario'}
                        </div>
                    </div>

                    <div className="grid gap-6 lg:grid-cols-[1.35fr_0.85fr]">
                        <div className="rounded-[32px] border border-white/10 bg-white/5 p-8 shadow-2xl shadow-cyan-500/10 backdrop-blur-xl">
                            <div className="flex items-center gap-5">
                                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-cyan-400/10 text-4xl font-black text-cyan-300">
                                    {profileUser.name?.charAt(0) ?? 'U'}
                                </div>
                                <div>
                                    <p className="text-xs uppercase tracking-[0.3em] text-cyan-300/70">Perfil</p>
                                    <h1 className="mt-2 text-4xl font-black text-white">{profileUser.name}</h1>
                                    <p className="mt-3 max-w-2xl text-sm text-slate-300">{profileUser.email}</p>
                                </div>
                            </div>

                            <div className="mt-8 flex flex-wrap gap-3">
                                <span className="rounded-full bg-white/5 px-4 py-2 text-sm text-slate-200">
                                    {profileUser.status === 'active' ? 'Activo' : 'Inactivo'}
                                </span>
                                <span className="rounded-full bg-white/5 px-4 py-2 text-sm text-slate-200">
                                    {profileUser.address?.city ?? profileUser.address?.province ?? 'Ubicación no disponible'}
                                </span>
                                <span className="rounded-full bg-white/5 px-4 py-2 text-sm text-slate-200">
                                    {products.length} producto{products.length === 1 ? '' : 's'}
                                </span>
                                <span className="rounded-full bg-white/5 px-4 py-2 text-sm text-slate-200">
                                    {comments.length} comentario{comments.length === 1 ? '' : 's'}
                                </span>
                            </div>
                        </div>

                        <div className="rounded-[32px] border border-white/10 bg-slate-900/80 p-8 shadow-2xl shadow-cyan-500/10">
                            <p className="text-sm uppercase tracking-[0.3em] text-cyan-300/70">Resumen rápido</p>
                            <div className="mt-6 space-y-4">
                                <div className="rounded-[28px] bg-[#0f202f] p-5">
                                    <p className="text-sm text-slate-400">Productos publicados</p>
                                    <p className="mt-2 text-3xl font-black text-white">{products.length}</p>
                                </div>
                                <div className="rounded-[28px] bg-[#0f202f] p-5">
                                    <p className="text-sm text-slate-400">Comentarios de perfil</p>
                                    <p className="mt-2 text-3xl font-black text-white">{comments.length}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <main className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-12">
                <section className="-mt-16 rounded-[32px] bg-[#08101d]/90 p-6 shadow-2xl shadow-slate-950/40 backdrop-blur-xl md:p-8">
                    <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                            <h2 className="text-2xl font-black text-white">Productos de {profileUser.name}</h2>
                            <p className="mt-2 text-sm text-slate-400">Aquí están todos los productos que ha publicado este usuario.</p>
                        </div>
                        <div className="rounded-full bg-white/5 px-4 py-2 text-sm text-slate-200">
                            {products.length} artículo{products.length === 1 ? '' : 's'}
                        </div>
                    </div>

                    {products.length ? (
                        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
                            {products.map((product) => (
                                <div
                                    key={product.id}
                                    className="group overflow-hidden rounded-[35px] border border-white/10 bg-white/10 shadow-2xl backdrop-blur-xl transition duration-500 hover:-translate-y-3 hover:border-[#00C896]/40"
                                >
                                    <div className="relative overflow-hidden">
                                        {product.product_images?.[0]?.url ? (
                                            <img
                                                src={product.product_images[0].url}
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
                                            <h3 className="truncate pr-2 text-xl font-bold text-white">
                                                {product.name}
                                            </h3>
                                            <span className="shrink-0 rounded-full bg-[#00C896]/20 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#00C896]">
                                                {product.status === 'active' ? 'Nuevo' : product.status}
                                            </span>
                                        </div>
                                        <p className="mt-4 min-h-[40px] line-clamp-2 text-sm text-slate-300">
                                            {product.description}
                                        </p>
                                        <p className="mt-3 text-sm text-slate-400">
                                            {product.province || product.user?.address?.province || product.user?.address?.city || 'Ubicación no disponible'}
                                        </p>
                                        <div className="mt-6 flex items-center justify-between border-t border-white/5 pt-5">
                                            <div className="flex items-center gap-2">
                                                <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-tr from-[#00C896] to-cyan-400 text-[10px] font-bold text-black">
                                                    {profileUser.name?.charAt(0)}
                                                </div>
                                                <span className="text-xs font-medium text-white/70">{profileUser.name}</span>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setSelectedProduct(product);
                                                    setCurrentImgIndex(0);
                                                }}
                                                className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-white transition hover:bg-[#00C896] hover:text-black"
                                            >
                                                Ver más
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="rounded-[32px] border border-white/10 bg-slate-950/80 p-10 text-center text-slate-400">
                            Este usuario no ha publicado productos todavía.
                        </div>
                    )}
                </section>

                <section className="mt-12 rounded-[32px] bg-[#08101d]/90 p-6 shadow-2xl shadow-slate-950/40 backdrop-blur-xl md:p-8">
                    <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                            <h2 className="text-2xl font-black text-white">Comentarios sobre el perfil</h2>
                            <p className="mt-2 text-sm text-slate-400">Comentarios que otros usuarios han dejado sobre este perfil.</p>
                        </div>
                        <div className="rounded-full bg-white/5 px-4 py-2 text-sm text-slate-200">
                            {comments.length} comentario{comments.length === 1 ? '' : 's'}
                        </div>
                    </div>

                    {canComment ? (
                        <form onSubmit={submit} className="space-y-4 rounded-[32px] border border-white/10 bg-[#061018]/90 p-6">
                            <div>
                                <label htmlFor="content" className="text-sm font-semibold text-slate-200">Dejar comentario</label>
                                <textarea
                                    id="content"
                                    value={form.data.content}
                                    onChange={(event) => form.setData('content', event.target.value)}
                                    className="mt-3 min-h-[140px] w-full rounded-[24px] border border-slate-800 bg-slate-950/80 px-5 py-4 text-sm text-white outline-none focus:border-cyan-400 focus:ring-4 focus:ring-cyan-500/10"
                                    placeholder="Escribe tu opinión sobre este perfil..."
                                />
                                {form.errors.content && (
                                    <p className="mt-2 text-xs text-rose-500">{form.errors.content}</p>
                                )}
                            </div>

                            <div className="grid gap-4 sm:grid-cols-[1fr_180px]">
                                <div>
                                    <label htmlFor="rating" className="text-sm font-semibold text-slate-200">Calificación</label>
                                    <select
                                        id="rating"
                                        value={form.data.rating}
                                        onChange={(event) => form.setData('rating', event.target.value)}
                                        className="mt-3 w-full rounded-[24px] border border-slate-800 bg-slate-950/80 px-4 py-3 text-sm text-white outline-none focus:border-cyan-400 focus:ring-4 focus:ring-cyan-500/10"
                                    >
                                        <option value="">Sin calificación</option>
                                        <option value="1">1 estrella</option>
                                        <option value="2">2 estrellas</option>
                                        <option value="3">3 estrellas</option>
                                        <option value="4">4 estrellas</option>
                                        <option value="5">5 estrellas</option>
                                    </select>
                                    {form.errors.rating && (
                                        <p className="mt-2 text-xs text-rose-500">{form.errors.rating}</p>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    className="inline-flex h-full items-center justify-center rounded-full bg-cyan-400 px-6 py-4 text-sm font-bold uppercase tracking-[0.18em] text-slate-950 transition hover:bg-cyan-300"
                                >
                                    Enviar comentario
                                </button>
                            </div>
                        </form>
                    ) : auth.user ? (
                        <div className="rounded-[32px] border border-white/10 bg-[#061018]/90 p-6 text-slate-400">
                            No puedes comentar tu propio perfil.
                        </div>
                    ) : (
                        <div className="rounded-[32px] border border-white/10 bg-[#061018]/90 p-6 text-slate-400">
                            <p>Inicia sesión para dejar un comentario sobre este perfil.</p>
                            <Link
                                href={route('login')}
                                className="mt-4 inline-flex rounded-full bg-cyan-400 px-6 py-3 text-sm font-bold uppercase tracking-[0.18em] text-slate-950 transition hover:bg-cyan-300"
                            >
                                Iniciar sesión
                            </Link>
                        </div>
                    )}

                    <div className="mt-6 space-y-4">
                        {comments.length ? (
                            comments.map((comment) => (
                                <div key={comment.id} className="rounded-[32px] border border-white/10 bg-[#09131d]/90 p-6 shadow-lg shadow-slate-950/10">
                                    <div className="flex gap-4">
                                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-cyan-400/10 text-xl font-black text-cyan-300">
                                            {comment.user?.name?.charAt(0) ?? 'U'}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                                                <div>
                                                    <p className="text-sm font-semibold text-white">{comment.user?.name ?? 'Usuario'}</p>
                                                    <p className="text-xs text-slate-500">{new Date(comment.created_at).toLocaleDateString()}</p>
                                                </div>
                                                {comment.rating ? (
                                                    <span className="rounded-full bg-slate-800 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-slate-200">
                                                        {comment.rating} / 5
                                                    </span>
                                                ) : null}
                                            </div>
                                            <p className="mt-4 text-sm leading-relaxed text-slate-300">{comment.content}</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="rounded-[32px] border border-white/10 bg-[#09131d]/90 p-10 text-center text-slate-400">
                                Este perfil todavía no tiene comentarios.
                            </div>
                        )}
                    </div>
                </section>
            </main>

            {selectedProduct && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div
                        className="absolute inset-0 bg-black/90 backdrop-blur-md"
                        onClick={() => setSelectedProduct(null)}
                    ></div>
                    <div className="relative flex h-full max-h-[90vh] w-full max-w-6xl overflow-hidden rounded-[40px] border border-white/10 bg-[#0A1625] shadow-2xl flex-col lg:flex-row">
                        <div className="group relative flex w-full items-center justify-center overflow-hidden bg-black lg:w-3/5">
                            {(selectedProduct.product_images && selectedProduct.product_images.length > 0) ? (
                                <>
                                    <img
                                        src={selectedProduct.product_images?.[currentImgIndex]?.url}
                                        className="h-full w-full object-contain transition-all duration-500"
                                        alt={selectedProduct.name}
                                    />
                                    {selectedProduct.product_images?.length > 1 && (
                                        <>
                                            <button
                                                onClick={(e) => prevImg(e, selectedProduct.product_images)}
                                                className="absolute left-5 flex h-12 w-12 items-center justify-center rounded-full bg-black/50 text-white opacity-0 transition-all group-hover:opacity-100 hover:bg-[#00C896]"
                                            >
                                                ❮
                                            </button>
                                            <button
                                                onClick={(e) => nextImg(e, selectedProduct.product_images)}
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
                                <h2 className="text-4xl font-black leading-tight text-white">
                                    {selectedProduct.name}
                                </h2>
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

                                <div className="flex items-center gap-5 rounded-[30px] border border-white/5 bg-white/5 p-6">
                                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-tr from-[#00C896] to-cyan-400 text-2xl font-black text-black">
                                        {selectedProduct.user?.name.charAt(0)}
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
                                        onClick={() => handleChatRedirect(selectedProduct.id)}
                                        className="rounded-2xl bg-[#00C896] px-6 py-3 font-black text-black transition-transform hover:scale-105"
                                    >
                                        Chat
                                    </button>
                                </div>

                                <hr className="border-white/5" />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

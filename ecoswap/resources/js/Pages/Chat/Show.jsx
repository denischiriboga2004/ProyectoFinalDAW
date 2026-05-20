import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function Show({ auth, product, messages, conversations = [] }) {

    const { data, setData, post, processing, reset } = useForm({
        content: '',
    });

    const [selectedProduct, setSelectedProduct] = useState(null);
    const [currentImgIndex, setCurrentImgIndex] = useState(0);

    const submit = (e) => {
        e.preventDefault();
        if (!data.content.trim()) return;

        post(route('chat.store', product.id), {
            preserveScroll: true,
            onSuccess: () => reset(),
        });
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
            <Head title="Mensajes" />

            <div className="relative flex h-screen overflow-hidden bg-[#07111F] text-white">

                {/* BACKGROUND */}
                <div className="absolute inset-0 opacity-10">
                    <div className="h-full w-full bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:60px_60px]"></div>
                </div>

                {/* SIDEBAR */}
                <div className="relative z-10 w-[380px] border-r border-white/10 bg-white/5 backdrop-blur-xl flex flex-col">

                    {/* HEADER SIDEBAR */}
                    <div className="p-5 border-b border-white/10">

                        {/* LOGO (RESTORED + HOME LINK) */}
                        <Link href="/" className="flex items-center gap-3 group w-fit">

                            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-r from-[#00C896] to-cyan-400 text-black font-black">
                                ♻
                            </div>

                            <h1 className="text-2xl font-black group-hover:text-[#00C896] transition">
                                EcoSwap
                            </h1>

                        </Link>

                        <h2 className="mt-4 text-xl font-bold">Mensajes</h2>
                    </div>

                    {/* CONVERSATIONS */}
                    <div className="flex-1 overflow-y-auto">

                        {conversations.length === 0 ? (
                            <div className="p-6 text-white/40 text-sm">
                                No tienes conversaciones aún
                            </div>
                        ) : (
                            conversations.map((c) => (
                                <Link
                                    key={c.id}
                                    href={`/chat/${c.product.id}`}
                                    className="flex items-center gap-4 p-4 border-b border-white/5 hover:bg-white/5"
                                >
                                    <img
                                        src={c.product.product_images?.[0]?.url}
                                        className="h-12 w-12 rounded-xl object-cover"
                                    />

                                    <div>
                                        <p className="font-bold">{c.user?.name}</p>
                                        <p className="text-sm text-white/50 truncate">
                                            {c.last_message}
                                        </p>
                                    </div>
                                </Link>
                            ))
                        )}

                    </div>
                </div>

                {/* CHAT */}
                <div className="relative z-10 flex flex-1 flex-col">

                    {/* HEADER */}
                    <div className="flex items-center justify-between border-b border-white/10 bg-white/5 p-5">

                        <div className="flex items-center gap-4">
                            <img
                                src={product.product_images?.[0]?.url}
                                className="h-12 w-12 rounded-xl object-cover"
                            />

                            <div>
                                <p className="font-bold">{product.name}</p>
                                <p className="text-sm text-white/50">
                                    {product.user?.name}
                                </p>
                            </div>
                        </div>

                        <button
                            onClick={() => {
                                setSelectedProduct(product);
                                setCurrentImgIndex(0);
                            }}
                            className="text-cyan-400"
                        >
                            Ver producto
                        </button>
                    </div>

                    {/* MESSAGES */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-6">

                        {messages.length === 0 ? (
                            <div className="h-full flex items-center justify-center text-white/40">
                                Inicia la conversación
                            </div>
                        ) : (
                            (() => {
                                let lastDate = null;

                                return messages.map((msg) => {

                                    const date = new Date(msg.created_at);
                                    const msgDate = date.toDateString();
                                    const isNewDay = msgDate !== lastDate;
                                    lastDate = msgDate;

                                    const isMine = msg.sender_id === auth.user.id;

                                    return (
                                        <div key={msg.id}>

                                            {/* FECHA */}
                                            {isNewDay && (
                                                <div className="flex justify-center my-4">
                                                    <span className="text-xs text-white/40 bg-white/5 px-3 py-1 rounded-full">
                                                        {date.toLocaleDateString()}
                                                    </span>
                                                </div>
                                            )}

                                            {/* MENSAJE */}
                                            <div className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}>
                                                <div className={`max-w-[60%] px-4 py-3 rounded-2xl ${
                                                    isMine
                                                        ? 'bg-[#00C896] text-black'
                                                        : 'bg-white/10 text-white'
                                                }`}>

                                                    <p className="text-sm">
                                                        {msg.content}
                                                    </p>

                                                    {/* HORA */}
                                                    <p className="text-[10px] mt-2 opacity-60 text-right">
                                                        {date.toLocaleTimeString([], {
                                                            hour: '2-digit',
                                                            minute: '2-digit'
                                                        })}
                                                    </p>

                                                </div>
                                            </div>
                                        </div>
                                    );
                                });
                            })()
                        )}

                    </div>

                    {/* INPUT */}
                    <form
                        onSubmit={submit}
                        className="p-4 border-t border-white/10 bg-white/5 flex gap-3"
                    >
                        <input
                            value={data.content}
                            onChange={(e) => setData('content', e.target.value)}
                            placeholder="Escribe un mensaje..."
                            className="flex-1 rounded-xl bg-white/10 px-4 py-3 text-white outline-none"
                        />

                        <button
                            disabled={processing}
                            className="rounded-xl bg-[#00C896] px-6 py-3 font-bold text-black"
                        >
                            Enviar
                        </button>
                    </form>

                </div>

                {/* MODAL PRODUCTO */}
                {selectedProduct && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">

                        <div
                            className="absolute inset-0 bg-black/90"
                            onClick={() => setSelectedProduct(null)}
                        />

                        <div className="relative flex h-full max-h-[90vh] w-full max-w-6xl overflow-hidden rounded-[40px] bg-[#0A1625] border border-white/10 flex-col lg:flex-row">

                            <div className="relative flex w-full items-center justify-center bg-black lg:w-3/5">

                                <img
                                    src={selectedProduct.product_images?.[currentImgIndex]?.url}
                                    className="h-full w-full object-contain"
                                />

                                {selectedProduct.product_images?.length > 1 && (
                                    <>
                                        <button
                                            onClick={(e) => prevImg(e, selectedProduct.product_images)}
                                            className="absolute left-5 bg-black/50 p-3 rounded-full"
                                        >
                                            ❮
                                        </button>

                                        <button
                                            onClick={(e) => nextImg(e, selectedProduct.product_images)}
                                            className="absolute right-5 bg-black/50 p-3 rounded-full"
                                        >
                                            ❯
                                        </button>
                                    </>
                                )}

                            </div>

                            <div className="p-10 w-full lg:w-2/5">
                                <h2 className="text-3xl font-black">
                                    {selectedProduct.name}
                                </h2>

                                <p className="mt-4 text-white/70">
                                    {selectedProduct.description}
                                </p>

                                <p className="mt-6 text-cyan-400 font-bold text-2xl">
                                    {selectedProduct.estimated_value}€
                                </p>

                                <div className="mt-6 flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-full bg-[#00C896] flex items-center justify-center text-black font-bold">
                                        {selectedProduct.user?.name?.charAt(0)}
                                    </div>

                                    <span>
                                        {selectedProduct.user?.name}
                                    </span>
                                </div>
                            </div>

                        </div>
                    </div>
                )}

            </div>
        </>
    );
}
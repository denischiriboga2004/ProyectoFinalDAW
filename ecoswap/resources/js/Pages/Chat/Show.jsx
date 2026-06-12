import { Head, Link, useForm } from "@inertiajs/react";
import { useEffect, useRef, useState } from "react";

export default function Show({
    auth,
    product = null,
    messages = [],
    conversations = [],
}) {
    const { data, setData, post, processing, reset } = useForm({
        content: "",
    });

    const [selectedProduct, setSelectedProduct] = useState(null);
    const [currentImgIndex, setCurrentImgIndex] = useState(0);
    const [messagesState, setMessagesState] = useState(messages);
    const [conversationsState, setConversationsState] = useState(conversations);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        setMessagesState(messages);
    }, [messages]);

    useEffect(() => {
        setConversationsState(conversations);
    }, [conversations]);

    useEffect(() => {
        if (!product?.id) {
            return;
        }

        const refreshChat = async () => {
            try {
                const response = await window.axios.get(
                    route("chat.messages", product.id),
                );
                if (response.data.messages) {
                    setMessagesState(response.data.messages);
                }
                if (response.data.conversations) {
                    setConversationsState(response.data.conversations);
                }
            } catch (error) {
                console.error("Error refrescando chat:", error);
            }
        };

        const interval = window.setInterval(refreshChat, 3000);
        return () => window.clearInterval(interval);
    }, [product?.id]);

    useEffect(() => {
        setSelectedProduct(null);
        setCurrentImgIndex(0);
    }, [product?.id]);

    // bajar automaticamente al ultimo mensaje
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messagesState]);

    //Enviar el emsaje usando una ruta
    const submit = (e) => {
        e.preventDefault();
        if (!data.content.trim()) return;

        post(route("chat.store", product.id), {
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    };
    //ir a al img anterior
    const nextImg = (e, images) => {
        e.stopPropagation();
        setCurrentImgIndex((prev) =>
            prev === images.length - 1 ? 0 : prev + 1,
        );
    };
    //ir a la imagen posterior
    const prevImg = (e, images) => {
        e.stopPropagation();
        setCurrentImgIndex((prev) =>
            prev === 0 ? images.length - 1 : prev - 1,
        );
    };

    return (
        <>
            <Head title="Mensajes" />

            <div className="relative flex h-screen overflow-hidden bg-[#07111F] text-white">
                {/* BACKGROUND */}
                <div className="absolute inset-0 opacity-5">
                    <div className="h-full w-full bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:60px_60px]"></div>
                </div>

                {/* SIDEBAR (ESTILO WHATSAPP) */}
                <div className="relative z-10 w-[380px] border-r border-white/10 bg-[#0c192c] flex flex-col">
                    {/* HEADER SIDEBAR */}
                    <div className="p-4 border-b border-white/10 bg-[#0f223b]/50">
                        {/* LOGO & HOME LINK */}
                        <div className="flex items-center justify-between">
                            <Link
                                href="/"
                                className="flex items-center gap-2 group w-fit"
                            >
                                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-r from-[#00C896] to-cyan-400 text-black text-sm font-black">
                                    ♻
                                </div>
                                <h1 className="text-lg font-black group-hover:text-[#00C896] transition">
                                    EcoSwap
                                </h1>
                            </Link>
                        </div>
                        <h2 className="mt-4 text-xl font-bold tracking-tight">
                            Chats
                        </h2>
                    </div>

                    {/* LISTA DE CONVERSACIONES */}
                    <div className="flex-1 overflow-y-auto divide-y divide-white/5">
                        {conversationsState.length === 0 ? (
                            <div className="p-6 text-white/40 text-sm text-center">
                                No tienes conversaciones aún
                            </div>
                        ) : (
                            conversationsState.map((c) => {
                                // Comprobamos si este chat es el que está actualmente activo en la URL
                                const isActive = product?.id === c.product.id;

                                return (
                                    <Link
                                        key={c.id}
                                        href={route("chat.show", c.product.id)}
                                        className={`flex items-center gap-3 px-4 py-3.5 transition-all duration-200 relative before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-[#00C896] ${
                                            isActive
                                                ? "bg-white/10 before:opacity-100"
                                                : "bg-transparent hover:bg-white/5 before:opacity-0"
                                        }`}
                                    >
                                        {/* ICONO / IMAGEN DEL PRODUCTO  */}
                                        <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-full border border-white/10 bg-white/5">
                                            <img
                                                src={
                                                    c.product
                                                        .product_images?.[0]
                                                        ?.url ||
                                                    "https://images.unsplash.com/photo-1512496015851-a90fb38ba796"
                                                }
                                                className="h-full w-full object-cover"
                                                alt={c.product.name}
                                            />
                                        </div>

                                        {/* CONTENIDO DEL CHAT (Nombre, Último mensaje e Info de hora) */}
                                        <div className="min-w-0 flex-1">
                                            <div className="flex items-baseline justify-between gap-1">
                                                <p
                                                    className={`truncate text-[15px] font-semibold ${isActive ? "text-[#00C896]" : "text-white"}`}
                                                >
                                                    {c.product.name}
                                                </p>

                                                {/* Hora del último mensaje simulada/traída de tu BD */}
                                                <span className="text-[11px] text-white/40 flex-shrink-0">
                                                    {c.updated_at
                                                        ? new Date(
                                                              c.updated_at,
                                                          ).toLocaleTimeString(
                                                              [],
                                                              {
                                                                  hour: "2-digit",
                                                                  minute: "2-digit",
                                                              },
                                                          )
                                                        : ""}
                                                </span>
                                            </div>

                                            <div className="flex items-center justify-between gap-1 mt-0.5">
                                                <p className="truncate text-sm text-white/50 group-hover:text-white/70">
                                                    {c.last_message ||
                                                        "Sin mensajes aún"}
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                );
                            })
                        )}
                    </div>
                </div>

                {/* VENTANA DE CHAT */}
                <div className="relative z-10 flex flex-1 flex-col bg-[#07111F]">
                    {/* HEADER CHAT */}
                    <div className="flex items-center justify-between border-b border-white/10 bg-[#0f223b]/40 p-4 backdrop-blur-md">
                        {product ? (
                            <div className="flex items-center gap-3">
                                <img
                                    src={
                                        product.product_images?.[0]?.url ||
                                        "https://images.unsplash.com/photo-1512496015851-a90fb38ba796"
                                    }
                                    className="h-10 w-10 rounded-full object-cover border border-white/10"
                                    alt={product.name}
                                />
                                <div>
                                    <p className="font-bold text-sm leading-tight">
                                        {product.name}
                                    </p>
                                    <p className="text-xs text-white/40 mt-0.5">
                                        vendedor:{" "}
                                        <Link
                                            href={route(
                                                "users.show",
                                                product.user?.id,
                                            )}
                                            className="text-cyan-300 hover:text-cyan-200 transition"
                                        >
                                            {product.user?.name}
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-1">
                                <p className="font-bold text-sm">
                                    No hay conversaciones todavía
                                </p>
                                <p className="text-xs text-white/50">
                                    Aquí verás tus chats cuando alguien te
                                    escriba.
                                </p>
                            </div>
                        )}

                        {product && (
                            <button
                                onClick={() => {
                                    setSelectedProduct(product);
                                    setCurrentImgIndex(0);
                                }}
                                className="text-xs font-semibold bg-white/5 hover:bg-white/10 border border-white/10 text-cyan-400 px-3 py-1.5 rounded-xl transition"
                            >
                                Ver producto
                            </button>
                        )}
                    </div>

                    {/* MESSAGES */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-[#050c16]">
                        {!product ? (
                            <div className="h-full flex items-center justify-center text-white/40 text-sm">
                                {conversationsState.length === 0
                                    ? "No hay conversaciones todavía."
                                    : "Selecciona una conversación para ver los mensajes."}
                            </div>
                        ) : messagesState.length === 0 ? (
                            <div className="h-full flex items-center justify-center text-white/40 text-sm">
                                Inicia la conversación
                            </div>
                        ) : (
                            (() => {
                                let lastDate = null;

                                return messagesState.map((msg) => {
                                    const date = new Date(msg.created_at);
                                    const msgDate = date.toDateString();
                                    const isNewDay = msgDate !== lastDate;
                                    lastDate = msgDate;

                                    const isMine =
                                        msg.sender_id === auth.user.id;

                                    return (
                                        <div key={msg.id} className="space-y-2">
                                            {/* FECHA CENTRADA */}
                                            {isNewDay && (
                                                <div className="flex justify-center my-4">
                                                    <span className="text-[11px] font-medium text-white/50 bg-white/5 border border-white/5 px-3 py-1 rounded-lg shadow-sm">
                                                        {date.toLocaleDateString(
                                                            undefined,
                                                            {
                                                                weekday: "long",
                                                                day: "numeric",
                                                                month: "short",
                                                            },
                                                        )}
                                                    </span>
                                                </div>
                                            )}

                                            {/* GLOBO DE MENSAJE */}
                                            <div
                                                className={`flex ${isMine ? "justify-end" : "justify-start"}`}
                                            >
                                                <div
                                                    className={`max-w-[65%] px-3.5 py-2 rounded-2xl relative shadow-md ${
                                                        isMine
                                                            ? "bg-[#00C896] text-black rounded-tr-none"
                                                            : "bg-[#182638] text-white rounded-tl-none"
                                                    }`}
                                                >
                                                    <p className="text-[14px] leading-relaxed break-words pr-8">
                                                        {msg.content}
                                                    </p>

                                                    {/* HORA ABREVIADA */}
                                                    <span
                                                        className={`text-[10px] absolute bottom-1 right-2 opacity-60 ${
                                                            isMine
                                                                ? "text-black/70"
                                                                : "text-white/50"
                                                        }`}
                                                    >
                                                        {date.toLocaleTimeString(
                                                            [],
                                                            {
                                                                hour: "2-digit",
                                                                minute: "2-digit",
                                                            },
                                                        )}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                });
                            })()
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* INPUT */}
                    {product ? (
                        <form
                            onSubmit={submit}
                            className="p-4 border-t border-white/10 bg-[#0f223b]/30 flex gap-3 items-center"
                        >
                            <input
                                value={data.content}
                                onChange={(e) =>
                                    setData("content", e.target.value)
                                }
                                placeholder="Escribe un mensaje..."
                                className="flex-1 rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-sm text-white placeholder-white/30 outline-none focus:border-[#00C896]/50 transition"
                            />

                            <button
                                disabled={processing}
                                className="rounded-xl bg-[#00C896] hover:bg-[#00b084] px-5 py-2.5 text-sm font-bold text-black transition active:scale-95 disabled:opacity-50"
                            >
                                Enviar
                            </button>
                        </form>
                    ) : (
                        <div className="p-4 border-t border-white/10 bg-[#0f223b]/30 text-sm text-white/50">
                            No hay conversaciones todavía.
                        </div>
                    )}
                </div>

                {/* MODAL PRODUCTO */}
                {selectedProduct && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <div
                            className="absolute inset-0 bg-black/90 backdrop-blur-md"
                            onClick={() => setSelectedProduct(null)}
                        />
                        <div className="relative flex h-full max-h-[90vh] w-full max-w-6xl overflow-hidden rounded-[40px] border border-white/10 bg-[#0A1625] shadow-2xl flex-col lg:flex-row">
                            <div className="group relative flex w-full items-center justify-center overflow-hidden bg-black lg:w-3/5">
                                <img
                                    src={
                                        selectedProduct.product_images?.[
                                            currentImgIndex
                                        ]?.url ||
                                        "https://images.unsplash.com/photo-1512496015851-a90fb38ba796"
                                    }
                                    className="h-full w-full object-contain transition-all duration-500"
                                    alt={selectedProduct.name}
                                />
                                {selectedProduct.product_images?.length > 1 && (
                                    <>
                                        <button
                                            onClick={(e) =>
                                                prevImg(
                                                    e,
                                                    selectedProduct.product_images,
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
                                                    selectedProduct.product_images,
                                                )
                                            }
                                            className="absolute right-5 flex h-12 w-12 items-center justify-center rounded-full bg-black/50 text-white opacity-0 transition-all group-hover:opacity-100 hover:bg-[#00C896]"
                                        >
                                            ❯
                                        </button>
                                    </>
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
                                            {selectedProduct.province ||
                                                selectedProduct.user?.address
                                                    ?.province ||
                                                selectedProduct.user?.address
                                                    ?.city ||
                                                "Ubicación no disponible"}
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
                                            {selectedProduct.user?.name?.charAt(
                                                0,
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-xs font-bold uppercase text-white/30">
                                                Usuario
                                            </p>
                                            <Link
                                                href={route(
                                                    "users.show",
                                                    selectedProduct.user?.id,
                                                )}
                                                className="text-xl font-bold text-white transition hover:text-[#00C896]"
                                            >
                                                {selectedProduct.user?.name}
                                            </Link>
                                        </div>
                                    </div>

                                    <hr className="border-white/5" />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

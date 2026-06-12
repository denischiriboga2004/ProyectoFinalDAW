import { Head, useForm, Link } from '@inertiajs/react';
import { useState } from 'react';

export default function Edit({ product, categories, provinces = [] }) {
    const existingImages = product.product_images || product.productImages || product.images || [];

    const getImageUrl = (image) => {
        const rawUrl = typeof image === 'string'
            ? image
            : image?.url || image?.image_path || image?.path || image?.file_path || image?.image?.path || image?.image?.url || '';

        if (!rawUrl) {
            return '';
        }

        if (rawUrl.startsWith('http://') || rawUrl.startsWith('https://')) {
            return rawUrl;
        }

        if (rawUrl.startsWith('/storage/')) {
            return rawUrl;
        }

        if (rawUrl.startsWith('storage/')) {
            return `/${rawUrl}`;
        }

        if (rawUrl.startsWith('/public/')) {
            return `/storage/${rawUrl.replace(/^\/public\//, '')}`;
        }

        return `/storage/${rawUrl.replace(/^public\//, '')}`;
    };

    const [newPreviews, setNewPreviews] = useState([]);
    const [deletedImageIds, setDeletedImageIds] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);

    const { data, setData, post, errors, processing } = useForm({
        _method: 'PUT',
        name: product.name || '',
        product_type_id: product.product_type_id || '',
        province: product.province || '',
        estimated_value: product.estimated_value || '',
        swap_for: product.swap_for || '',
        description: product.description || '',
        status: product.status || 'active',
        new_images: [],
        deleted_images: [],
    });

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setData('new_images', [...data.new_images, ...files]);

        const filePreviews = files.map(file => URL.createObjectURL(file));
        setNewPreviews((prev) => [...prev, ...filePreviews]);
    };

    const removeNewImage = (indexToRemove) => {
        setData('new_images', data.new_images.filter((_, index) => index !== indexToRemove));
        setNewPreviews(newPreviews.filter((_, index) => index !== indexToRemove));
    };

    const markExistingAsDeleted = (imageId) => {
        const updatedDeletedIds = [...deletedImageIds, imageId];
        setDeletedImageIds(updatedDeletedIds);
        setData('deleted_images', updatedDeletedIds);
    };

    const unmarkExistingAsDeleted = (imageId) => {
        const updatedDeletedIds = deletedImageIds.filter(id => id !== imageId);
        setDeletedImageIds(updatedDeletedIds);
        setData('deleted_images', updatedDeletedIds);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(`/products/${product.id}`, {
            forceFormData: true,
        });
    };

    return (
        <>
            <Head title={`Editar ${product.name} - EcoSwap`} />

            <div className="min-h-screen overflow-x-hidden bg-[#07111F] text-white relative">
                
                <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                    <div className="absolute left-[-200px] top-[-200px] h-[500px] w-[500px] rounded-full bg-[#00C896] opacity-10 blur-3xl"></div>
                </div>

                <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-white/5 backdrop-blur-xl">
                    <div className="flex items-center justify-between px-10 py-5 lg:px-20">
                        <Link href="/mis-productos" className="flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-[#00C896] to-cyan-400 text-xl font-black text-black shadow-lg">
                                ♻
                            </div>
                            <h1 className="text-3xl font-black tracking-tight">EcoSwap</h1>
                        </Link>
                    </div>
                </header>

                <main className="relative max-w-2xl mx-auto px-6 pt-40 pb-20 z-10">
                    <div className="mb-10">
                        <h2 className="text-4xl font-black">Editar mi producto</h2>
                        <p className="mt-2 text-white/60">Modifica los detalles y gestiona las fotos de tu publicación.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6 rounded-[35px] border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
                        
                        {/* SECCIÓN DE GESTIÓN DE IMÁGENES */}
                        <div className="rounded-2xl border border-white/5 bg-white/5 p-5">
                            <h3 className="text-lg font-bold mb-4 text-cyan-400">Imágenes del Producto</h3>
                            
                            {/* 1. Fotos actuales en el servidor */}
                            {existingImages.length > 0 && (
                                <div className="mb-6">
                                    <p className="text-xs font-bold uppercase tracking-wider text-white/40 mb-3">Fotos actuales en la galería</p>
                                    <div className="grid grid-cols-3 gap-4">
                                        {existingImages.map((img) => {
                                            const imageId = img?.id ?? img?.image?.id;
                                            const isDeleted = imageId && deletedImageIds.includes(imageId);
                                            const cleanUrl = getImageUrl(img);

                                            return (
                                                <div key={img.id} className="relative h-24 rounded-xl overflow-hidden group border border-white/10 bg-black/40 cursor-pointer" onClick={() => setSelectedImage(getImageUrl(img))}>
                                                    <img 
                                                        src={cleanUrl} 
                                                        className={`h-full w-full object-cover transition ${isDeleted ? 'opacity-20 blur-sm grayscale' : 'group-hover:scale-110'}`} 
                                                        alt="Producto" 
                                                    />
                                                    
                                                    {isDeleted ? (
                                                        <button 
                                                            type="button"
                                                            onClick={() => unmarkExistingAsDeleted(img.id)}
                                                            className="absolute inset-0 flex items-center justify-center bg-black/50 text-xs font-bold text-[#00C896] hover:underline"
                                                        >
                                                            🔄 Recuperar
                                                        </button>
                                                    ) : (
                                                        <button 
                                                            type="button"
                                                            onClick={() => markExistingAsDeleted(img.id)}
                                                            className="absolute top-1 right-1 h-6 w-6 rounded-full bg-red-600/80 text-white font-bold text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition hover:bg-red-700"
                                                            title="Eliminar foto"
                                                        >
                                                            ✕
                                                        </button>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}

                            {/* 2. Previsualización de Fotos Nuevas */}
                            {newPreviews.length > 0 && (
                                <div className="mb-6">
                                    <p className="text-xs font-bold uppercase tracking-wider text-[#00C896] mb-3">Fotos nuevas por añadir</p>
                                    <div className="grid grid-cols-3 gap-4">
                                        {newPreviews.map((url, index) => (
                                            <div key={index} className="relative h-24 rounded-xl overflow-hidden group border border-[#00C896]/30 cursor-pointer" onClick={() => setSelectedImage(url)}>
                                                <img src={url} className="h-full w-full object-cover group-hover:scale-110 transition" alt="Nueva previsualización" />
                                                <button 
                                                    type="button"
                                                    onClick={() => removeNewImage(index)}
                                                    className="absolute top-1 right-1 h-6 w-6 rounded-full bg-black/70 text-white font-bold text-xs flex items-center justify-center hover:bg-red-600 transition"
                                                >
                                                    ✕
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* 3. Botón de subida */}
                            <div>
                                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-white/20 rounded-2xl cursor-pointer hover:border-[#00C896]/50 bg-white/5 hover:bg-white/10 transition">
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <span className="text-3xl mb-2">📸</span>
                                        <p className="text-sm text-white/60 font-semibold">Haz clic para añadir fotos</p>
                                        <p className="text-xs text-white/40 mt-1">PNG, JPG, JPEG (Máx. 5MB por imagen)</p>
                                    </div>
                                    <input 
                                        type="file" 
                                        multiple 
                                        accept="image/*" 
                                        onChange={handleFileChange} 
                                        className="hidden" 
                                    />
                                </label>
                                {errors.new_images && <p className="text-red-400 text-xs mt-1">{errors.new_images}</p>}
                            </div>
                        </div>

                        {/* DATOS GENERALES DEL FORMULARIO */}
                        <div>
                            <label className="block text-sm font-bold mb-2 text-white/70">Nombre del producto</label>
                            <input 
                                type="text" 
                                value={data.name} 
                                onChange={e => setData('name', e.target.value)}
                                className="w-full rounded-2xl border border-white/10 bg-[#07111F] px-5 py-4 text-white outline-none transition focus:border-[#00C896] focus:ring-2 focus:ring-[#00C896]/30"
                            />
                            {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                        </div>

                        <div className="grid gap-6 md:grid-cols-2">
                            <div>
                                <label className="block text-sm font-bold mb-2 text-white/70">Categoría</label>
                                <select 
                                    value={data.product_type_id} 
                                    onChange={e => setData('product_type_id', e.target.value)}
                                    className="w-full rounded-2xl border border-white/10 bg-[#07111F] px-5 py-4 text-white outline-none transition focus:border-[#00C896]"
                                >
                                    <option value="" disabled className="bg-[#07111F]">Selecciona una categoría</option>
                                    {categories.map(category => (
                                        <option key={category.id} value={category.id} className="bg-[#07111F]">
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.product_type_id && <p className="text-red-400 text-xs mt-1">{errors.product_type_id}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-bold mb-2 text-white/70">Provincia</label>
                                <select 
                                    value={data.province} 
                                    onChange={e => setData('province', e.target.value)}
                                    className="w-full rounded-2xl border border-white/10 bg-[#07111F] px-5 py-4 text-white outline-none transition focus:border-[#00C896]"
                                >
                                    <option value="" disabled className="bg-[#07111F]">Selecciona una provincia</option>
                                    {provinces.map(province => (
                                        <option key={province.id} value={province.name} className="bg-[#07111F]">
                                            {province.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.province && <p className="text-red-400 text-xs mt-1">{errors.province}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-bold mb-2 text-white/70">Valor estimado (€)</label>
                                <input 
                                    type="number" 
                                    value={data.estimated_value} 
                                    onChange={e => setData('estimated_value', e.target.value)}
                                    className="w-full rounded-2xl border border-white/10 bg-[#07111F] px-5 py-4 text-white outline-none transition focus:border-[#00C896]"
                                />
                                {errors.estimated_value && <p className="text-red-400 text-xs mt-1">{errors.estimated_value}</p>}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold mb-2 text-white/70">Estado de disponibilidad</label>
                            <select 
                                value={data.status} 
                                onChange={e => setData('status', e.target.value)}
                                className="w-full rounded-2xl border border-white/10 bg-[#07111F] px-5 py-4 text-white outline-none transition focus:border-[#00C896]"
                            >
                                <option value="active" className="bg-[#07111F]">Disponible / Activo</option>
                                <option value="pending" className="bg-[#07111F]">Intercambio en proceso</option>
                                <option value="swapped" className="bg-[#07111F]">Intercambiado / Retirado</option>
                            </select>
                            {errors.status && <p className="text-red-400 text-xs mt-1">{errors.status}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-bold mb-2 text-white/70">Lo cambio por</label>
                            <input 
                                type="text" 
                                value={data.swap_for} 
                                onChange={e => setData('swap_for', e.target.value)}
                                placeholder="Ej: Una tablet o consola de juegos"
                                className="w-full rounded-2xl border border-white/10 bg-[#07111F] px-5 py-4 text-white outline-none transition focus:border-[#00C896]"
                            />
                            {errors.swap_for && <p className="text-red-400 text-xs mt-1">{errors.swap_for}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-bold mb-2 text-white/70">Descripción</label>
                            <textarea 
                                value={data.description} 
                                onChange={e => setData('description', e.target.value)}
                                rows="4"
                                className="w-full rounded-2xl border border-white/10 bg-[#07111F] px-5 py-4 text-white outline-none transition focus:border-[#00C896] resize-none"
                            ></textarea>
                            {errors.description && <p className="text-red-400 text-xs mt-1">{errors.description}</p>}
                        </div>

                        <div className="flex gap-4 pt-4">
                            <Link 
                                href="/mis-productos" 
                                className="w-1/2 text-center rounded-2xl border border-white/10 bg-white/5 py-4 font-bold text-white/70 transition hover:bg-white/10"
                            >
                                Cancelar
                            </Link>
                            <button 
                                type="submit" 
                                disabled={processing}
                                className="w-1/2 rounded-2xl bg-gradient-to-r from-[#00C896] to-cyan-400 py-4 font-bold text-black transition hover:scale-[1.02] disabled:opacity-50"
                            >
                                {processing ? 'Guardando...' : 'Guardar Cambios'}
                            </button>
                        </div>

                    </form>
                </main>

                {/* MODAL PARA VER IMAGEN EN GRANDE */}
                {selectedImage && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm" onClick={() => setSelectedImage(null)}>
                        <div className="relative max-w-4xl max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
                            <button
                                onClick={() => setSelectedImage(null)}
                                className="absolute -top-10 right-0 text-white text-2xl font-bold hover:text-cyan-400 transition"
                            >
                                ✕ Cerrar
                            </button>
                            <img
                                src={selectedImage}
                                alt="Vista grande"
                                className="max-w-full max-h-[90vh] rounded-2xl object-contain"
                            />
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
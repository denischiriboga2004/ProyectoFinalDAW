import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function Create({ categories = [], provinces = [], auth }) {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    
    // Estado local para guardar las URLs de vista previa de las imágenes
    const [previews, setPreviews] = useState([]);
    
    const userName = auth?.user?.name || 'Usuario';

    const { data, setData, post, processing, errors } = useForm({
        name: '',
        product_type_id: '',
        province: '',
        estimated_value: '',
        swap_for: '',
        description: '',
        images: [], // Aquí guardaremos los archivos reales como un Array acumulable
    });

    // Manejador del cambio de imágenes
    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        
        // CORREGIDO: Acumula las imágenes si el usuario selecciona archivos en varias tandas
        const updatedFiles = [...data.images, ...files];
        setData('images', updatedFiles);

        // Generamos las vistas previas para el diseño de la interfaz acumulándolas
        const filePreviews = files.map(file => URL.createObjectURL(file));
        setPreviews((prev) => [...prev, ...filePreviews]);
    };

    // NUEVO: Permite quitar una foto antes de enviarla al servidor si el usuario se equivoca
    const removePreviewImage = (indexToRemove) => {
        setData('images', data.images.filter((_, index) => index !== indexToRemove));
        setPreviews(previews.filter((_, index) => index !== indexToRemove));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Inertia detecta automáticamente los archivos dentro de "data.images" e inicia multipart/form-data
        post('/products');
    };

    return (
        <>
            <Head title="Crear Producto - EcoSwap" />
            
            <div className="min-h-screen bg-[#07111F] text-white">
                
                {/* BARRA SUPERIOR (NAVBAR) */}
                <nav className="border-b border-white/10 bg-[#07111F]/80 backdrop-blur-md sticky top-0 z-50">
                    <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                        <Link href="/" className="flex items-center gap-3 group">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#00C896] to-cyan-400 flex items-center justify-center font-black text-black shadow-lg shadow-[#00C896]/20">
                                ES
                            </div>
                            <span className="text-xl font-black tracking-tight bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent group-hover:to-[#00C896] transition duration-300">
                                EcoSwap
                            </span>
                        </Link>

                        <div className="relative">
                            <button 
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition font-medium text-sm"
                            >
                                <span className="w-2 h-2 rounded-full bg-[#00C896] animate-pulse"></span>
                                {userName}
                                <svg className={`w-4 h-4 text-white/50 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            {dropdownOpen && (
                                <>
                                    <div className="fixed inset-0 z-10" onClick={() => setDropdownOpen(false)}></div>
                                    <div className="absolute right-0 mt-2 w-48 rounded-2xl bg-[#0d1f36] border border-white/10 p-2 shadow-2xl z-20">
                                        <Link href="/logout" method="post" as="button" className="w-full text-left px-4 py-3 rounded-xl text-sm font-bold text-red-400 hover:bg-red-500/10 transition">
                                            Cerrar Sesión
                                        </Link>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </nav>

                {/* CONTENIDO DEL FORMULARIO */}
                <div className="p-10">
                    <div className="max-w-2xl mx-auto bg-white/5 p-8 rounded-[40px] border border-white/10 shadow-2xl">
                        <h2 className="text-3xl font-black mb-6">Subir un producto nuevo</h2>
                        
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* INPUT: Nombre */}
                            <div>
                                <label className="block text-xs font-bold uppercase mb-2 text-white/60">Nombre del Objeto</label>
                                <input 
                                    type="text" 
                                    value={data.name} 
                                    onChange={e => setData('name', e.target.value)}
                                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white focus:outline-none focus:border-[#00C896] transition"
                                    placeholder="Ej. Bicicleta de montaña..." 
                                />
                                {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                            </div>

                            {/* SELECT: Categorías */}
                            <div>
                                <label className="block text-xs font-bold uppercase mb-2 text-white/60">Categoría</label>
                                <select 
                                    value={data.product_type_id} 
                                    onChange={e => setData('product_type_id', e.target.value)}
                                    className="w-full rounded-2xl border border-white/10 bg-[#07111F] px-5 py-4 text-white focus:outline-none focus:border-[#00C896] transition"
                                >
                                    <option value="">Selecciona una categoría</option>
                                    {categories.map((cat) => (
                                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                                    ))}
                                </select>
                                {errors.product_type_id && <p className="text-red-400 text-xs mt-1">{errors.product_type_id}</p>}
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase mb-2 text-white/60">Provincia</label>
                                <select
                                    value={data.province}
                                    onChange={e => setData('province', e.target.value)}
                                    className="w-full rounded-2xl border border-white/10 bg-[#07111F] px-5 py-4 text-white focus:outline-none focus:border-[#00C896] transition"
                                >
                                    <option value="">Selecciona una provincia</option>
                                    {provinces.map((province) => (
                                        <option key={province.id} value={province.name}>{province.name}</option>
                                    ))}
                                </select>
                                {errors.province && <p className="text-red-400 text-xs mt-1">{errors.province}</p>}
                            </div>

                            {/* INPUT: Valor Estimado */}
                            <div>
                                <label className="block text-xs font-bold uppercase mb-2 text-white/60">Valor Estimado (€)</label>
                                <input 
                                    type="number" 
                                    value={data.estimated_value} 
                                    onChange={e => setData('estimated_value', e.target.value)}
                                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white focus:outline-none focus:border-[#00C896] transition"
                                    placeholder="0"
                                />
                                {errors.estimated_value && <p className="text-red-400 text-xs mt-1">{errors.estimated_value}</p>}
                            </div>

                            {/* INPUT: Cambio por */}
                            <div>
                                <label className="block text-xs font-bold uppercase mb-2 text-white/60">¿Qué buscas a cambio?</label>
                                <input 
                                    type="text" 
                                    value={data.swap_for} 
                                    onChange={e => setData('swap_for', e.target.value)}
                                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white focus:outline-none focus:border-[#00C896] transition"
                                    placeholder="Ej. Una tablet o componentes de PC..." 
                                />
                                {errors.swap_for && <p className="text-red-400 text-xs mt-1">{errors.swap_for}</p>}
                            </div>

                            {/* TEXTAREA: Descripción */}
                            <div>
                                <label className="block text-xs font-bold uppercase mb-2 text-white/60">Descripción</label>
                                <textarea 
                                    value={data.description} 
                                    onChange={e => setData('description', e.target.value)}
                                    className="w-full h-32 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white resize-none focus:outline-none focus:border-[#00C896] transition"
                                    placeholder="Describe brevemente el estado físico del objeto..."
                                />
                                {errors.description && <p className="text-red-400 text-xs mt-1">{errors.description}</p>}
                            </div>

                            {/* APARTADO: SUBIDA DE IMÁGENES */}
                            <div>
                                <label className="block text-xs font-bold uppercase mb-2 text-white/60">Imágenes del Producto</label>
                                
                                <div className="border-2 border-dashed border-white/20 hover:border-[#00C896] rounded-2xl p-6 transition text-center cursor-pointer relative bg-white/5">
                                    <input 
                                        type="file" 
                                        multiple 
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    />
                                    <svg className="mx-auto h-12 w-12 text-white/40" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4-4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <p className="mt-2 text-sm text-white/80 font-medium">Haz click o arrastra tus imágenes aquí</p>
                                    <p className="text-xs text-white/40 mt-1">PNG, JPG, JPEG hasta 5MB</p>
                                </div>
                                {errors.images && <p className="text-red-400 text-xs mt-1">{errors.images}</p>}

                                {/* Galería de vistas previas */}
                                {previews.length > 0 && (
                                    <div className="grid grid-cols-4 gap-4 mt-4">
                                        {previews.map((src, index) => (
                                            <div key={index} className="relative aspect-square rounded-xl overflow-hidden border border-white/10 bg-white/5 group">
                                                <img src={src} alt="Preview" className="w-full h-full object-cover" />
                                                <button 
                                                    type="button"
                                                    onClick={() => removePreviewImage(index)}
                                                    className="absolute top-1 right-1 h-5 w-5 rounded-full bg-black/80 text-white font-bold text-[10px] flex items-center justify-center hover:bg-red-600 transition opacity-0 group-hover:opacity-100"
                                                >
                                                    ✕
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* BOTONES */}
                            <div className="flex justify-end gap-4 pt-4">
                                <Link href="/" className="px-6 py-4 rounded-2xl bg-white/10 font-bold hover:bg-white/20 transition">
                                    Cancelar
                                </Link>
                                <button 
                                    type="submit" 
                                    disabled={processing}
                                    className="px-6 py-4 rounded-2xl bg-gradient-to-r from-[#00C896] to-cyan-400 font-black text-black disabled:opacity-50 transition transform active:scale-95"
                                >
                                    {processing ? 'Publicando...' : 'Publicar Producto'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </>
    );
}
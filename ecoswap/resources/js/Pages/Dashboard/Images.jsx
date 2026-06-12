import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { useMemo, useState } from 'react';

export default function Images({ images }) {
    const [query, setQuery] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const filtered = useMemo(() => {
        const term = query.trim().toLowerCase();
        if (!term) return images;
        return images.filter((image) =>
            [image.product?.name, image.url]
                .filter(Boolean)
                .some((value) => value.toLowerCase().includes(term)),
        );
    }, [query, images]);

    return (
        <AuthenticatedLayout header={<h1 className="text-3xl font-black text-slate-900">Imágenes</h1>}>
            <Head title="Imágenes" />
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Gestión de imágenes</p>
                        <p className="mt-2 text-sm text-slate-600">Visualiza y filtra las imágenes subidas por producto.</p>
                    </div>
                </div>

                <div className="mb-5">
                    <input
                        type="search"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Buscar imágenes..."
                        className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 shadow-sm focus:border-slate-400 focus:outline-none"
                    />
                </div>

                <div className="overflow-hidden rounded-3xl border border-slate-200 shadow-sm">
                    <table className="min-w-full divide-y divide-slate-200 bg-white text-sm">
                        <thead className="bg-slate-100 text-left text-[11px] uppercase tracking-[0.26em] text-slate-500">
                            <tr>
                                <th className="px-4 py-3">ID</th>
                                <th className="px-4 py-3">Vista</th>
                                <th className="px-4 py-3">Producto</th>
                                <th className="px-4 py-3">Estado</th>
                                <th className="px-4 py-3">Principal</th>
                                <th className="px-4 py-3">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                            {filtered.length ? (
                                filtered.map((image) => (
                                    <tr key={image.id} className="hover:bg-slate-50">
                                        <td className="px-4 py-4 font-mono text-slate-600">#{image.id}</td>
                                        <td className="px-4 py-4">
                                            <button
                                                type="button"
                                                onClick={() => setSelectedImage(image)}
                                                className="h-20 w-32 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-0"
                                            >
                                                <img
                                                    src={image.url}
                                                    alt={image.product?.name ?? 'Imagen de producto'}
                                                    className="h-full w-full object-cover"
                                                />
                                            </button>
                                        </td>
                                        <td className="px-4 py-4 text-slate-900">{image.product?.name ?? 'Desconocido'}</td>
                                        <td className="px-4 py-4">
                                            <span className={`inline-flex rounded-full px-3 py-1 text-[11px] font-semibold ${image.status !== 'inactive' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                                                {image.status !== 'inactive' ? 'Activo' : 'Inactivo'}
                                            </span>
                                        </td>
                                        <td className="px-4 py-4">
                                            <span className={`inline-flex rounded-full px-3 py-1 text-[11px] font-semibold ${image.is_main ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>
                                                {image.is_main ? 'Sí' : 'No'}
                                            </span>
                                        </td>
                                        <td className="px-4 py-4">
                                            <Link
                                                href={route('admin.images.toggleStatus', image.id)}
                                                method="put"
                                                as="button"
                                                className="inline-flex rounded-full border border-slate-900 bg-slate-900 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-slate-800"
                                            >
                                                {image.status === 'active' ? 'Desactivar' : 'Activar'}
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="px-4 py-8 text-center text-slate-500">
                                        No se encontraron imágenes.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                {selectedImage && (
                    <div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
                        onClick={() => setSelectedImage(null)}
                    >
                        <div className="relative max-h-[90vh] max-w-[90vw]" onClick={(e) => e.stopPropagation()}>
                            <button
                                type="button"
                                onClick={() => setSelectedImage(null)}
                                className="absolute right-2 top-2 z-60 rounded-full bg-white/90 p-2 text-slate-900 shadow"
                                aria-label="Cerrar imagen"
                            >
                                ✕
                            </button>
                            <img
                                src={selectedImage.url}
                                alt={selectedImage.product?.name ?? 'Imagen ampliada'}
                                className="max-h-[90vh] w-auto max-w-[90vw] rounded-2xl object-contain"
                            />
                        </div>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}

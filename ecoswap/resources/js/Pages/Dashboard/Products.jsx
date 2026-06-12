import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useMemo, useState } from 'react';

export default function Products({ products }) {
    const [query, setQuery] = useState('');
    const filtered = useMemo(() => {
        const term = query.trim().toLowerCase();
        if (!term) return products;
        return products.filter((product) =>
            [product.name, product.user?.name, product.type?.name]
                .filter(Boolean)
                .some((value) => value.toLowerCase().includes(term)),
        );
    }, [query, products]);

    const toggleStatus = (product) => {
        router.put(route('admin.products.toggleStatus', product.id));
    };

    return (
        <AuthenticatedLayout header={<h1 className="text-3xl font-black text-slate-900">Productos</h1>}>
            <Head title="Productos" />
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Gestión de productos</p>
                        <p className="mt-2 text-sm text-slate-600">Busca por nombre, propietario o tipo.</p>
                    </div>
                </div>

                <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <input
                        type="search"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Buscar productos..."
                        className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 shadow-sm focus:border-slate-400 focus:outline-none sm:w-1/2"
                    />
                </div>

                <div className="overflow-hidden rounded-3xl border border-slate-200 shadow-sm">
                    <table className="min-w-full divide-y divide-slate-200 bg-white text-sm">
                        <thead className="bg-slate-100 text-left text-[11px] uppercase tracking-[0.26em] text-slate-500">
                            <tr>
                                <th className="px-4 py-3">ID</th>
                                <th className="px-4 py-3">Nombre</th>
                                <th className="px-4 py-3">Usuario</th>
                                <th className="px-4 py-3">Tipo</th>
                                <th className="px-4 py-3">Activo</th>
                                <th className="px-4 py-3">Valor</th>
                                <th className="px-4 py-3 text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                            {filtered.length ? (
                                filtered.map((product) => (
                                    <tr key={product.id} className="hover:bg-slate-50">
                                        <td className="px-4 py-4 font-mono text-slate-600">#{product.id}</td>
                                        <td className="px-4 py-4 font-semibold text-slate-900">{product.name}</td>
                                        <td className="px-4 py-4 text-slate-600">{product.user?.name ?? 'Desconocido'}</td>
                                        <td className="px-4 py-4 text-slate-600">{product.type?.name ?? 'Sin tipo'}</td>
                                        <td className="px-4 py-4">
                                            <span className={`inline-flex rounded-full px-3 py-1 text-[11px] font-semibold ${product.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                                                {product.status === 'active' ? 'Sí' : 'No'}
                                            </span>
                                        </td>
                                        <td className="px-4 py-4 text-slate-600">{product.estimated_value ? `${product.estimated_value} €` : '—'}</td>
                                        <td className="px-4 py-4 text-right space-x-2">
                                            <Link
                                                href={route('dashboard.products.edit', product.id)}
                                                className="inline-flex rounded-full border border-slate-200 bg-white px-3 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-700 transition hover:bg-slate-50"
                                            >
                                                Editar
                                            </Link>
                                            <button
                                                type="button"
                                                onClick={() => toggleStatus(product)}
                                                className="inline-flex rounded-full bg-slate-900 px-3 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-white transition hover:bg-slate-700"
                                            >
                                                {product.status === 'active' ? 'Desactivar' : 'Activar'}
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="px-4 py-8 text-center text-slate-500">
                                        No se encontraron productos.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

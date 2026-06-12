import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { useMemo, useState } from 'react';

export default function ProductTypes({ types }) {
    const [query, setQuery] = useState('');
    const filtered = useMemo(() => {
        const term = query.trim().toLowerCase();
        if (!term) return types;
        return types.filter((type) => type.name.toLowerCase().includes(term));
    }, [query, types]);

    return (
        <AuthenticatedLayout header={<h1 className="text-3xl font-black text-slate-900">Tipos de producto</h1>}>
            <Head title="Tipos de producto" />
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                <div className="mb-6">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Gestión de tipos</p>
                        <p className="mt-2 text-sm text-slate-600">Filtra los tipos de producto disponibles.</p>
                    </div>
                </div>

                <div className="mb-5">
                    <input
                        type="search"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Buscar tipos..."
                        className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 shadow-sm focus:border-slate-400 focus:outline-none"
                    />
                </div>

                <div className="overflow-hidden rounded-3xl border border-slate-200 shadow-sm">
                    <table className="min-w-full divide-y divide-slate-200 bg-white text-sm">
                        <thead className="bg-slate-100 text-left text-[11px] uppercase tracking-[0.26em] text-slate-500">
                            <tr>
                                <th className="px-4 py-3">ID</th>
                                <th className="px-4 py-3">Nombre</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                            {filtered.length ? (
                                filtered.map((type) => (
                                    <tr key={type.id} className="hover:bg-slate-50">
                                        <td className="px-4 py-4 font-mono text-slate-600">#{type.id}</td>
                                        <td className="px-4 py-4 font-semibold text-slate-900">{type.name}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="2" className="px-4 py-8 text-center text-slate-500">
                                        No se encontraron tipos.
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

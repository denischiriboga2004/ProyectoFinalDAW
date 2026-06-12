import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { useMemo, useState } from 'react';

export default function Roles({ roles }) {
    const [query, setQuery] = useState('');
    const filtered = useMemo(() => {
        const term = query.trim().toLowerCase();
        if (!term) return roles;
        return roles.filter((role) => role.name.toLowerCase().includes(term));
    }, [query, roles]);

    return (
        <AuthenticatedLayout header={<h1 className="text-3xl font-black text-slate-900">Roles</h1>}>
            <Head title="Roles" />
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Gestión de roles</p>
                        <p className="mt-2 text-sm text-slate-600">Agrega y revisa los roles disponibles.</p>
                    </div>
                    <Link
                        href={route('dashboard.roles.create')}
                        className="inline-flex items-center rounded-full bg-slate-900 px-5 py-3 text-sm font-bold uppercase tracking-[0.18em] text-white transition hover:bg-slate-700"
                    >
                        Nuevo rol
                    </Link>
                </div>

                <div className="mb-5">
                    <input
                        type="search"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Buscar roles..."
                        className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 shadow-sm focus:border-slate-400 focus:outline-none"
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
                                filtered.map((role) => (
                                    <tr key={role.id} className="hover:bg-slate-50">
                                        <td className="px-4 py-4 font-mono text-slate-600">#{role.id}</td>
                                        <td className="px-4 py-4 font-semibold text-slate-900">{role.name}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="2" className="px-4 py-8 text-center text-slate-500">
                                        No se encontraron roles.
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

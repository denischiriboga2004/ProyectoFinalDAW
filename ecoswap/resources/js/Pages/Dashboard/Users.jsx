import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useMemo, useState } from 'react';

export default function Users({ users, roles }) {
    const [query, setQuery] = useState('');
    const filtered = useMemo(() => {
        const term = query.trim().toLowerCase();
        if (!term) return users;
        return users.filter((user) =>
            [user.name, user.email, user.role?.name]
                .filter(Boolean)
                .some((value) => value.toLowerCase().includes(term)),
        );
    }, [query, users]);

    const toggleStatus = (user) => {
        router.put(route('admin.users.toggleStatus', user.id));
    };

    return (
        <AuthenticatedLayout header={<h1 className="text-3xl font-black text-slate-900">Usuarios</h1>}>
            <Head title="Usuarios" />
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Gestión de usuarios</p>
                        <p className="mt-2 text-sm text-slate-600">Busca usuarios por nombre, email o rol.</p>
                    </div>
                    <Link
                        href={route('dashboard.users.create')}
                        className="inline-flex items-center rounded-full bg-slate-900 px-5 py-3 text-sm font-bold uppercase tracking-[0.18em] text-white transition hover:bg-slate-700"
                    >
                        Nuevo usuario
                    </Link>
                </div>

                <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="relative w-full sm:w-1/2">
                        <input
                            type="search"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Buscar usuarios..."
                            className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 shadow-sm focus:border-slate-400 focus:outline-none"
                        />
                    </div>
                    <div className="flex flex-wrap gap-2 text-sm text-slate-600">
                        <span className="rounded-full bg-slate-100 px-3 py-2">Roles: {roles.length}</span>
                        <span className="rounded-full bg-slate-100 px-3 py-2">Registros: {users.length}</span>
                    </div>
                </div>

                <div className="overflow-hidden rounded-3xl border border-slate-200 shadow-sm">
                    <table className="min-w-full divide-y divide-slate-200 bg-white text-sm">
                        <thead className="bg-slate-100 text-left text-[11px] uppercase tracking-[0.26em] text-slate-500">
                            <tr>
                                <th className="px-4 py-3">ID</th>
                                <th className="px-4 py-3">Nombre</th>
                                <th className="px-4 py-3">Email</th>
                                <th className="px-4 py-3">Rol</th>
                                <th className="px-4 py-3">Activo</th>
                                <th className="px-4 py-3 text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                            {filtered.length ? (
                                filtered.map((user) => (
                                    <tr key={user.id} className="hover:bg-slate-50">
                                        <td className="px-4 py-4 font-mono text-slate-600">#{user.id}</td>
                                        <td className="px-4 py-4 font-semibold text-slate-900">{user.name}</td>
                                        <td className="px-4 py-4 text-slate-600">{user.email}</td>
                                        <td className="px-4 py-4 text-slate-600">{user.role?.name ?? 'Sin rol'}</td>
                                        <td className="px-4 py-4">
                                            <span className={`inline-flex rounded-full px-3 py-1 text-[11px] font-semibold ${user.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                                                {user.status === 'active' ? 'Sí' : 'No'}
                                            </span>
                                        </td>
                                        <td className="px-4 py-4 text-right space-x-2">
                                            <Link
                                                href={route('admin.users.edit', user.id)}
                                                className="inline-flex rounded-full border border-slate-200 bg-white px-3 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-700 transition hover:bg-slate-50"
                                            >
                                                Editar
                                            </Link>
                                            <button
                                                type="button"
                                                onClick={() => toggleStatus(user)}
                                                className="inline-flex rounded-full bg-slate-900 px-3 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-white transition hover:bg-slate-700"
                                            >
                                                {user.status === 'active' ? 'Desactivar' : 'Activar'}
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="px-4 py-8 text-center text-slate-500">
                                        No se encontraron usuarios.
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

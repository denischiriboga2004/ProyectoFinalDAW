import { Link, router } from '@inertiajs/react';

export default function UsersSection({ users }) {
    const toggleStatus = (user) => {
        router.put(route('admin.users.toggleStatus', user.id));
    };

    return (
        <section id="users" className="space-y-4 rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
                        Usuarios
                    </p>
                    <h2 className="text-2xl font-black text-slate-900">
                        Gestión de usuarios
                    </h2>
                </div>
                <p className="max-w-2xl text-sm text-slate-600">
                    Administra los registros de usuarios, edita sus datos y activa o desactiva cuentas rápidamente.
                </p>
            </div>

            <div className="overflow-x-auto rounded-3xl border border-slate-200 bg-slate-50">
                <table className="min-w-full divide-y divide-slate-200 text-sm">
                    <thead className="bg-slate-100 text-left text-[11px] uppercase tracking-[0.25em] text-slate-500">
                        <tr>
                            <th className="px-4 py-3">ID</th>
                            <th className="px-4 py-3">Nombre</th>
                            <th className="px-4 py-3">Email</th>
                            <th className="px-4 py-3">Rol</th>
                            <th className="px-4 py-3">Estado</th>
                            <th className="px-4 py-3 text-right">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 bg-white">
                        {users?.length > 0 ? (
                            users.map((user) => (
                                <tr key={user.id} className="hover:bg-slate-50">
                                    <td className="px-4 py-4 font-mono text-slate-600">#{user.id}</td>
                                    <td className="px-4 py-4 font-semibold text-slate-900">{user.name}</td>
                                    <td className="px-4 py-4 text-slate-600">{user.email}</td>
                                    <td className="px-4 py-4 text-slate-600">
                                        {user.role?.name ?? 'Usuario'}
                                    </td>
                                    <td className="px-4 py-4">
                                        <span className={`inline-flex rounded-full px-3 py-1 text-[11px] font-semibold ${user.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                                            {user.status === 'active' ? 'Activo' : 'Inactivo'}
                                        </span>
                                    </td>
                                    <td className="px-4 py-4 text-right space-x-2">
                                        <Link
                                            href={route('admin.users.edit', user.id)}
                                            className="inline-flex rounded-full border border-slate-200 bg-white px-3 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
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
                                    No hay usuarios registrados.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </section>
    );
}

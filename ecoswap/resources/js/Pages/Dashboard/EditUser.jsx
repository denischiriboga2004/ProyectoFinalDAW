import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function EditUser({ user, roles }) {
    const form = useForm({
        name: user.name,
        email: user.email,
        status: user.status || 'active',
        role_id: String(user.role_id ?? ''),
    });

    const submit = (event) => {
        event.preventDefault();
        form.put(route('admin.users.update', user.id));
    };

    return (
        <AuthenticatedLayout header={<h1 className="text-2xl font-black text-slate-900">Editar usuario</h1>}>
            <Head title={`Editar usuario ${user.name}`} />

            <div className="mx-auto max-w-4xl p-6">
                <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
                    <div className="mb-6 space-y-2">
                        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
                            Usuario
                        </p>
                        <h2 className="text-3xl font-black text-slate-900">{user.name}</h2>
                        <p className="text-sm text-slate-600">Actualiza nombre, email y estado del usuario.</p>
                    </div>

                    <form onSubmit={submit} className="space-y-6">
                        <div className="grid gap-6 md:grid-cols-2">
                            <label className="block">
                                <span className="text-sm font-semibold text-slate-700">Nombre</span>
                                <input
                                    type="text"
                                    value={form.data.name}
                                    onChange={(e) => form.setData('name', e.target.value)}
                                    className="mt-2 w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm focus:border-slate-400 focus:outline-none"
                                />
                            </label>

                            <label className="block">
                                <span className="text-sm font-semibold text-slate-700">Email</span>
                                <input
                                    type="email"
                                    value={form.data.email}
                                    onChange={(e) => form.setData('email', e.target.value)}
                                    className="mt-2 w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm focus:border-slate-400 focus:outline-none"
                                />
                            </label>
                        </div>

                        <label className="block">
                            <span className="text-sm font-semibold text-slate-700">Estado</span>
                            <select
                                value={form.data.status}
                                onChange={(e) => form.setData('status', e.target.value)}
                                className="mt-2 w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm focus:border-slate-400 focus:outline-none"
                            >
                                <option value="active">Activo</option>
                                <option value="inactive">Inactivo</option>
                            </select>
                        </label>

                        <label className="block">
                            <span className="text-sm font-semibold text-slate-700">Rol</span>
                            <select
                                value={form.data.role_id}
                                onChange={(e) => form.setData('role_id', e.target.value)}
                                className="mt-2 w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm focus:border-slate-400 focus:outline-none"
                            >
                                <option value="">Sin rol</option>
                                {/** roles prop injected by controller */}
                                {roles?.map((r) => (
                                    <option key={r.id} value={r.id}>{r.name}</option>
                                ))}
                            </select>
                        </label>

                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
                            <Link
                                href={route('dashboard.users')}
                                className="inline-flex rounded-3xl border border-slate-300 px-6 py-3 text-sm font-bold uppercase tracking-[0.18em] text-slate-700 transition hover:bg-slate-50"
                            >
                                Volver
                            </Link>
                            <button
                                type="submit"
                                disabled={form.processing}
                                className="inline-flex rounded-3xl bg-slate-900 px-6 py-3 text-sm font-bold uppercase tracking-[0.18em] text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                Guardar cambios
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
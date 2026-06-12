import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function CreateUser({ roles }) {
    const form = useForm({
        name: '',
        email: '',
        password: '',
        role_id: roles?.[0]?.id || '',
        status: 'active',
    });

    const submit = (event) => {
        event.preventDefault();
        form.post(route('dashboard.users.store'));
    };

    return (
        <AuthenticatedLayout header={<h1 className="text-3xl font-black text-slate-900">Nuevo usuario</h1>}>
            <Head title="Nuevo usuario" />
            <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6 lg:px-8">
                <form onSubmit={submit} className="space-y-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                    <div className="grid gap-6 md:grid-cols-2">
                        <label className="block">
                            <span className="text-sm font-semibold text-slate-700">Nombre</span>
                            <input
                                type="text"
                                value={form.data.name}
                                onChange={(e) => form.setData('name', e.target.value)}
                                className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900"
                            />
                        </label>
                        <label className="block">
                            <span className="text-sm font-semibold text-slate-700">Email</span>
                            <input
                                type="email"
                                value={form.data.email}
                                onChange={(e) => form.setData('email', e.target.value)}
                                className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900"
                            />
                        </label>
                        <label className="block">
                            <span className="text-sm font-semibold text-slate-700">Contraseña</span>
                            <input
                                type="password"
                                value={form.data.password}
                                onChange={(e) => form.setData('password', e.target.value)}
                                className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900"
                            />
                        </label>
                        <label className="block">
                            <span className="text-sm font-semibold text-slate-700">Rol</span>
                            <select
                                value={form.data.role_id}
                                onChange={(e) => form.setData('role_id', e.target.value)}
                                className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900"
                            >
                                {roles.map((role) => (
                                    <option key={role.id} value={role.id}>{role.name}</option>
                                ))}
                            </select>
                        </label>
                    </div>

                    <label className="block">
                        <span className="text-sm font-semibold text-slate-700">Estado</span>
                        <select
                            value={form.data.status}
                            onChange={(e) => form.setData('status', e.target.value)}
                            className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900"
                        >
                            <option value="active">Activo</option>
                            <option value="inactive">Inactivo</option>
                        </select>
                    </label>

                    <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                        <Link
                            href={route('dashboard.users')}
                            className="inline-flex rounded-3xl border border-slate-200 px-6 py-3 text-sm font-bold uppercase tracking-[0.18em] text-slate-700 hover:bg-slate-50"
                        >
                            Volver
                        </Link>
                        <button
                            type="submit"
                            disabled={form.processing}
                            className="inline-flex rounded-3xl bg-slate-900 px-6 py-3 text-sm font-bold uppercase tracking-[0.18em] text-white hover:bg-slate-700 disabled:opacity-50"
                        >
                            Crear usuario
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function CreateComment({ users }) {
    const form = useForm({
        user_id: users?.[0]?.id || '',
        target_user_id: users?.[0]?.id || '',
        content: '',
        status: 'active',
    });

    const submit = (event) => {
        event.preventDefault();
        form.post(route('dashboard.comments.store'));
    };

    return (
        <AuthenticatedLayout header={<h1 className="text-3xl font-black text-slate-900">Nuevo comentario</h1>}>
            <Head title="Nuevo comentario" />
            <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6 lg:px-8">
                <form onSubmit={submit} className="space-y-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                    <div className="grid gap-6 md:grid-cols-2">
                        <label className="block">
                            <span className="text-sm font-semibold text-slate-700">Usuario</span>
                            <select
                                value={form.data.user_id}
                                onChange={(e) => form.setData('user_id', e.target.value)}
                                className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900"
                            >
                                {users.map((user) => (
                                    <option key={user.id} value={user.id}>{user.name}</option>
                                ))}
                            </select>
                        </label>
                        <label className="block">
                            <span className="text-sm font-semibold text-slate-700">Perfil objetivo</span>
                            <select
                                value={form.data.target_user_id}
                                onChange={(e) => form.setData('target_user_id', e.target.value)}
                                className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900"
                            >
                                {users.map((user) => (
                                    <option key={user.id} value={user.id}>{user.name}</option>
                                ))}
                            </select>
                        </label>
                    </div>

                    <label className="block">
                        <span className="text-sm font-semibold text-slate-700">Comentario</span>
                        <textarea
                            value={form.data.content}
                            onChange={(e) => form.setData('content', e.target.value)}
                            rows="5"
                            className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900"
                        />
                    </label>

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
                            href={route('dashboard.comments')}
                            className="inline-flex rounded-3xl border border-slate-200 px-6 py-3 text-sm font-bold uppercase tracking-[0.18em] text-slate-700 hover:bg-slate-50"
                        >
                            Volver
                        </Link>
                        <button
                            type="submit"
                            disabled={form.processing}
                            className="inline-flex rounded-3xl bg-slate-900 px-6 py-3 text-sm font-bold uppercase tracking-[0.18em] text-white hover:bg-slate-700 disabled:opacity-50"
                        >
                            Crear comentario
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}

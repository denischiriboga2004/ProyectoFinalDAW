import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function CreateRole() {
    const form = useForm({
        name: '',
    });

    const submit = (event) => {
        event.preventDefault();
        form.post(route('dashboard.roles.store'));
    };

    return (
        <AuthenticatedLayout header={<h1 className="text-3xl font-black text-slate-900">Nuevo rol</h1>}>
            <Head title="Nuevo rol" />
            <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6 lg:px-8">
                <form onSubmit={submit} className="space-y-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                    <label className="block">
                        <span className="text-sm font-semibold text-slate-700">Nombre del rol</span>
                        <input
                            type="text"
                            value={form.data.name}
                            onChange={(e) => form.setData('name', e.target.value)}
                            className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900"
                        />
                    </label>

                    <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                        <Link
                            href={route('dashboard.roles')}
                            className="inline-flex rounded-3xl border border-slate-200 px-6 py-3 text-sm font-bold uppercase tracking-[0.18em] text-slate-700 hover:bg-slate-50"
                        >
                            Volver
                        </Link>
                        <button
                            type="submit"
                            disabled={form.processing}
                            className="inline-flex rounded-3xl bg-slate-900 px-6 py-3 text-sm font-bold uppercase tracking-[0.18em] text-white hover:bg-slate-700 disabled:opacity-50"
                        >
                            Crear rol
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}

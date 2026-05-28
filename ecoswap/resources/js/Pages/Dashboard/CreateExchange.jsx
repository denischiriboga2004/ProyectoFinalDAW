import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function CreateExchange({ users, products }) {
    const form = useForm({
        user_offering_id: users?.[0]?.id || '',
        user_receiving_id: users?.[1]?.id || users?.[0]?.id || '',
        product_offered_id: products?.[0]?.id || '',
        product_requested_id: products?.[1]?.id || products?.[0]?.id || '',
        status: 'pending',
    });

    const submit = (event) => {
        event.preventDefault();
        form.post(route('dashboard.exchanges.store'));
    };

    return (
        <AuthenticatedLayout header={<h1 className="text-3xl font-black text-slate-900">Nuevo trueque</h1>}>
            <Head title="Nuevo trueque" />
            <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6 lg:px-8">
                <form onSubmit={submit} className="space-y-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                    <div className="grid gap-6 md:grid-cols-2">
                        <label className="block">
                            <span className="text-sm font-semibold text-slate-700">Usuario que ofrece</span>
                            <select
                                value={form.data.user_offering_id}
                                onChange={(e) => form.setData('user_offering_id', e.target.value)}
                                className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900"
                            >
                                {users.map((user) => (
                                    <option key={user.id} value={user.id}>{user.name}</option>
                                ))}
                            </select>
                        </label>
                        <label className="block">
                            <span className="text-sm font-semibold text-slate-700">Usuario que recibe</span>
                            <select
                                value={form.data.user_receiving_id}
                                onChange={(e) => form.setData('user_receiving_id', e.target.value)}
                                className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900"
                            >
                                {users.map((user) => (
                                    <option key={user.id} value={user.id}>{user.name}</option>
                                ))}
                            </select>
                        </label>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                        <label className="block">
                            <span className="text-sm font-semibold text-slate-700">Producto ofrecido</span>
                            <select
                                value={form.data.product_offered_id}
                                onChange={(e) => form.setData('product_offered_id', e.target.value)}
                                className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900"
                            >
                                {products.map((product) => (
                                    <option key={product.id} value={product.id}>{product.name}</option>
                                ))}
                            </select>
                        </label>
                        <label className="block">
                            <span className="text-sm font-semibold text-slate-700">Producto solicitado</span>
                            <select
                                value={form.data.product_requested_id}
                                onChange={(e) => form.setData('product_requested_id', e.target.value)}
                                className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900"
                            >
                                {products.map((product) => (
                                    <option key={product.id} value={product.id}>{product.name}</option>
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
                            <option value="pending">Pendiente</option>
                            <option value="accepted">Aceptado</option>
                            <option value="rejected">Rechazado</option>
                        </select>
                    </label>

                    <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                        <Link
                            href={route('dashboard.exchanges')}
                            className="inline-flex rounded-3xl border border-slate-200 px-6 py-3 text-sm font-bold uppercase tracking-[0.18em] text-slate-700 hover:bg-slate-50"
                        >
                            Volver
                        </Link>
                        <button
                            type="submit"
                            disabled={form.processing}
                            className="inline-flex rounded-3xl bg-slate-900 px-6 py-3 text-sm font-bold uppercase tracking-[0.18em] text-white hover:bg-slate-700 disabled:opacity-50"
                        >
                            Crear trueque
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function CreateImage({ products }) {
    const form = useForm({
        product_id: products?.[0]?.id || '',
        url: '',
    });

    const submit = (event) => {
        event.preventDefault();
        form.post(route('dashboard.images.store'));
    };

    return (
        <AuthenticatedLayout header={<h1 className="text-3xl font-black text-slate-900">Nueva imagen</h1>}>
            <Head title="Nueva imagen" />
            <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6 lg:px-8">
                <form onSubmit={submit} className="space-y-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                    <label className="block">
                        <span className="text-sm font-semibold text-slate-700">Producto</span>
                        <select
                            value={form.data.product_id}
                            onChange={(e) => form.setData('product_id', e.target.value)}
                            className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900"
                        >
                            {products.map((product) => (
                                <option key={product.id} value={product.id}>{product.name}</option>
                            ))}
                        </select>
                    </label>

                    <label className="block">
                        <span className="text-sm font-semibold text-slate-700">URL de la imagen</span>
                        <input
                            type="text"
                            value={form.data.url}
                            onChange={(e) => form.setData('url', e.target.value)}
                            className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900"
                        />
                    </label>

                    <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                        <Link
                            href={route('dashboard.images')}
                            className="inline-flex rounded-3xl border border-slate-200 px-6 py-3 text-sm font-bold uppercase tracking-[0.18em] text-slate-700 hover:bg-slate-50"
                        >
                            Volver
                        </Link>
                        <button
                            type="submit"
                            disabled={form.processing}
                            className="inline-flex rounded-3xl bg-slate-900 px-6 py-3 text-sm font-bold uppercase tracking-[0.18em] text-white hover:bg-slate-700 disabled:opacity-50"
                        >
                            Crear imagen
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}

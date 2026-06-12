import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function EditComment({ comment }) {
    const form = useForm({
        content: comment.content,
        rating: comment.rating ?? '',
        status: comment.status || 'active',
    });

    const submit = (event) => {
        event.preventDefault();
        form.put(route('admin.comments.update', comment.id));
    };

    return (
        <AuthenticatedLayout header={<h1 className="text-2xl font-black text-slate-900">Editar comentario</h1>}>
            <Head title={`Editar comentario #${comment.id}`} />

            <div className="mx-auto max-w-4xl p-6">
                <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
                    <div className="mb-6 space-y-2">
                        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
                            Comentario
                        </p>
                        <h2 className="text-3xl font-black text-slate-900">#{comment.id}</h2>
                        <p className="text-sm text-slate-600">Editor rápido para el contenido y el estado del comentario.</p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                        <div className="rounded-3xl border border-slate-100 bg-slate-50 px-5 py-4">
                            <p className="text-sm font-semibold text-slate-700">Usuario</p>
                            <p className="mt-2 text-slate-800">{comment.user?.name ?? 'Desconocido'}</p>
                        </div>
                        <div className="rounded-3xl border border-slate-100 bg-slate-50 px-5 py-4">
                            <p className="text-sm font-semibold text-slate-700">Producto</p>
                            <p className="mt-2 text-slate-800">{comment.product?.name ?? 'Sin producto'}</p>
                        </div>
                    </div>

                    <form onSubmit={submit} className="mt-6 space-y-6">
                        <label className="block">
                            <span className="text-sm font-semibold text-slate-700">Contenido</span>
                            <textarea
                                value={form.data.content}
                                onChange={(e) => form.setData('content', e.target.value)}
                                rows={5}
                                className="mt-2 w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm focus:border-slate-400 focus:outline-none"
                            />
                        </label>

                        <div className="grid gap-6 md:grid-cols-2">
                            <label className="block">
                                <span className="text-sm font-semibold text-slate-700">Valoración</span>
                                <input
                                    type="number"
                                    min="1"
                                    max="5"
                                    value={form.data.rating}
                                    onChange={(e) => form.setData('rating', e.target.value)}
                                    className="mt-2 w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm focus:border-slate-400 focus:outline-none"
                                />
                            </label>

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
                        </div>

                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
                            <Link
                                href={route('dashboard')}
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

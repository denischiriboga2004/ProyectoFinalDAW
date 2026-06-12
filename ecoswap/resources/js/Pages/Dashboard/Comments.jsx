import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useMemo, useState } from 'react';

export default function Comments({ comments }) {
    const [query, setQuery] = useState('');
    const filtered = useMemo(() => {
        const term = query.trim().toLowerCase();
        if (!term) return comments;
        return comments.filter((comment) =>
            [comment.content, comment.user?.name, comment.product?.name, comment.target_user?.name]
                .filter(Boolean)
                .some((value) => value.toLowerCase().includes(term)),
        );
    }, [query, comments]);

    const toggleStatus = (comment) => {
        router.put(route('admin.comments.toggleStatus', comment.id));
    };

    return (
        <AuthenticatedLayout header={<h1 className="text-3xl font-black text-slate-900">Comentarios</h1>}>
            <Head title="Comentarios" />
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Gestión de comentarios</p>
                        <p className="mt-2 text-sm text-slate-600">Filtra por texto, usuario o producto.</p>
                    </div>
                </div>

                <div className="mb-5">
                    <input
                        type="search"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Buscar comentarios..."
                        className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 shadow-sm focus:border-slate-400 focus:outline-none"
                    />
                </div>

                <div className="overflow-hidden rounded-3xl border border-slate-200 shadow-sm">
                    <table className="min-w-full divide-y divide-slate-200 bg-white text-sm">
                        <thead className="bg-slate-100 text-left text-[11px] uppercase tracking-[0.26em] text-slate-500">
                            <tr>
                                <th className="px-4 py-3">ID</th>
                                <th className="px-4 py-3">Comentario</th>
                                <th className="px-4 py-3">Usuario</th>
                                <th className="px-4 py-3">Producto</th>
                                <th className="px-4 py-3">Valoración</th>
                                <th className="px-4 py-3">Activo</th>
                                <th className="px-4 py-3 text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                            {filtered.length ? (
                                filtered.map((comment) => (
                                    <tr key={comment.id} className="hover:bg-slate-50">
                                        <td className="px-4 py-4 font-mono text-slate-600">#{comment.id}</td>
                                        <td className="px-4 py-4 text-slate-900">{comment.content?.slice(0, 80)}{comment.content?.length > 80 ? '...' : ''}</td>
                                        <td className="px-4 py-4 text-slate-600">{comment.user?.name ?? 'Desconocido'}</td>
                                        <td className="px-4 py-4 text-slate-600">{comment.target_user?.name ?? comment.product?.name ?? 'Sin objetivo'}</td>
                                        <td className="px-4 py-4 text-slate-600">{comment.rating ?? '—'}</td>
                                        <td className="px-4 py-4">
                                            <span className={`inline-flex rounded-full px-3 py-1 text-[11px] font-semibold ${comment.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                                                {comment.status === 'active' ? 'Sí' : 'No'}
                                            </span>
                                        </td>
                                        <td className="px-4 py-4 text-right space-x-2">
                                            <Link
                                                href={route('admin.comments.edit', comment.id)}
                                                className="inline-flex rounded-full border border-slate-200 bg-white px-3 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-700 transition hover:bg-slate-50"
                                            >
                                                Editar
                                            </Link>
                                            <button
                                                type="button"
                                                onClick={() => toggleStatus(comment)}
                                                className="inline-flex rounded-full bg-slate-900 px-3 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-white transition hover:bg-slate-700"
                                            >
                                                {comment.status === 'active' ? 'Desactivar' : 'Activar'}
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="px-4 py-8 text-center text-slate-500">
                                        No se encontraron comentarios.
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

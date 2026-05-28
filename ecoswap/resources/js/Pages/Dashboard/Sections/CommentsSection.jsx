import { Link, router } from '@inertiajs/react';

export default function CommentsSection({ comments }) {
    const toggleStatus = (comment) => {
        router.put(route('admin.comments.toggleStatus', comment.id));
    };

    return (
        <section id="comments" className="space-y-4 rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
                        Comentarios
                    </p>
                    <h2 className="text-2xl font-black text-slate-900">
                        Gestión de comentarios
                    </h2>
                </div>
                <p className="max-w-2xl text-sm text-slate-600">
                    Revisa las valoraciones, edita el contenido y controla qué comentarios están activos en el sitio.
                </p>
            </div>

            <div className="overflow-x-auto rounded-3xl border border-slate-200 bg-slate-50">
                <table className="min-w-full divide-y divide-slate-200 text-sm">
                    <thead className="bg-slate-100 text-left text-[11px] uppercase tracking-[0.25em] text-slate-500">
                        <tr>
                            <th className="px-4 py-3">ID</th>
                            <th className="px-4 py-3">Comentario</th>
                            <th className="px-4 py-3">Usuario</th>
                            <th className="px-4 py-3">Producto</th>
                            <th className="px-4 py-3">Valoración</th>
                            <th className="px-4 py-3">Estado</th>
                            <th className="px-4 py-3 text-right">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 bg-white">
                        {comments?.length > 0 ? (
                            comments.map((comment) => (
                                <tr key={comment.id} className="hover:bg-slate-50">
                                    <td className="px-4 py-4 font-mono text-slate-600">#{comment.id}</td>
                                    <td className="px-4 py-4 text-slate-900">
                                        {comment.content?.length > 80
                                            ? `${comment.content.slice(0, 80)}...`
                                            : comment.content}
                                    </td>
                                    <td className="px-4 py-4 text-slate-600">{comment.user?.name ?? 'Desconocido'}</td>
                                    <td className="px-4 py-4 text-slate-600">{comment.product?.name ?? 'Sin producto'}</td>
                                    <td className="px-4 py-4 text-slate-600">{comment.rating ?? '—'}</td>
                                    <td className="px-4 py-4">
                                        <span className={`inline-flex rounded-full px-3 py-1 text-[11px] font-semibold ${comment.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                                            {comment.status === 'active' ? 'Activo' : 'Inactivo'}
                                        </span>
                                    </td>
                                    <td className="px-4 py-4 text-right space-x-2">
                                        <Link
                                            href={route('admin.comments.edit', comment.id)}
                                            className="inline-flex rounded-full border border-slate-200 bg-white px-3 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
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
                                    No hay comentarios ahora mismo.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </section>
    );
}

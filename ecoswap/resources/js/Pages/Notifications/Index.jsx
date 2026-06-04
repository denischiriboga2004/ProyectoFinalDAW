import { Head, Link } from '@inertiajs/react';

export default function Index({ notifications = [] }) {
    return (
        <>
            <Head title="Notificaciones" />

            <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Notificaciones</h1>
                        <p className="mt-1 text-sm text-gray-600">Aquí verás tus avisos de mensajes nuevos.</p>
                    </div>
                </div>

                <div className="space-y-4">
                    {notifications.length === 0 ? (
                        <div className="rounded-2xl border border-dashed border-gray-300 bg-white/80 p-8 text-center text-gray-500">
                            No tienes notificaciones aún.
                        </div>
                    ) : (
                        notifications.map((notification) => (
                            <div key={notification.id} className="overflow-hidden rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
                                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                    <div>
                                        <p className="text-sm font-semibold text-gray-900">{notification.message}</p>
                                        <p className="mt-2 text-sm text-gray-500">{notification.created_at}</p>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        {!notification.read && (
                                            <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-semibold text-emerald-700">
                                                Nuevo
                                            </span>
                                        )}
                                        <Link
                                            href={route('notifications.read', notification.id)}
                                            method="put"
                                            as="button"
                                            className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
                                        >
                                            Marcar como leído
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </>
    );
}

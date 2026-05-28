import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useMemo, useState } from 'react';

export default function Exchanges({ exchanges }) {
    const [query, setQuery] = useState('');
    const filtered = useMemo(() => {
        const term = query.trim().toLowerCase();
        if (!term) return exchanges;
        return exchanges.filter((exchange) =>
            [
                exchange.userOffering?.name,
                exchange.userReceiving?.name,
                exchange.productOffered?.name,
                exchange.productRequested?.name,
                exchange.status,
            ]
                .filter(Boolean)
                .some((value) => value.toLowerCase().includes(term)),
        );
    }, [query, exchanges]);

    return (
        <AuthenticatedLayout header={<h1 className="text-3xl font-black text-slate-900">Trueques</h1>}>
            <Head title="Trueques" />
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Gestión de trueques</p>
                        <p className="mt-2 text-sm text-slate-600">Controla ofertas cruzadas entre usuarios y productos.</p>
                    </div>
                </div>

                <div className="mb-5">
                    <input
                        type="search"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Buscar trueques..."
                        className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 shadow-sm focus:border-slate-400 focus:outline-none"
                    />
                </div>

                <div className="overflow-hidden rounded-3xl border border-slate-200 shadow-sm">
                    <table className="min-w-full divide-y divide-slate-200 bg-white text-sm">
                        <thead className="bg-slate-100 text-left text-[11px] uppercase tracking-[0.26em] text-slate-500">
                            <tr>
                                <th className="px-4 py-3">ID</th>
                                <th className="px-4 py-3">Quien ofrece</th>
                                <th className="px-4 py-3">Producto ofrecido</th>
                                <th className="px-4 py-3">Quien recibe</th>
                                <th className="px-4 py-3">Producto solicitado</th>
                                <th className="px-4 py-3">Estado</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                            {filtered.length ? (
                                filtered.map((exchange) => (
                                    <tr key={exchange.id} className="hover:bg-slate-50">
                                        <td className="px-4 py-4 font-mono text-slate-600">#{exchange.id}</td>
                                        <td className="px-4 py-4 text-slate-900">{exchange.userOffering?.name ?? 'Desconocido'}</td>
                                        <td className="px-4 py-4 text-slate-600">{exchange.productOffered?.name ?? 'Sin producto'}</td>
                                        <td className="px-4 py-4 text-slate-900">{exchange.userReceiving?.name ?? 'Desconocido'}</td>
                                        <td className="px-4 py-4 text-slate-600">{exchange.productRequested?.name ?? 'Sin producto'}</td>
                                        <td className="px-4 py-4 text-slate-600">{exchange.status}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="px-4 py-8 text-center text-slate-500">
                                        No se encontraron trueques.
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

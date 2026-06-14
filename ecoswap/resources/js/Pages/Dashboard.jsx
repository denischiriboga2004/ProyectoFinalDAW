import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard({ usersCount, productsCount, commentsCount, rolesCount, imagesCount, exchangesCount, typesCount }) {
    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                <div className="grid gap-6 md:grid-cols-3">
                    <Link
                        href={route('dashboard.users')}
                        className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
                    >
                        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Usuarios</p>
                        <p className="mt-4 text-4xl font-black text-slate-900">{usersCount}</p>
                        <p className="mt-2 text-sm text-slate-600">Cuentas registradas en la plataforma.</p>
                    </Link>
              
                  <Link
                        href={route('dashboard.roles')}
                        className="rounded-[32px] border border-slate-200 bg-white p-6 text-left shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
                    >
                        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Roles</p>
                        <p className="mt-4 text-3xl font-black text-slate-900">{rolesCount}</p>
                        <p className="mt-3 text-sm text-slate-600">Crear y controlar roles de usuario.</p>
                    </Link>
                    <Link
                        href={route('dashboard.productTypes')}
                        className="rounded-[32px] border border-slate-200 bg-white p-6 text-left shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
                    >
                        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Tipos</p>
                        <p className="mt-4 text-3xl font-black text-slate-900">{typesCount}</p>
                        <p className="mt-3 text-sm text-slate-600">Gestionar tipos de producto.</p>
                    </Link>
                </div>

                <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    <Link
                        href={route('dashboard.users')}
                        className="rounded-[32px] border border-slate-200 bg-white p-6 text-left shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
                    >
                        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Usuarios</p>
                        <p className="mt-4 text-3xl font-black text-slate-900">{usersCount}</p>
                        <p className="mt-3 text-sm text-slate-600">Gestionar usuarios y editar su estado.</p>
                    </Link>
                    <Link
                        href={route('dashboard.products')}
                        className="rounded-[32px] border border-slate-200 bg-white p-6 text-left shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
                    >
                        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Productos</p>
                        <p className="mt-4 text-3xl font-black text-slate-900">{productsCount}</p>
                        <p className="mt-3 text-sm text-slate-600">Ver y editar productos.</p>
                    </Link>
                    <Link
                        href={route('dashboard.comments')}
                        className="rounded-[32px] border border-slate-200 bg-white p-6 text-left shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
                    >
                        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Comentarios</p>
                        <p className="mt-4 text-3xl font-black text-slate-900">{commentsCount}</p>
                        <p className="mt-3 text-sm text-slate-600">Revisar y moderar contenido de usuarios.</p>
                    </Link>
                    <Link
                        href={route('dashboard.images')}
                        className="rounded-[32px] border border-slate-200 bg-white p-6 text-left shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
                    >
                        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Imágenes</p>
                        <p className="mt-4 text-3xl font-black text-slate-900">{imagesCount}</p>
                        <p className="mt-3 text-sm text-slate-600">Administrar imágenes de productos.</p>
                    </Link>
                  
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

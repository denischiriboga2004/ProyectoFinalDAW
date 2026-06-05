import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    // Indicador de notificaciones deshabilitado
    // const unreadCount = user?.unread_notifications_count ?? 0;

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <div className="min-h-screen bg-[#07111F] text-white">
            <nav className="border-b border-white/10 bg-[#09141F]/95 backdrop-blur-xl">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Link href="/">
                  <div className="flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-[#00C896] to-cyan-400 text-xl font-black text-black shadow-lg">
                                ♻
                            </div>
                            <h1 className="text-3xl font-black tracking-tight">
                                EcoSwap
                            </h1>
                        </div>                            </Link>

                            <div className="hidden space-x-6 sm:flex sm:items-center text-sm font-medium text-white/80">
                                {user.role_id === 1 && (
                                    <>
                                        <NavLink
                                            href={route('dashboard')}
                                            active={route().current('dashboard')}
                                        >
                                            Dashboard
                                        </NavLink>
                                        <NavLink
                                            href={route('dashboard.users')}
                                            active={route().current('dashboard.users')}
                                        >
                                            Usuarios
                                        </NavLink>
                                        <NavLink
                                            href={route('dashboard.products')}
                                            active={route().current('dashboard.products')}
                                        >
                                            Productos
                                        </NavLink>
                                        <NavLink
                                            href={route('dashboard.comments')}
                                            active={route().current('dashboard.comments')}
                                        >
                                            Comentarios
                                        </NavLink>
                                        <NavLink
                                            href={route('dashboard.images')}
                                            active={route().current('dashboard.images')}
                                        >
                                            Imágenes
                                        </NavLink>
                                        <NavLink
                                            href={route('dashboard.roles')}
                                            active={route().current('dashboard.roles')}
                                        >
                                            Roles
                                        </NavLink>
                                        <NavLink
                                            href={route('dashboard.productTypes')}
                                            active={route().current('dashboard.productTypes')}
                                        >
                                            Tipos
                                        </NavLink>
                                    </>
                                )}
                            </div>
                        </div>

                        <div className="hidden sm:flex sm:items-center sm:gap-3">
                            <a
                                href="/contact"
                                className="text-sm font-medium text-white/80 hover:text-white transition"
                            >
                                Ayuda
                            </a>

                            <div className="relative">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <button
                                            type="button"
                                            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-[#0F1C2B] text-white transition hover:border-white/20 focus:outline-none"
                                        >
                                            {user.profile_photo_path ? (
                                                <img
                                                    src={`/storage/${user.profile_photo_path}`}
                                                    alt={user.name}
                                                    className="h-10 w-10 rounded-full object-cover"
                                                />
                                            ) : (
                                                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#00C896] text-sm font-bold text-black">
                                                    {user.name?.charAt(0).toUpperCase()}
                                                </span>
                                            )}
                                        </button>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content className="bg-[#0B1724] text-white" contentClasses="bg-[#0B1724] text-white">
                                        <Dropdown.Link
                                            href={route('profile.edit')}
                                        >
                                            Perfil
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route('logout')}
                                            method="post"
                                            as="button"
                                        >
                                            Cerrar sesión
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        <div className="-me-2 flex items-center sm:hidden">
                            <button
                                onClick={() =>
                                    setShowingNavigationDropdown(
                                        (previousState) => !previousState,
                                    )
                                }
                                className="inline-flex items-center justify-center rounded-md p-2 text-white/70 transition duration-150 ease-in-out hover:bg-white/10 hover:text-white focus:outline-none"
                            >
                                <svg
                                    className="h-6 w-6"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        className={
                                            !showingNavigationDropdown
                                                ? 'inline-flex'
                                                : 'hidden'
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={
                                            showingNavigationDropdown
                                                ? 'inline-flex'
                                                : 'hidden'
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div
                    className={
                        (showingNavigationDropdown ? 'block' : 'hidden') +
                        ' sm:hidden'
                    }
                >
                    <div className="space-y-1 pb-3 pt-2">
                        {user.role_id === 1 && (
                            <>
                                <ResponsiveNavLink
                                    href={route('dashboard')}
                                    active={route().current('dashboard')}
                                >
                                    Dashboard
                                </ResponsiveNavLink>
                                <ResponsiveNavLink
                                    href={route('dashboard.users')}
                                    active={route().current('dashboard.users')}
                                >
                                    Usuarios
                                </ResponsiveNavLink>
                                <ResponsiveNavLink
                                    href={route('dashboard.products')}
                                    active={route().current('dashboard.products')}
                                >
                                    Productos
                                </ResponsiveNavLink>
                                <ResponsiveNavLink
                                    href={route('dashboard.comments')}
                                    active={route().current('dashboard.comments')}
                                >
                                    Comentarios
                                </ResponsiveNavLink>
                                <ResponsiveNavLink
                                    href={route('dashboard.images')}
                                    active={route().current('dashboard.images')}
                                >
                                    Imágenes
                                </ResponsiveNavLink>
                                <ResponsiveNavLink
                                    href={route('dashboard.roles')}
                                    active={route().current('dashboard.roles')}
                                >
                                    Roles
                                </ResponsiveNavLink>
                                <ResponsiveNavLink
                                    href={route('dashboard.productTypes')}
                                    active={route().current('dashboard.productTypes')}
                                >
                                    Tipos
                                </ResponsiveNavLink>
                            </>
                        )}
                    </div>

                    <div className="border-t border-white/10 pb-1 pt-4">
                        <div className="px-4">
                            <div className="text-base font-medium text-white">
                                {user.name}
                            </div>
                            <div className="text-sm font-medium text-white/70">
                                {user.email}
                            </div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href={route('profile.edit')}>
                                Perfil
                            </ResponsiveNavLink>
                            <ResponsiveNavLink
                                method="post"
                                href={route('logout')}
                                as="button"
                            >
                                Cerrar sesión
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="bg-[#081220] shadow-[0_10px_30px_rgba(0,0,0,0.12)]">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            <main>{children}</main>
        </div>
    );
}

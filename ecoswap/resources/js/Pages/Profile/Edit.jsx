import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit({ mustVerifyEmail, status }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-white">
                    Perfil
                </h2>
            }
        >
            <Head title="Perfil" />

            <div className="bg-[#07111F] py-12 min-h-screen">
                <div className="mx-auto max-w-7xl space-y-10 sm:px-6 lg:px-8">
                    <div className="rounded-[32px] border border-white/10 bg-[#0B1724]/90 p-8 shadow-2xl">
                        <h1 className="text-4xl font-black tracking-tight text-white">
                            Mi perfil
                        </h1>
                        <p className="mt-3 max-w-2xl text-base text-white/70">
                            Actualiza tu información, cambia tu contraseña y administra tu cuenta.
                        </p>
                    </div>

                    <div className="overflow-hidden rounded-[32px] border border-white/10 bg-[#0B1724]/90 shadow-2xl">
                        <div className="px-6 py-8 sm:px-10">
                            <UpdateProfileInformationForm
                                mustVerifyEmail={mustVerifyEmail}
                                status={status}
                                className="max-w-xl"
                            />
                        </div>
                    </div>

                    <div className="overflow-hidden rounded-[32px] border border-white/10 bg-[#0B1724]/90 shadow-2xl">
                        <div className="px-6 py-8 sm:px-10">
                            <UpdatePasswordForm className="max-w-xl" />
                        </div>
                    </div>

                    <div className="overflow-hidden rounded-[32px] border border-white/10 bg-[#0B1724]/90 shadow-2xl">
                        <div className="px-6 py-8 sm:px-10">
                            <DeleteUserForm className="max-w-xl" />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

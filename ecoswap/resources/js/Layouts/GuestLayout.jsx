import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-[#07111F] px-4 py-10 text-white">
            <div className="flex items-center gap-3">
                <Link href="/">
                    <ApplicationLogo className="h-20 w-20 fill-current text-[#00C896]" />
                </Link>
                <span className="text-3xl font-black tracking-tight text-white">EcoSwap</span>
            </div>

            <div className="mt-8 w-full max-w-md overflow-hidden rounded-[28px] border border-white/10 bg-[#0B1724]/90 px-6 py-8 shadow-2xl">
                {children}
            </div>
        </div>
    );
}

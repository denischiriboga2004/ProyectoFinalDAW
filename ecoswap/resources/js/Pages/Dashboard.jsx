import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';

export default function Dashboard({ auth, products, users }) {
    const [activeTab, setActiveTab] = useState('overview');
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    // Clases dinámicas basadas en el estado
    const theme = {
        bg: isDarkMode ? 'bg-[#07111F]' : 'bg-[#F4F7FA]',
        card: isDarkMode ? 'bg-[#0D1B2D]' : 'bg-white',
        text: isDarkMode ? 'text-white' : 'text-gray-900',
        textMuted: isDarkMode ? 'text-white/30' : 'text-gray-400',
        border: isDarkMode ? 'border-white/5' : 'border-gray-200',
        tableBorder: isDarkMode ? 'border-white/10' : 'border-gray-100',
    };

    const tableHeaderClass = `p-4 text-left text-[10px] font-black uppercase tracking-[0.2em] ${theme.textMuted} border-b ${theme.tableBorder}`;
    const tableCellClass = `p-4 text-sm ${isDarkMode ? 'text-white/70' : 'text-gray-600'} border-b ${isDarkMode ? 'border-white/5' : 'border-gray-50'}`;

    return (
        <AuthenticatedLayout>
            <Head title="Admin Panel | EcoSwap" />

            {/* Contenedor Raíz con clase dinámica para afectar a hijos */}
            <div className={`min-h-screen transition-colors duration-300 ${theme.bg} ${theme.text} ${isDarkMode ? 'dark' : ''}`}>
                
                {/* HEADER SUPERIOR */}
                <div className={`border-b ${theme.border} ${theme.card} px-6 py-4 relative z-[60]`}>
                    <div className="mx-auto flex max-w-[1850px] items-center justify-between">
                        
                        {/* Izquierda: Logo */}
                        <Link href="/" className="flex items-center gap-3 group">
                            <div className="bg-[#00C896] text-black font-black px-3 py-1 rounded-lg text-sm group-hover:scale-110 transition-transform">ES</div>
                            <h1 className="text-lg font-black tracking-tighter uppercase hidden sm:block">
                                EcoSwap <span className="text-[#00C896]">System</span>
                            </h1>
                        </Link>

                        {/* Derecha: Toggle y Perfil Desplegable */}
                        <div className="flex items-center gap-5">
                            
                            {/* Sol / Luna Toggle */}
                            <button 
                                onClick={() => setIsDarkMode(!isDarkMode)}
                                className={`flex items-center justify-center w-10 h-10 rounded-xl border transition-all ${isDarkMode ? 'bg-white/5 border-white/10 text-yellow-400' : 'bg-gray-100 border-gray-200 text-blue-600'}`}
                            >
                                {isDarkMode ? '☀️' : '🌙'}
                            </button>

                            {/* Usuario Desplegable */}
                            <div className="relative">
                                <button 
                                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                                    className="flex items-center gap-3 hover:opacity-80 transition-opacity"
                                >
                                    <div className="text-right hidden sm:block">
                                        <p className={`text-[9px] font-black uppercase tracking-widest ${theme.textMuted}`}>Administrador</p>
                                        <p className="text-sm font-bold text-[#00C896]">{auth.user.name}</p>
                                    </div>
                                    <div className={`h-10 w-10 rounded-xl border ${theme.border} flex items-center justify-center font-black text-[#00C896] ${isDarkMode ? 'bg-white/5' : 'bg-gray-100'}`}>
                                        {auth.user.name.charAt(0)}
                                    </div>
                                </button>

                                {/* Menú Dropdown */}
                                {isProfileOpen && (
                                    <div className={`absolute right-0 mt-3 w-48 rounded-2xl border ${theme.border} ${theme.card} shadow-2xl p-2 animate-in`}>
                                        <Link 
                                            href={route('profile.edit')}
                                            className={`block px-4 py-3 text-[11px] font-black uppercase tracking-widest rounded-xl hover:bg-[#00C896] hover:text-black transition-colors ${isDarkMode ? 'text-white' : 'text-gray-700'}`}
                                        >
                                            Mi Perfil
                                        </Link>
                                        <Link 
                                            href={route('logout')} 
                                            method="post" 
                                            as="button"
                                            className="w-full text-left px-4 py-3 text-[11px] font-black uppercase tracking-widest rounded-xl text-red-500 hover:bg-red-500/10 transition-colors"
                                        >
                                            Cerrar Sesión
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* BARRA DE TABS */}
                <div className={`sticky top-0 z-40 border-b ${theme.border} ${isDarkMode ? 'bg-[#07111F]/90' : 'bg-[#F4F7FA]/90'} backdrop-blur-xl`}>
                    <div className="mx-auto max-w-[1850px] px-6">
                        <nav className="flex gap-10 overflow-x-auto no-scrollbar">
                            {['overview', 'products', 'users'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`py-6 text-[10px] font-black tracking-[0.2em] border-b-2 transition-all ${
                                        activeTab === tab ? 'border-[#00C896] text-[#00C896]' : `border-transparent ${theme.textMuted}`
                                    }`}
                                >
                                    {tab.toUpperCase()}
                                </button>
                            ))}
                        </nav>
                    </div>
                </div>

                {/* CONTENIDO PRINCIPAL */}
                <main className="mx-auto max-w-[1850px] p-6">
                    {activeTab === 'overview' && (
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 animate-in">
                            {[
                                { l: 'PRODUCTOS', v: products?.length || 0, c: 'text-[#00C896]' },
                                { l: 'USUARIOS', v: users?.length || 0, c: 'text-cyan-500' },
                                { l: 'TRUEQUES', v: '1.2k', c: 'text-purple-500' },
                                { l: 'ALERTA', v: '0', c: 'text-red-500' }
                            ].map((s, i) => (
                                <div key={i} className={`p-8 rounded-[32px] border ${theme.border} ${theme.card}`}>
                                    <p className={`text-[10px] font-black tracking-widest ${theme.textMuted}`}>{s.l}</p>
                                    <p className={`text-5xl font-black mt-2 ${s.c}`}>{s.v}</p>
                                </div>
                            ))}
                        </div>
                    )}

                    {(activeTab === 'products' || activeTab === 'users') && (
                        <div className={`rounded-[32px] border ${theme.border} ${theme.card} overflow-hidden animate-in shadow-sm`}>
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr>
                                        <th className={tableHeaderClass}>ID</th>
                                        <th className={tableHeaderClass}>{activeTab === 'products' ? 'ITEM' : 'NOMBRE'}</th>
                                        <th className={tableHeaderClass}>{activeTab === 'products' ? 'VALOR' : 'EMAIL'}</th>
                                        <th className={`${tableHeaderClass} text-right`}>ACCIONES</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {(activeTab === 'products' ? products : users)?.map((item) => (
                                        <tr key={item.id} className={`${isDarkMode ? 'hover:bg-white/[0.02]' : 'hover:bg-gray-50'}`}>
                                            <td className={tableCellClass}>#{item.id}</td>
                                            <td className={`${tableCellClass} font-bold uppercase`}>{item.name}</td>
                                            <td className={`${tableCellClass} font-mono ${activeTab === 'products' ? 'text-[#00C896]' : ''}`}>
                                                {activeTab === 'products' ? `${item.estimated_value}€` : item.email}
                                            </td>
                                            <td className={`${tableCellClass} text-right`}>
                                                <button className={`text-[10px] font-black uppercase px-3 py-1 rounded-lg border ${theme.border} hover:border-[#00C896] transition-colors`}>
                                                    Editar
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </main>
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
                .no-scrollbar::-webkit-scrollbar { display: none; }
                nav[class*="bg-white"], header[class*="bg-white"] { display: none !important; }
                .animate-in { animation: fadeIn 0.3s ease-out forwards; }
                @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
            `}} />
        </AuthenticatedLayout>
    );
}
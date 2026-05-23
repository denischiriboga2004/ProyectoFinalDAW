import { useState } from "react";
import { useAuth } from "@/Context/AuthContext";

export default function AccountSwitcher() {
    const { user, token, login, logout } = useAuth();
    const [showModal, setShowModal] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            await login(email, password);
            setEmail("");
            setPassword("");
            setShowModal(false);
        } catch (err) {
            setError(err.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <button
                onClick={() => setShowModal(true)}
                className="text-xs px-3 py-1 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition text-white/70 hover:text-white"
                title="Cambiar cuenta activa en esta pestaña"
            >
                🔄 Cambiar cuenta
            </button>

            {showModal && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
                    <div
                        className="absolute inset-0 bg-black/90"
                        onClick={() => setShowModal(false)}
                    />
                    <div className="relative bg-[#0A1625] border border-white/10 rounded-3xl p-8 max-w-md w-full">
                        <button
                            onClick={() => setShowModal(false)}
                            className="absolute right-6 top-6 text-white/50 hover:text-white"
                        >
                            ✕
                        </button>

                        <h2 className="text-2xl font-black mb-2">
                            Cambiar Cuenta
                        </h2>
                        <p className="text-white/60 mb-6 text-sm">
                            Inicia sesión como otro usuario en esta pestaña. Tu
                            sesión anterior en esta pestaña se reemplazará.
                        </p>

                        <form onSubmit={handleLogin} className="space-y-4">
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-2 text-white placeholder-white/40 outline-none focus:border-[#00C896]"
                                required
                            />
                            <input
                                type="password"
                                placeholder="Contraseña"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-2 text-white placeholder-white/40 outline-none focus:border-[#00C896]"
                                required
                            />

                            {error && (
                                <p className="text-red-400 text-sm">{error}</p>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-[#00C896] hover:bg-[#00b084] text-black font-bold py-2 rounded-xl transition disabled:opacity-50"
                            >
                                {loading ? "Iniciando..." : "Cambiar cuenta"}
                            </button>
                        </form>

                        {user && (
                            <button
                                onClick={logout}
                                className="w-full mt-4 border border-white/10 hover:border-red-400/50 text-white/70 hover:text-red-400 py-2 rounded-xl transition text-sm"
                            >
                                Cerrar sesión actual
                            </button>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}

import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Cargar token del sessionStorage al iniciar
    useEffect(() => {
        const savedToken = sessionStorage.getItem("auth_token");
        if (savedToken) {
            setToken(savedToken);
            fetchUserWithToken(savedToken);
        } else {
            setLoading(false);
        }
    }, []);

    const fetchUserWithToken = async (token) => {
        try {
            const res = await fetch("/api/user", {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (res.ok) {
                const userData = await res.json();
                setUser(userData);
            } else {
                // Token inválido, limpiar
                sessionStorage.removeItem("auth_token");
                setToken(null);
            }
        } catch (e) {
            console.error("Error fetching user:", e);
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        const res = await fetch("/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        if (!res.ok) {
            const error = await res.json();
            throw new Error(error.message || "Login failed");
        }

        const data = await res.json();
        setToken(data.token);
        setUser(data.user);
        sessionStorage.setItem("auth_token", data.token);
        return data;
    };

    const register = async (name, email, password, password_confirmation) => {
        const res = await fetch("/api/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name,
                email,
                password,
                password_confirmation,
            }),
        });

        if (!res.ok) {
            const error = await res.json();
            throw new Error(error.message || "Registration failed");
        }

        const data = await res.json();
        setToken(data.token);
        setUser(data.user);
        sessionStorage.setItem("auth_token", data.token);
        return data;
    };

    const logout = async () => {
        if (token) {
            try {
                await fetch("/api/logout", {
                    method: "POST",
                    headers: { Authorization: `Bearer ${token}` },
                });
            } catch (e) {
                console.error("Error logging out:", e);
            }
        }
        setToken(null);
        setUser(null);
        sessionStorage.removeItem("auth_token");
    };

    return (
        <AuthContext.Provider
            value={{ token, user, loading, login, register, logout }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}

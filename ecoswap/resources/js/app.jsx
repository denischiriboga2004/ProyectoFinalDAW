import "../css/app.css";
import "./bootstrap";

import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { createRoot } from "react-dom/client";
import { AuthProvider } from "./Context/AuthContext";

const appName = import.meta.env.VITE_APP_NAME || "Laravel";

// Configurar middleware para Inertia que añada el token en todas las request
const createInertiaRequestMiddleware = () => {
    return (visit) => {
        const token = sessionStorage.getItem("auth_token");
        if (token) {
            visit.headers = {
                ...visit.headers,
                Authorization: `Bearer ${token}`,
            };
        }
        return visit;
    };
};

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob("./Pages/**/*.jsx"),
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        // Obtener token del sessionStorage y pasarlo en request headers
        const token = sessionStorage.getItem("auth_token");
        if (token) {
            props.initialPage.props.headers = {
                ...props.initialPage.props.headers,
                Authorization: `Bearer ${token}`,
            };
        }

        root.render(
            <AuthProvider>
                <App {...props} />
            </AuthProvider>,
        );
    },
    progress: {
        color: "#4B5563",
    },
});

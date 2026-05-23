import { router } from "@inertiajs/react";

/**
 * Hook para realizar navegaciones Inertia con autenticación Bearer Token
 * Automáticamente incluye el token del sessionStorage en todas las request
 */
export const useAuthorizedLink = () => {
    const enhanceOptions = (options = {}) => {
        const token = sessionStorage.getItem("auth_token");

        return {
            ...options,
            headers: {
                ...options.headers,
                ...(token && { Authorization: `Bearer ${token}` }),
            },
        };
    };

    return {
        get: (url, options) => router.get(url, {}, enhanceOptions(options)),
        post: (url, data, options) =>
            router.post(url, data, enhanceOptions(options)),
        put: (url, data, options) =>
            router.put(url, data, enhanceOptions(options)),
        patch: (url, data, options) =>
            router.patch(url, data, enhanceOptions(options)),
        delete: (url, options) => router.delete(url, enhanceOptions(options)),
    };
};

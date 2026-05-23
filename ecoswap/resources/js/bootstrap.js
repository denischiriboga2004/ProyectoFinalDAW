import axios from "axios";

window.axios = axios;

window.axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

// Interceptor para añadir token Bearer a todas las request
window.axios.interceptors.request.use((config) => {
    const token = sessionStorage.getItem("auth_token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

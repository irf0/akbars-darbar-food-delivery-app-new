import api from "@services/api";
import { useAuthStore } from "@features/auth/store/useAuthStore";

api.interceptors.request.use(
    (config) => {
        const token = useAuthStore.getState().token

        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }

        return config
    },
    (error) => Promise.reject(error)

)
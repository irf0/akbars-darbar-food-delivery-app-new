import api from '../api'
import { useAuthStore } from '@features/auth/store/useAuthStore'

const MAX_RETRIES = 3

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const { config, response } = error

        // ─── Network error / timeout → retry with exponential backoff ──
        if (!response) {
            config._retryCount = config._retryCount ?? 0

            if (config._retryCount < MAX_RETRIES) {
                config._retryCount++
                const delay = 1000 * 2 ** config._retryCount
                await wait(delay)
                return api(config)
            }

            return Promise.reject(new Error('Network error. Please check your connection.'))
        }

        // ─── 401 → token expired, logout user ──────────────────────────
        if (response.status === 401) {
            useAuthStore.getState().logout()
            return Promise.reject(new Error('Session expired. Please login again.'))
        }

        // ─── 500 → server error ────────────────────────────────────────
        if (response.status >= 500) {
            return Promise.reject(new Error('Server error. Please try again later.'))
        }

        return Promise.reject(error)
    }
)
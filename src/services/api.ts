import { ENV } from '@config/env'
import axios from 'axios'

const api = axios.create({
    baseURL: ENV.apiBaseUrl,
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json'
    }
})

export default api

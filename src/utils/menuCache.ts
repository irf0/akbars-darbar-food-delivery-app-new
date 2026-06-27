import { createMMKV } from 'react-native-mmkv'
import { MenuItem } from 'types'

const storage = createMMKV({ id: 'menu-cache' })

const CACHE_KEY = 'menu_items'
const TIMESTAMP_KEY = 'menu_items_timestamp'
const TTL = 24 * 60 * 60 * 1000 // 24 hours in ms

type CachePayload = {
    items: MenuItem[]
    savedAt: number
}

export const menuCache = {
    save: (items: MenuItem[]): void => {
        const payload: CachePayload = {
            items,
            savedAt: Date.now(),
        }
        storage.set(CACHE_KEY, JSON.stringify(payload))
    },

    load: (): { items: MenuItem[], isStale: boolean } | null => {
        const raw = storage.getString(CACHE_KEY)
        if (!raw) return null

        try {
            const payload: CachePayload = JSON.parse(raw)
            const age = Date.now() - payload.savedAt
            const isStale = age > TTL

            return {
                items: payload.items,
                isStale,
            }
        } catch {
            // Corrupted cache — treat as miss
            storage.remove(CACHE_KEY)
            return null
        }
    },

    clear: (): void => {
        storage.remove(CACHE_KEY)
        storage.remove(TIMESTAMP_KEY)
    },
}
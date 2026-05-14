// src/features/auth/store/types.ts

export interface User {
    phone: string
    id?: string
    firstName: string
    lastName?: string
    email?: string
}

export interface AuthState {
    token: string | null
    user: User | null
    isAuthenticated: boolean
    hasHydrated: boolean
    hasCompletedOnboarding: boolean
    setHasHydrated: (val: boolean) => void
    setAuth: (token: string, user: User) => void
    completeOnboarding: () => void
    logout: () => void
}
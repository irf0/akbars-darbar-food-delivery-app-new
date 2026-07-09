import { DarbarUser } from '../../../types/index';

export interface AuthState {
  token: string | null;
  user: DarbarUser | null;
  isAuthenticated: boolean;
  hasHydrated: boolean;
  hasCompletedOnboarding: boolean;
  setHasHydrated: (val: boolean) => void;
  setAuth: (token: string, user: DarbarUser) => void;
  completeOnboarding: () => void;
  logout: () => void;
}

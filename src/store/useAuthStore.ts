import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// NOTE: Local Demo Auth only.
// This is NOT a real authentication system — it persists user data to LocalStorage
// for demo/preview purposes. There is no backend, no password hashing, no validation
// beyond basic field checks. Do not use in production.

export interface DemoUser {
  name: string;
  phone: string;
  email: string;
  createdAt: number;
}

interface AuthState {
  user: DemoUser | null;
  signIn: (user: Omit<DemoUser, "createdAt">) => void;
  signOut: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      signIn: (data) =>
        set({
          user: { ...data, createdAt: Date.now() },
        }),
      signOut: () => set({ user: null }),
    }),
    {
      name: "ofq-auth",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

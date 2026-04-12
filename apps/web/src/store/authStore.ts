import { create } from "zustand";
import type { AuthStore, User } from "@repo/types";

const STORAGE_KEY = "auth_user";

const stored = localStorage.getItem(STORAGE_KEY);
const initialUser: User | null = stored ? (JSON.parse(stored) as User) : null;

export const useAuthStore = create<AuthStore>((set) => ({
  user: initialUser,
  isAuthenticated: !!initialUser,

  login: async (email, _password) => {
    await new Promise((r) => setTimeout(r, 800));
    const user: User = { id: crypto.randomUUID(), name: email.split("@")[0], email };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    set({ user, isAuthenticated: true });
  },

  signup: async (name, email, _password) => {
    await new Promise((r) => setTimeout(r, 800));
    const user: User = { id: crypto.randomUUID(), name, email };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    set({ user, isAuthenticated: true });
  },

  logout: () => {
    localStorage.removeItem(STORAGE_KEY);
    set({ user: null, isAuthenticated: false });
  },
}));

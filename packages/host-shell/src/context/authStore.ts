import { create } from "zustand";

export interface AuthUser {
  id: string;
  name: string;
  slug: string;
  email: string;
  avatarUrl?: string;
}

interface AuthState {
  token: string | null;
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (token: string, user: AuthUser) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem("af_token"),
  user: JSON.parse(localStorage.getItem("af_user") || "null"),
  isAuthenticated: !!localStorage.getItem("af_token"),

  login: (token, user) => {
    localStorage.setItem("af_token", token);
    localStorage.setItem("af_user", JSON.stringify(user));
    set({ token, user, isAuthenticated: true });
  },

  logout: () => {
    localStorage.removeItem("af_token");
    localStorage.removeItem("af_user");
    set({ token: null, user: null, isAuthenticated: false });
  },
}));

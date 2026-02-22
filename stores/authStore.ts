import * as SecureStore from "expo-secure-store";
import { create } from "zustand";

interface User {
    id: number;
    username: string;
    email: string;
    genero?: string | null;
    fechaNacimiento?: string;
    pais?: string | null;
    codigoPostal?: string | null;
}

interface AuthStore {
    user: User | null;
    isAuthenticated: boolean;
    isPremium: boolean;
    login: (user: User, isPremium: boolean) => Promise<void>;
    logout: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
    user: null,
    isAuthenticated: false,
    isPremium: false,

    login: async (user, isPremium) => {
        await SecureStore.setItemAsync("user", JSON.stringify(user));
        await SecureStore.setItemAsync("isPremium", String(isPremium));
        set({ user, isAuthenticated: true, isPremium });
    },

    logout: async () => {
        await SecureStore.deleteItemAsync("user");
        await SecureStore.deleteItemAsync("isPremium");
        set({ user: null, isAuthenticated: false, isPremium: false });
    },
}));

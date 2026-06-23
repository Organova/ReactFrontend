import {create} from "zustand";
import {UserService} from "@/services/userService.ts";

type UserStore = {
    loggedIn: boolean;
    loading: boolean;
    error: string;
    username: string;
    setUsername: (username: string) => void;
    password: string;
    setPassword: (password: string) => void;
    email: string;
    setEmail: (email: string) => void;
    firstName: string;
    setFirstName: (firstName: string) => void;
    lastName: string;
    setSetLastName: (lastName: string) => void;
    id: string;
    tenantId: string;
    token: string;
    refreshToken: string;
    login: () => Promise<boolean | string>;
    signup: () => Promise<void>;
    logout: () => Promise<void>;
};

export default create<UserStore>((set, get) => ({
    loggedIn: false,
    loading: false,
    error: "",
    username: "",
    setUsername: (username: string) => set({ username }),
    password: "",
    setPassword: (password: string) => set({ password }),
    email: "",
    setEmail: (email: string) => set({ email }),
    firstName: "",
    setFirstName: (firstName: string) => set({ firstName }),
    lastName: "",
    setSetLastName: (lastName: string) => set({ lastName }),
    id: "",
    tenantId: "",
    token: "",
    refreshToken: "",
    login: async () => {
        set({ loading: true, error: "" });
        try {
            const { username, password } = get();
            const response = await UserService.login({ username, password });

            if (typeof response !== 'object') {
                throw new Error(response as string);
            }

            set({
                token: response.token || "",
                refreshToken: response.refreshToken || "",
                id: response.user?.id || "",
                username: response.user?.username || username,
                tenantId: response.defaultTenantId || "",
                loggedIn: true,
                loading: false,
            });

            return true;
        } catch (err: any) {
            set({ error: err?.message || "Login fehlgeschlagen", loading: false });
            return err?.message;
        }
    },
    logout: async () => {
        const { refreshToken } = get();
        try {
            await UserService.logout(refreshToken);
        } catch {
            // logout locally even if the API call fails
        }
        set({
            loggedIn: false,
            token: "",
            refreshToken: "",
            id: "",
            tenantId: "",
            username: "",
            password: "",
            email: "",
            firstName: "",
            lastName: "",
        });
    },
    signup: async () => {
        set({ loading: true, error: "" });
        try {
            const { username, password, email, firstName, lastName } = get();
            const response = await UserService.signup({ username, password, email, firstName, lastName });
            set({
                token: response.token || "",
                refreshToken: response.refreshToken || "",
                id: response.user?.id || "",
                username: response.user?.username || username,
                tenantId: response.defaultTenantId || "",
                loading: false,
                loggedIn: true,
            });
        } catch (err: any) {
            set({ error: err?.message || "Signup fehlgeschlagen", loading: false });
        }
    },
}));
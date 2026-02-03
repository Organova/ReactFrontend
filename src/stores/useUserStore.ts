import {create} from "zustand";
import {UserService} from "@/services/userService.ts";

type eventStore = {
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
    login: () => Promise<void>;
    signup: () => Promise<void>;
};

export default create<eventStore>((set, get) => ({
    loading: false,
    error: "",
    username: "admin",
    setUsername: (username: string) => set({ username }),
    password: "Geheim123!",
    setPassword: (password: string) => set({ password }),
    email: "admin@example.com",
    setEmail: (email: string) => set({ email }),
    firstName: "Admin",
    setFirstName: (firstName: string) => set({ firstName }),
    lastName: "Lindner",
    setSetLastName: (lastName: string) => set({ lastName }),
    id: "90a77924-b0c1-4345-a2bd-ef5d7da99ab0",
    tenantId: "34284f71-b6af-4dfb-8f79-1a761a8aea14",
    token: "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI5MGE3NzkyNC1iMGMxLTQzNDUtYTJiZC1lZjVkN2RhOTlhYjAiLCJpYXQiOjE3NzAxMjkzMzgsImV4cCI6MTc3MDEzMjkzOH0.0I7pln6iXl6biM9pIliOGk6ZPEAQdgYH59_9YEgDi7M",
    login: async () => {
        set({ loading: true, error: "" });
        try {
            const { username, password } = get();
            // EventService.login erwartet ein passendes Payload; hier username/password übergeben
            const response = await UserService.login({ username, password });
            set({
                token: (response && (response as any).token) || "",
                id: (response && (response as any).id) || "",
                loading: false,
            });
        } catch (err: any) {
            set({ error: err?.message || "Login fehlgeschlagen", loading: false });
        }
    },
    signup: async () => {
        set({ loading: true, error: "" });
        try {
            const { username, password, email, firstName, lastName } = get();
            const response = await UserService.signup({
                username,
                password,
                email,
                firstName,
                lastName,
            } as any);
            set({
                token: (response && (response as any).token) || "",
                id: (response && (response as any).id) || "",
                tenantId: (response && (response as any).tenantId || ""),
                loading: false,
            });
        } catch (err: any) {
            set({ error: err?.message || "Signup fehlgeschlagen", loading: false });
        }
    },
}));
import {create} from "zustand";
import {UserService} from "@/services/userService.ts";

type eventStore = {
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
    login: () => Promise<boolean> | Promise<string>;
    signup: () => Promise<void>;
};

export default create<eventStore>((set, get) => ({
    loggedIn: false,
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
    id: "4d96c689-ccb3-4cdb-93e4-6a92c0dde86e",
    tenantId: "556440b7-a75f-407b-abb2-1c1efccf662f",
    token: "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI0ZDk2YzY4OS1jY2IzLTRjZGItOTNlNC02YTkyYzBkZGU4NmUiLCJpYXQiOjE3NzA3Mjg1MjksImV4cCI6MTc3MDczMjEyOX0.4nQKINotOGnHzoK71tvURzXS4fKbxKVqKsue4bfuaHM",
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
                loggedIn: true,
                tenantId: response && (response as any).defaultTenantId || ""
            });

            console.log(typeof response)

            if (typeof response !== 'object'){
                throw new Error(response)
            }

            return true;
        } catch (err: any) {
            set({ error: err?.message || "Login fehlgeschlagen", loading: false });
            return err?.message;
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
                loggedIn: true
            });
        } catch (err: any) {
            set({ error: err?.message || "Signup fehlgeschlagen", loading: false });
        }
    },
}));
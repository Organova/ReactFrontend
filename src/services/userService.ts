import api_client from "@/services/api_client.ts";
import {Login, Signup, UserInfoLogin, UserInfoSignup} from "@/types/common.ts";

export class UserService {
    static async signup(user: UserInfoSignup) {
        const response = await api_client.post<Signup>("/auth/signup", user)
        return response.data
    }

    static async login(user: UserInfoLogin) {
        try {
            const response = await api_client.post<Login>(`/auth/login`, user);
            return response.data;
        } catch (error: any) {
            if (error.response) {
                const resMes: string = error.response.data.message;
                console.log(resMes);
                return resMes;
            }
            throw error;
        }
    }

    static async logout(refreshToken: string) {
        await api_client.post("/auth/logout", { refreshToken });
    }
}

export default new UserService()
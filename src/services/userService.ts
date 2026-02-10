import api_client from "@/services/api_client.ts";
import {Login, Signup, UserInfoLogin, UserInfoSignup} from "@/types/common.ts";

export class UserService {
    static async signup(user: UserInfoSignup) {
        const response = await api_client.post<Signup>("/signup", user)
        return response.data
    }

    static async login(user: UserInfoLogin) {
        const response = await api_client.post<Login>("/login", user)
        return response.data
    }
}

export default new UserService()
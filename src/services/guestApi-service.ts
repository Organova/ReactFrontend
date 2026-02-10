import axios, { AxiosInstance } from "axios";

export interface GuestCreateRequest {
  firstName: string;
  lastName: string;
  mail: string;
}

export interface GuestUpdateRequest {
  firstName: string;
  lastName: string;
  mail: string;
}

export interface GuestResponse {
  guestId: string;
  firstName: string;
  lastName: string;
  mail: string;
}

class ApiService {
  private api: AxiosInstance;
  private readonly TOKEN_KEY = "auth_token";

  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080",
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.api.interceptors.request.use(
      (config) => {
        const token = this.getToken();

        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
      },
      (error: any) => Promise.reject(error),
    );

    this.api.interceptors.response.use(
      (response: any) => response,
      (error: { response: { status: number } }) => {
        if (error.response?.status === 401) {
          this.clearToken();
          window.location.href = "/login";
        }

        return Promise.reject(error);
      },
    );
  }

  private getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  private clearToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  async getAllGuests(): Promise<GuestResponse[]> {
    const response = await this.api.get<GuestResponse[]>("/api/v1/guests");

    return response.data;
  }

  async getGuest(id: string): Promise<GuestResponse> {
    const response = await this.api.get<GuestResponse>(`/api/v1/guests/${id}`);

    return response.data;
  }

  async createGuest(data: GuestCreateRequest): Promise<GuestResponse> {
    const response = await this.api.post<GuestResponse>("/api/v1/guests", data);

    return response.data;
  }

  async updateGuest(
    id: string,
    data: GuestUpdateRequest,
  ): Promise<GuestResponse> {
    const response = await this.api.put<GuestResponse>(
      `/api/v1/guests/${id}`,
      data,
    );

    return response.data;
  }

  async deleteGuest(id: string): Promise<void> {
    await this.api.delete(`/api/v1/guests/${id}`);
  }
}

export const apiService = new ApiService();

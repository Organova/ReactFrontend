import api_client from "@/services/api_client.ts";

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

export interface PaginatedGuestsResponse {
  content: GuestResponse[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
}

export class GuestService {
  private readonly TOKEN_KEY = "auth_token";

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

  async getAllGuests(tenantId: string): Promise<PaginatedGuestsResponse> {
    const token = this.getToken();
    if (!token) {
      throw new Error("No authentication token found");
    }

    const authToken = "Bearer " + token;

    const response = await api_client.get<PaginatedGuestsResponse>("/api/v1/guests", {
      headers: {
        "X-Tenant-Id": tenantId,
        Authorization: authToken,
      },
    });

    console.log(response);
    return response.data;
  }

  async getGuest(tenantId: string, guestId: string): Promise<GuestResponse> {
    const token = this.getToken();
    if (!token) {
      throw new Error("No authentication token found");
    }

    const authToken = "Bearer " + token;

    const response = await api_client.get<GuestResponse>(`/api/v1/guests/${guestId}`, {
      headers: {
        "X-Tenant-Id": tenantId,
        Authorization: authToken,
      },
    });

    console.log(response);
    return response.data;
  }

  async createGuest(tenantId: string, data: GuestCreateRequest): Promise<GuestResponse> {
    const token = this.getToken();
    if (!token) {
      throw new Error("No authentication token found");
    }

    const authToken = "Bearer " + token;

    const response = await api_client.post<GuestResponse>("/api/v1/guests", data, {
      headers: {
        "X-Tenant-Id": tenantId,
        Authorization: authToken,
      },
    });

    console.log(response);
    return response.data;
  }

  async updateGuest(
      tenantId: string,
      guestId: string,
      data: GuestUpdateRequest
  ): Promise<GuestResponse> {
    const token = this.getToken();
    if (!token) {
      throw new Error("No authentication token found");
    }

    const authToken = "Bearer " + token;

    const response = await api_client.put<GuestResponse>(
        `/api/v1/guests/${guestId}`,
        data,
        {
          headers: {
            "X-Tenant-Id": tenantId,
            Authorization: authToken,
          },
        }
    );

    console.log(response);
    return response.data;
  }

  async deleteGuest(tenantId: string, guestId: string): Promise<void> {
    const token = this.getToken();
    if (!token) {
      throw new Error("No authentication token found");
    }

    const authToken = "Bearer " + token;

    const response = await api_client.delete(`/api/v1/guests/${guestId}`, {
      headers: {
        "X-Tenant-Id": tenantId,
        Authorization: authToken,
      },
    });

    console.log(response);
  }
}

export const guestService = new GuestService();
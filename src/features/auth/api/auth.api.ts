import apiClient from "@/lib/api-client";
import type {
    LoginPayload,
    RegisterPayload,
    AuthUser,
    AuthTokens,
} from "../types/auth.types";
import type { ApiResponse } from "@/types/api.types";

export const authApi = {
    login: (payload: LoginPayload) =>
        apiClient.post<ApiResponse<AuthTokens>>("/auth/login", payload),

    register: (payload: RegisterPayload) =>
        apiClient.post<ApiResponse<AuthUser>>("/auth/register", payload),

    logout: () => apiClient.post("/auth/logout"),

    me: () => apiClient.get<ApiResponse<AuthUser>>("/auth/me"),

    forgotPassword: (email: string) =>
        apiClient.post("/auth/forgot-password", { email }),

    resetPassword: (token: string, password: string) =>
        apiClient.post("/auth/reset-password", { token, password }),
};

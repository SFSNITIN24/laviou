import apiClient from "@/lib/api-client";
import type {
    LoginPayload,
    RegisterPayload,
    AuthUser,
    AuthTokens,
    RegisterResult,
} from "../types/auth.types";
import type { ApiResponse } from "@/types/api.types";

type ForgotPasswordResult = { sent: true };
type VerifyResetOtpResult = { resetToken: string };

export const authApi = {
    login: (payload: LoginPayload) =>
        apiClient.post<ApiResponse<AuthTokens>>("/auth/login", payload),

    register: (payload: RegisterPayload) =>
        apiClient.post<ApiResponse<RegisterResult>>("/auth/register", payload),

    logout: () => apiClient.post("/auth/logout"),

    refresh: (refreshToken: string) =>
        apiClient.post<ApiResponse<AuthTokens>>("/auth/refresh", { refreshToken }),

    me: () => apiClient.get<ApiResponse<AuthUser>>("/auth/me"),

    forgotPassword: (email: string) =>
        apiClient.post<ApiResponse<ForgotPasswordResult>>("/auth/forgot-password", { email }),

    verifyResetOtp: (email: string, otp: string) =>
        apiClient.post<ApiResponse<VerifyResetOtpResult>>("/auth/verify-reset-otp", { email, otp }),

    resetPassword: (token: string, password: string) =>
        apiClient.post("/auth/reset-password", { token, password }),
};

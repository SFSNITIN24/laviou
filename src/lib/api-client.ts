import axios, { type AxiosRequestConfig } from "axios";
import { authApi } from "@/features/auth/api/auth.api";
import { clearAuthToken, clearRefreshToken, getRefreshToken, setAuthToken, setRefreshToken } from "@/lib/auth-token";

type RetryAxiosRequestConfig = AxiosRequestConfig & {
    __isRetryRequest?: boolean;
    __silentSuccessMessage?: boolean;
};

type ApiEnvelope = {
    success?: boolean;
    message?: string;
};

let messageModulePromise: Promise<(typeof import("antd"))["message"]> | null = null;
async function showSuccessToast(text: string) {
    if (typeof window === "undefined") return;
    if (!messageModulePromise) {
        messageModulePromise = import("antd").then((m) => m.message);
    }
    const msg = await messageModulePromise;
    msg.success(text);
}

const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api",
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 15000,
});

// Request interceptor — attach auth token
apiClient.interceptors.request.use(
    (config) => {
        // In client components, read token from cookies
        if (typeof window !== "undefined") {
            const token = document.cookie
                .split("; ")
                .find((row) => row.startsWith("auth-token="))
                ?.split("=")[1];

            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor — handle errors globally
apiClient.interceptors.response.use(
    (response) => {
        const cfg = response.config as RetryAxiosRequestConfig | undefined;
        const method = (cfg?.method || "get").toLowerCase();
        const url = cfg?.url || "";
        const data = response.data as ApiEnvelope | undefined;

        // Global success notifications for mutations.
        if (
            !cfg?.__silentSuccessMessage &&
            method !== "get" &&
            url &&
            !url.includes("/auth/refresh") &&
            data?.success === true &&
            typeof data.message === "string" &&
            data.message.trim() !== ""
        ) {
            void showSuccessToast(data.message);
        }
        return response;
    },
    async (error) => {
        const status = error?.response?.status;
        const originalRequest = error?.config as RetryAxiosRequestConfig | undefined;

        // Avoid infinite retry loops
        if (status === 401 && originalRequest && !originalRequest.__isRetryRequest) {
            const refreshToken = getRefreshToken();
            if (refreshToken) {
                try {
                    originalRequest.__isRetryRequest = true;
                    const res = await authApi.refresh(refreshToken);
                    setAuthToken(res.data.data.accessToken);
                    setRefreshToken(res.data.data.refreshToken);
                    originalRequest.headers = {
                        ...(originalRequest.headers || {}),
                        Authorization: `Bearer ${res.data.data.accessToken}`,
                    };
                    return apiClient.request(originalRequest);
                } catch {
                    clearAuthToken();
                    clearRefreshToken();
                    if (typeof window !== "undefined") {
                        window.location.href = "/login";
                    }
                }
            } else if (typeof window !== "undefined") {
                window.location.href = "/login";
            }
        }

        return Promise.reject(error);
    }
);

export default apiClient;

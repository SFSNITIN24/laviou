import type { AxiosError } from "axios";

type ApiErrorShape = {
    message?: string;
    statusCode?: number;
    errors?: Record<string, string[]>;
};

export function getApiErrorMessage(error: unknown, fallback = "Request failed") {
    const e = error as AxiosError<ApiErrorShape> | undefined;
    return e?.response?.data?.message || fallback;
}


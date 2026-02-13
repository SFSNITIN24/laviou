import apiClient from "@/lib/api-client";
import type {
    ConciergeRequest,
    CreateConciergeRequestPayload,
} from "../types/concierge.types";
import type { ApiResponse, PaginatedResponse } from "@/types/api.types";

export const conciergeApi = {
    getAll: (page = 1, pageSize = 20) =>
        apiClient.get<PaginatedResponse<ConciergeRequest>>("/concierge", {
            params: { page, pageSize },
        }),

    getById: (id: string) =>
        apiClient.get<ApiResponse<ConciergeRequest>>(`/concierge/${id}`),

    create: (payload: CreateConciergeRequestPayload) =>
        apiClient.post<ApiResponse<ConciergeRequest>>("/concierge", payload),

    cancel: (id: string) =>
        apiClient.patch<ApiResponse<ConciergeRequest>>(`/concierge/${id}/cancel`),
};

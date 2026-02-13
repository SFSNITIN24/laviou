import apiClient from "@/lib/api-client";
import type {
    Item,
    CreateItemPayload,
    SellItemPayload,
    GiftItemPayload,
    DonateItemPayload,
} from "../types/items.types";
import type { ApiResponse, PaginatedResponse } from "@/types/api.types";

export const itemsApi = {
    getAll: (page = 1, pageSize = 20) =>
        apiClient.get<PaginatedResponse<Item>>("/items", {
            params: { page, pageSize },
        }),

    getById: (id: string) =>
        apiClient.get<ApiResponse<Item>>(`/items/${id}`),

    create: (payload: CreateItemPayload) =>
        apiClient.post<ApiResponse<Item>>("/items", payload),

    sell: (payload: SellItemPayload) =>
        apiClient.post<ApiResponse<Item>>(`/items/${payload.itemId}/sell`, payload),

    gift: (payload: GiftItemPayload) =>
        apiClient.post<ApiResponse<Item>>(`/items/${payload.itemId}/gift`, payload),

    donate: (payload: DonateItemPayload) =>
        apiClient.post<ApiResponse<Item>>(
            `/items/${payload.itemId}/donate`,
            payload
        ),

    delete: (id: string) => apiClient.delete(`/items/${id}`),
};

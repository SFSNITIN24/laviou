import apiClient from "@/lib/api-client";
import type {
    SharingSettings,
    UpdateSharingPayload,
} from "../types/sharing.types";
import type { ApiResponse } from "@/types/api.types";

export const sharingApi = {
    getByItemId: (itemId: string) =>
        apiClient.get<ApiResponse<SharingSettings>>(`/items/${itemId}/sharing`),

    update: (payload: UpdateSharingPayload) =>
        apiClient.put<ApiResponse<SharingSettings>>(
            `/items/${payload.itemId}/sharing`,
            payload
        ),

    removeAccess: (itemId: string, email: string) =>
        apiClient.delete(`/items/${itemId}/sharing/${email}`),
};

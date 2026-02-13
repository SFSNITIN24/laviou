"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { sharingApi } from "../api/sharing.api";
import type { UpdateSharingPayload } from "../types/sharing.types";

export const sharingKeys = {
    all: ["sharing"] as const,
    byItem: (itemId: string) => [...sharingKeys.all, itemId] as const,
};

export function useSharingSettings(itemId: string) {
    return useQuery({
        queryKey: sharingKeys.byItem(itemId),
        queryFn: () =>
            sharingApi.getByItemId(itemId).then((res) => res.data.data),
        enabled: !!itemId,
    });
}

export function useUpdateSharing() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: UpdateSharingPayload) => sharingApi.update(payload),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: sharingKeys.byItem(variables.itemId),
            });
        },
    });
}

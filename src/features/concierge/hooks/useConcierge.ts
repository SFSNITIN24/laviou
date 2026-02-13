"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { conciergeApi } from "../api/concierge.api";
import type { CreateConciergeRequestPayload } from "../types/concierge.types";

export const conciergeKeys = {
    all: ["concierge"] as const,
    lists: () => [...conciergeKeys.all, "list"] as const,
    list: (page: number) => [...conciergeKeys.lists(), page] as const,
    details: () => [...conciergeKeys.all, "detail"] as const,
    detail: (id: string) => [...conciergeKeys.details(), id] as const,
};

export function useConciergeRequests(page = 1) {
    return useQuery({
        queryKey: conciergeKeys.list(page),
        queryFn: () => conciergeApi.getAll(page).then((res) => res.data),
    });
}

export function useConciergeRequest(id: string) {
    return useQuery({
        queryKey: conciergeKeys.detail(id),
        queryFn: () => conciergeApi.getById(id).then((res) => res.data.data),
        enabled: !!id,
    });
}

export function useCreateConciergeRequest() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: CreateConciergeRequestPayload) =>
            conciergeApi.create(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: conciergeKeys.lists() });
        },
    });
}

export function useCancelConciergeRequest() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => conciergeApi.cancel(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: conciergeKeys.all });
        },
    });
}

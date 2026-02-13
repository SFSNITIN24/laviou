"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { itemsApi } from "../api/items.api";
import type {
    CreateItemPayload,
    SellItemPayload,
    GiftItemPayload,
    DonateItemPayload,
} from "../types/items.types";

export const itemKeys = {
    all: ["items"] as const,
    lists: () => [...itemKeys.all, "list"] as const,
    list: (page: number) => [...itemKeys.lists(), page] as const,
    details: () => [...itemKeys.all, "detail"] as const,
    detail: (id: string) => [...itemKeys.details(), id] as const,
};

export function useItems(page = 1) {
    return useQuery({
        queryKey: itemKeys.list(page),
        queryFn: () => itemsApi.getAll(page).then((res) => res.data),
    });
}

export function useItem(id: string) {
    return useQuery({
        queryKey: itemKeys.detail(id),
        queryFn: () => itemsApi.getById(id).then((res) => res.data.data),
        enabled: !!id,
    });
}

export function useCreateItem() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: CreateItemPayload) => itemsApi.create(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: itemKeys.lists() });
        },
    });
}

export function useSellItem() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: SellItemPayload) => itemsApi.sell(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: itemKeys.all });
        },
    });
}

export function useGiftItem() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: GiftItemPayload) => itemsApi.gift(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: itemKeys.all });
        },
    });
}

export function useDonateItem() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: DonateItemPayload) => itemsApi.donate(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: itemKeys.all });
        },
    });
}

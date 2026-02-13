"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { authApi } from "../api/auth.api";
import type { LoginPayload, RegisterPayload } from "../types/auth.types";

export const authKeys = {
    all: ["auth"] as const,
    me: () => [...authKeys.all, "me"] as const,
};

export function useCurrentUser() {
    return useQuery({
        queryKey: authKeys.me(),
        queryFn: () => authApi.me().then((res) => res.data.data),
    });
}

export function useLogin() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: LoginPayload) => authApi.login(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: authKeys.me() });
        },
    });
}

export function useRegister() {
    return useMutation({
        mutationFn: (payload: RegisterPayload) => authApi.register(payload),
    });
}

export function useLogout() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => authApi.logout(),
        onSuccess: () => {
            queryClient.clear();
        },
    });
}

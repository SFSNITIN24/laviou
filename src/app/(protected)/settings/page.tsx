"use client";

import { useCurrentUser } from "@/features/auth/hooks/useAuth";

export default function SettingsPage() {
    const { data, isLoading, error } = useCurrentUser();

    if (isLoading) return <div className="p-6">Loading settings...</div>;
    if (error) return <div className="p-6">Failed to load user.</div>;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-semibold mb-4">Settings</h1>
            <pre className="bg-white rounded p-4 text-xs overflow-auto">
                {JSON.stringify(data, null, 2)}
            </pre>
        </div>
    );
}

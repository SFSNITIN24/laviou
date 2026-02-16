"use client";

import { useItems } from "@/features/items/hooks/useItems";
import { useSharingSettings } from "@/features/sharing/hooks/useSharing";

export default function SharingSettingsPage() {
    const { data: items, isLoading: itemsLoading } = useItems(1);
    const firstItemId = items?.data?.[0]?.id ?? "";
    const sharing = useSharingSettings(firstItemId);

    if (itemsLoading) return <div className="p-6">Loading items...</div>;
    if (!firstItemId)
        return <div className="p-6">Create an item first to manage sharing.</div>;

    if (sharing.isLoading) return <div className="p-6">Loading sharing...</div>;
    if (sharing.error) return <div className="p-6">Failed to load sharing settings.</div>;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-semibold mb-4">Sharing Settings</h1>
            <div className="text-sm text-gray-600 mb-2">
                Showing sharing for item: <code>{firstItemId}</code>
            </div>
            <pre className="bg-white rounded p-4 text-xs overflow-auto">
                {JSON.stringify(sharing.data, null, 2)}
            </pre>
        </div>
    );
}

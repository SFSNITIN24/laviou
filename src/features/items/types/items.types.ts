export type ItemStatus = "active" | "sold" | "gifted" | "donated" | "archived";

export type ItemLifecycleAction = "sell" | "gift" | "donate";

export interface Item {
    id: string;
    name: string;
    description: string;
    status: ItemStatus;
    imageUrl?: string;
    createdAt: string;
    updatedAt: string;
}

export interface CreateItemPayload {
    name: string;
    description: string;
    imageUrl?: string;
}

export interface SellItemPayload {
    itemId: string;
    price: number;
    currency: string;
}

export interface GiftItemPayload {
    itemId: string;
    recipientEmail: string;
    message?: string;
}

export interface DonateItemPayload {
    itemId: string;
    organizationId: string;
    notes?: string;
}

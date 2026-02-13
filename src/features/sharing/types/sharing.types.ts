export type SharingVisibility = "private" | "friends" | "public";

export interface SharingSettings {
    id: string;
    itemId: string;
    visibility: SharingVisibility;
    sharedWithEmails: string[];
    allowComments: boolean;
    expiresAt?: string;
}

export interface UpdateSharingPayload {
    itemId: string;
    visibility: SharingVisibility;
    sharedWithEmails?: string[];
    allowComments?: boolean;
    expiresAt?: string;
}

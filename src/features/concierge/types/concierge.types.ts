export type ConciergeRequestStatus =
    | "pending"
    | "in_progress"
    | "completed"
    | "cancelled";

export type ConciergeServiceType =
    | "appraisal"
    | "authentication"
    | "restoration"
    | "storage"
    | "shipping";

export interface ConciergeRequest {
    id: string;
    itemId: string;
    serviceType: ConciergeServiceType;
    status: ConciergeRequestStatus;
    notes?: string;
    createdAt: string;
    updatedAt: string;
}

export interface CreateConciergeRequestPayload {
    itemId: string;
    serviceType: ConciergeServiceType;
    notes?: string;
}

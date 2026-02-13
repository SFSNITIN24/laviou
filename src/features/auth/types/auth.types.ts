export interface LoginPayload {
    email: string;
    password: string;
}

export interface RegisterPayload {
    email: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    lastName: string;
}

export interface AuthUser {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
}

export interface AuthTokens {
    accessToken: string;
    refreshToken: string;
}

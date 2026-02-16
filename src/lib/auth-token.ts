export const AUTH_TOKEN_COOKIE = "auth-token";

export function setAuthToken(token: string, maxAgeSeconds = 60 * 60 * 24 * 7) {
    const isHttps =
        typeof window !== "undefined" && window.location.protocol === "https:";
    const secure = isHttps ? "; secure" : "";
    document.cookie = `${AUTH_TOKEN_COOKIE}=${encodeURIComponent(
        token
    )}; path=/; max-age=${maxAgeSeconds}; samesite=lax${secure}`;
}

export function clearAuthToken() {
    const isHttps =
        typeof window !== "undefined" && window.location.protocol === "https:";
    const secure = isHttps ? "; secure" : "";
    document.cookie = `${AUTH_TOKEN_COOKIE}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; samesite=lax${secure}`;
}


export const PW_RESET_FLOW_COOKIE = "pw-reset-flow";
export const PW_RESET_VERIFIED_COOKIE = "pw-reset-verified";
export const PW_RESET_EMAIL_KEY = "pw-reset-email";
export const PW_RESET_TOKEN_KEY = "pw-reset-token";

export function startPasswordResetFlow(email: string) {
    // 10 minutes
    document.cookie = `${PW_RESET_FLOW_COOKIE}=1; path=/; max-age=${60 * 10}; samesite=lax`;
    try {
        sessionStorage.setItem(PW_RESET_EMAIL_KEY, email);
    } catch {
        // ignore
    }
}

export function markOtpVerified() {
    document.cookie = `${PW_RESET_VERIFIED_COOKIE}=1; path=/; max-age=${60 * 10}; samesite=lax`;
    // end the "otp step" gate but keep verified for reset step
    document.cookie = `${PW_RESET_FLOW_COOKIE}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; samesite=lax`;
}

export function clearPasswordResetFlow() {
    document.cookie = `${PW_RESET_FLOW_COOKIE}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; samesite=lax`;
    document.cookie = `${PW_RESET_VERIFIED_COOKIE}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; samesite=lax`;
    try {
        sessionStorage.removeItem(PW_RESET_EMAIL_KEY);
    sessionStorage.removeItem(PW_RESET_TOKEN_KEY);
    } catch {
        // ignore
    }
}

export function getPasswordResetEmail(): string | null {
    try {
        return sessionStorage.getItem(PW_RESET_EMAIL_KEY);
    } catch {
        return null;
    }
}

export function setPasswordResetToken(token: string) {
  try {
    sessionStorage.setItem(PW_RESET_TOKEN_KEY, token);
  } catch {
    // ignore
  }
}

export function getPasswordResetToken(): string | null {
  try {
    return sessionStorage.getItem(PW_RESET_TOKEN_KEY);
  } catch {
    return null;
  }
}


"use client";

import AppLayout from "@/components/AppLayout";
import { Form, Input } from "antd";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import FormLabel from "@/components/FormLabel";
import { formRules } from "@/constants/formRules";
import { authApi } from "@/features/auth/api/auth.api";
import { getApiErrorMessage } from "@/lib/api-error";
import {
  markOtpVerified,
  setPasswordResetToken,
} from "@/lib/password-reset-flow";
import { getPasswordResetEmail } from "@/lib/password-reset-flow";
import { useEffect, useState } from "react";

export default function OtpVerificationPage() {
  const router = useRouter();
  // Avoid hydration mismatches: sessionStorage is client-only.
  const [email, setEmail] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setEmail(getPasswordResetEmail());
  }, []);

  const handleSubmit = async (values: { otp: string }) => {
    setError(null);
    if (!email) {
      setError("Missing email. Please restart the flow.");
      return;
    }
    setLoading(true);
    try {
      const res = await authApi.verifyResetOtp(email, values.otp);
      const resetToken = res.data.data.resetToken;
      setPasswordResetToken(resetToken);
      markOtpVerified();
      router.push("/reset-password");
    } catch (e: unknown) {
      setError(getApiErrorMessage(e, "Invalid OTP"));
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!email) return;
    setError(null);
    setLoading(true);
    try {
      await authApi.forgotPassword(email);
    } catch (e: unknown) {
      setError(getApiErrorMessage(e, "Failed to resend code"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppLayout
      variant="auth"
      title="OTP Verification"
      subtitle={`Please enter 6-digit OTP sent to ${email || "your email"}`}
      authSwitchText="Don't have an account? Sign up"
      authSwitchLink="/register"
      authLeftTitle="Home"
      authLeftLink="/"
    >
      <Form
        layout="vertical"
        onFinish={handleSubmit}
        requiredMark={false}
        className="mt-6 w-full"
      >
        {error && <div className="mb-4 text-sm text-red-600">{error}</div>}
        <Form.Item
          label={<FormLabel>OTP</FormLabel>}
          name="otp"
          rules={formRules.otp}
          className="mb-1.5!"
        >
          <Input.OTP
            length={6}
            className="w-full! justify-between [&_.ant-input]:flex-1! sm:[&_.ant-input]:h-16 sm:[&_.ant-input]:w-16! [&_.ant-input]:h-12.5 [&_.ant-input]:w-12.5!"
            formatter={(str) => str.replace(/\D/g, "")}
            prefixCls="custom-otp-input"
          />
        </Form.Item>

        <div
          onClick={handleResend}
          className="text-[#8A9078] hover:underline text-base font-medium leading-[1.5] tracking-normal text-right cursor-pointer"
        >
          {loading ? "Resending..." : "Resend Code"}
        </div>


        <Button htmlType="submit" variant="primary" className="w-full !h-12 !mt-9">
          Verify
        </Button>
      </Form>
    </AppLayout>
  );
}

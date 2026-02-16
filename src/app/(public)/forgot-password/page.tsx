"use client";
import AppLayout from "@/components/AppLayout";
import Button from "@/components/Button";
import FormLabel from "@/components/FormLabel";
import { Form, Input } from "antd";
import { useRouter } from "next/navigation";
import { formRules } from "@/constants/formRules";
import { startPasswordResetFlow } from "@/lib/password-reset-flow";
import { authApi } from "@/features/auth/api/auth.api";
import { useState } from "react";
import { getApiErrorMessage } from "@/lib/api-error";

const ForgotPasswordForm = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: { email: string }) => {
    setError(null);
    setLoading(true);
    try {
      await authApi.forgotPassword(values.email);
      startPasswordResetFlow(values.email);
      router.push("/otp-verification");
    } catch (e: unknown) {
      setError(getApiErrorMessage(e, "Failed to request reset code"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppLayout
      variant="auth"
      title="Forgot password?"
      subtitle="Enter the email address you use on Laviou. We'll send you a OTP to reset your password."
      authRightText="Don't have an account?"
      authRightSwitchText="Sign up"
      authRightSwitchLink="/register"
      authLeftTitle="Login"
      authLeftLink="/login"
    >
      <Form
        layout="vertical"
        onFinish={onFinish}
        className="mt-8"
        requiredMark={false}
      >
        {error && <div className="mb-4 text-sm text-red-600">{error}</div>}
        <Form.Item
          label={<FormLabel>Email address</FormLabel>}
          name="email"
          rules={formRules.email}
        >
          <Input placeholder="Enter email" prefixCls="custom-input" />
        </Form.Item>

        <Button htmlType="submit" variant="primary"  className="w-full !h-12 !mt-9">
          {loading ? "Sending..." : "Reset Password"}
        </Button>
      </Form>
    </AppLayout>
  );
};

export default ForgotPasswordForm;

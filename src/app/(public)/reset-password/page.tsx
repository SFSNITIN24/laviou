"use client";

import AppLayout from "@/components/AppLayout";
import Button from "@/components/Button";
import FormLabel from "@/components/FormLabel";
import { Eye, EyeSlash } from "@/utils/svg";
import { Form, Input } from "antd";
import { useRouter } from "next/navigation";
import { formRules } from "@/constants/formRules";
import { authApi } from "@/features/auth/api/auth.api";
import { getApiErrorMessage } from "@/lib/api-error";
import { clearPasswordResetFlow, getPasswordResetToken } from "@/lib/password-reset-flow";
import { useState } from "react";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: {
    password: string;
    confirmPassword: string;
  }) => {
    setError(null);
    setLoading(true);
    try {
      const token = getPasswordResetToken();
      if (!token) {
        setError("Missing reset token. Please restart the flow.");
        return;
      }
      await authApi.resetPassword(token, values.password);
      clearPasswordResetFlow();
      router.push("/login");
    } catch (e: unknown) {
      setError(getApiErrorMessage(e, "Failed to reset password"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppLayout
      variant="auth"
      title="Reset Password"
      subtitle="Enter a new password, not less than 8 characters."
      authRightText="Don't have an account?"
      authRightSwitchText="Sign up"
      authRightSwitchLink="/register"
      authLeftTitle="Home"
      authLeftLink="/"
    >
      <Form
        layout="vertical"
        onFinish={handleSubmit}
        className="mt-8"
        requiredMark={false}
      >
        {error && <div className="mb-4 text-sm text-red-600">{error}</div>}
        {/* Password */}
        <Form.Item
          label={<FormLabel>Password</FormLabel>}
          name="password"
          rules={formRules.password}
        >
          <Input.Password
            placeholder="Enter password"
            prefixCls="custom-input"
            iconRender={(visible) =>
              visible ? (
                <div>
                  <Eye />
                </div>
              ) : (
                <div>
                  <EyeSlash />
                </div>
              )
            }
          />
        </Form.Item>

        {/* Confirm Password */}
        <Form.Item
          label={<FormLabel>Re-enter Password</FormLabel>}
          name="confirmPassword"
          dependencies={["password"]}
          rules={formRules.confirmPassword("password")}
        >
          <Input.Password
            placeholder="Re-enter password"
            prefixCls="custom-input"
            iconRender={(visible) =>
              visible ? (
                <div>
                  <Eye />
                </div>
              ) : (
                <div>
                  <EyeSlash />
                </div>
              )
            }
          />
        </Form.Item>

        <Button htmlType="submit" className="w-full !h-12 !mt-9" variant="primary">
          {loading ? "Saving..." : "Submit"}
        </Button>
      </Form>
    </AppLayout>
  );
}

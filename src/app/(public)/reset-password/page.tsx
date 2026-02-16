"use client";

import AppLayout from "@/components/AppLayout";
import Button from "@/components/Button";
import FormLabel from "@/components/FormLabel";
import { Eye, EyeSlash } from "@/utils/svg";
import { Form, Input } from "antd";
import { useRouter } from "next/navigation";
import { formRules } from "@/constants/formRules";
import { clearPasswordResetFlow } from "@/lib/password-reset-flow";

export default function ResetPasswordPage() {
  const router = useRouter();

  const handleSubmit = (values: {
    password: string;
    confirmPassword: string;
  }) => {
    console.log(values);
    // Backend endpoint is not implemented yet (returns 501), so we finish the flow locally.
    clearPasswordResetFlow();
    router.push("/login");
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
          Submit
        </Button>
      </Form>
    </AppLayout>
  );
}

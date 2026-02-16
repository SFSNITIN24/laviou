"use client";
import AppLayout from "@/components/AppLayout";
import Button from "@/components/Button";
import FormLabel from "@/components/FormLabel";
import { Form, Input } from "antd";
import { useRouter } from "next/navigation";
import { formRules } from "@/constants/formRules";
import { startPasswordResetFlow } from "@/lib/password-reset-flow";

const ForgotPasswordForm = () => {
  const router = useRouter();

  const onFinish = (values: { email: string }) => {
    console.log(values);
    startPasswordResetFlow(values.email);
    router.push("/otp-verification");
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
        <Form.Item
          label={<FormLabel>Email address</FormLabel>}
          name="email"
          rules={formRules.email}
        >
          <Input placeholder="Enter email" prefixCls="custom-input" />
        </Form.Item>

        <Button htmlType="submit" variant="primary"  className="w-full !h-12 !mt-9">
          Reset Password
        </Button>
      </Form>
    </AppLayout>
  );
};

export default ForgotPasswordForm;

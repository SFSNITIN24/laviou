"use client";

import AppLayout from "@/components/AppLayout";
import { Form, Input } from "antd";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import FormLabel from "@/components/FormLabel";
import { formRules } from "@/constants/formRules";

export default function OtpVerificationPage() {
  const router = useRouter();

  const handleSubmit = (values: { otp: string }) => {
    console.log("OTP Submitted:", values.otp);
    router.push("/reset-password");
  };

  return (
    <AppLayout
      variant="auth"
      title="OTP Verification"
      subtitle="Please enter 6-digit OTP sent to debbie.baker@example.com"
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
          onClick={() => console.log("Resend clicked")}
          className="text-[#8A9078] hover:underline text-base font-medium leading-[1.5] tracking-normal text-right cursor-pointer"
        >
          Resend Code
        </div>


        <Button htmlType="submit" variant="primary" className="w-full !h-12 !mt-9">
          Verify
        </Button>
      </Form>
    </AppLayout>
  );
}

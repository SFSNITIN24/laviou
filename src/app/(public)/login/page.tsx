"use client";

import Link from "next/link";
import AppLayout from "@/components/AppLayout";
import { Form, Input, message } from "antd";
import { Eye, EyeSlash } from "@/utils/svg";
import Button from "@/components/Button";
import { LoginPayload } from "@/features/auth/types/auth.types";
import { useRouter } from "next/navigation";
import FormLabel from "@/components/FormLabel";
import { formRules } from "@/constants/formRules";
import { useLogin } from "@/features/auth/hooks/useAuth";
import { useState } from "react";
import { getApiErrorMessage } from "@/lib/api-error";

export default function LoginPage() {
  const router = useRouter();
  const login = useLogin();
  const [callbackUrl] = useState<string | null>(() => {
    if (typeof window === "undefined") return null;
    const url = new URL(window.location.href);
    return url.searchParams.get("callbackUrl");
  });

  const handleSubmit = async (values: LoginPayload) => {
    try {
      await login.mutateAsync(values);
      router.push(callbackUrl || "/museum");
    } catch (e: unknown) {
      message.error(getApiErrorMessage(e, "Login failed"));
    }
  };

  return (
    <AppLayout
      variant="auth"
      title="Welcome Back!"
      subtitle="A place to preserve what matters."
      authRightText="Don't have an account?"
      authRightSwitchText="Sign up"
      authRightSwitchLink="/register"
      authLeftTitle="Home"
      authLeftLink="/"
    >
      {/* Login Form */}
      <Form
        layout="vertical"
        onFinish={handleSubmit}
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

        {/* Forgot password */}
        <Link
          href="/forgot-password"
          className="!text-[#8A9078] hover:underline text-base font-medium leading-[1.5] tracking-normal text-right block"
        >
          Forgot password?
        </Link>


        <Button htmlType="submit" variant="primary" className="w-full !h-12 !mt-9">
          {login.isPending ? "Logging in..." : "Login"}
        </Button>
      </Form>
    </AppLayout>
  );
}

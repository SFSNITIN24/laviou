"use client";

import { Form, Input, Row, Col } from "antd";
import { Eye, EyeSlash } from "@/utils/svg";
import { useRouter } from "next/navigation";
import { RegisterPayload } from "@/features/auth/types/auth.types";
import AppLayout from "@/components/AppLayout";
import Button from "@/components/Button";
import FormLabel from "@/components/FormLabel";
import { formRules } from "@/constants/formRules";

const RegisterPage = () => {
  const router = useRouter();

  const onFinish = (values: RegisterPayload) => {
    console.log(values);
    document.cookie = `auth-token=dummy-auth-token-123; path=/; max-age=${
      60 * 60 * 24
    }`;
    router.push("/onboarding");
  };

  return (
    <AppLayout
      variant="auth"
      title="Create Account"
      subtitle="Join Laviou to preserve what matters."
      authRightText="Already have an account?"
      authRightSwitchText="Login"
      authRightSwitchLink="/login"
      authLeftTitle="Home"
      authLeftLink="/"
    >
      <Form
        layout="vertical"
        onFinish={onFinish}
        className="mt-8"
        requiredMark={false}
      >
        <Row gutter={12}>
          <Col xs={24} sm={12}>
            <Form.Item
              label={<FormLabel>First Name</FormLabel>}
              name="firstName"
              rules={formRules.firstName}
            >
              <Input placeholder="Enter first name" prefixCls="custom-input" />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12}>
            <Form.Item
              label={<FormLabel>Last Name</FormLabel>}
              name="lastName"
              rules={formRules.lastName}
            >
              <Input placeholder="Enter last name" prefixCls="custom-input" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          label={<FormLabel>Email address</FormLabel>}
          name="email"
          rules={formRules.email}
        >
          <Input placeholder="Enter email address" prefixCls="custom-input" />
        </Form.Item>

        <Form.Item
          label={<FormLabel>Password</FormLabel>}
          name="password"
          rules={formRules.password}
        >
          <Input.Password
            placeholder="Enter password"
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
            prefixCls="custom-input"
          />
        </Form.Item>

        <Form.Item
          label={<FormLabel>Re-enter password</FormLabel>}
          name="confirmPassword"
          dependencies={["password"]}
          rules={formRules.confirmPassword("password")}
        >
          <Input.Password
            placeholder="Re-enter password"
            prefixCls="custom-input"
            autoComplete="new-password"
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

        <Button htmlType="submit" variant="primary" className="w-full !h-12 !mt-9">
          Sign up
        </Button>
      </Form>
    </AppLayout>
  );
};

export default RegisterPage;

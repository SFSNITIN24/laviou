"use client";

import { Eye, EyeSlash, LeftArrow } from "@/utils/svg";
import Link from "next/link";
import { Form, Input } from "antd";
import FormLabel from "@/components/FormLabel";
import Button from "@/components/Button";
import { formRules } from "@/constants/formRules";

interface ChangePasswordValues {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const ChangePasswordPage = () => {

  const onFinish = (values: ChangePasswordValues) => {
    console.log(values);
  };

  return (
    <div className="py-[18px] min-h-[calc(100vh-72px)]">
      <Link
        href="/dashboard"
        className="flex items-center gap-2 text-[#6E745E] hover:underline text-base font-medium sm:text-lg h-[24px]"
      >
        <LeftArrow />
        Return to My Museum
      </Link>

      <div className="flex flex-col items-center w-full gap-8 pt-8 min-h-[calc(100vh-154px)] max-w-[420px] w-full mx-auto min-w-[342px]">
        <div className="flex flex-col items-center text-center">
          <h1 className="font-heading text-[32px] sm:text-[40px] font-normal leading-[1.2] text-center mb-2 text-[#2E2E2C]">
           Change Password
          </h1>

          <p className="text-secondary text-base font-normal leading-[1.5] tracking-normal text-center text-[#4D4D4D]">
             Enter a new password, not less than 8 characters.
          </p>

        </div>

        <Form
          layout="vertical"
          onFinish={onFinish}
          className="mt-8 w-full"
          requiredMark={false}
        >
          <Form.Item
            label={<FormLabel>Old Password</FormLabel>}
            name="oldPassword"
            rules={formRules.oldPassword}
          >
            <Input.Password
              placeholder="Enter old password"
              prefixCls="custom-input"
              iconRender={(visible) =>
                visible ? (
                  
                    <Eye />
                ) : (
                    <EyeSlash />
                )
              }
            />
          </Form.Item>

          {/* Password */}
          <Form.Item
            label={<FormLabel>New Password</FormLabel>}
            name="newPassword"
            rules={formRules.newPassword}
          >
            <Input.Password
              placeholder="Enter password"
              prefixCls="custom-input"
              iconRender={(visible) =>
                visible ? (
                    <Eye />
                ) : (
                    <EyeSlash />
                )
              }
            />
          </Form.Item>

          {/* Confirm Password */}
          <Form.Item
            label={<FormLabel>Re-enter Password</FormLabel>}
            name="confirmPassword"
            dependencies={["newPassword"]}
            rules={formRules.confirmPassword("newPassword")}
          >
            <Input.Password
              placeholder="Re-enter password"
              prefixCls="custom-input"
              iconRender={(visible) =>
                visible ? (
                    <Eye />
                ) : (
                    <EyeSlash />
                )
              }
            />
          </Form.Item>

          <Button
             htmlType="submit"
            className="w-full !h-12 !mt-9"
            variant="primary"
          >
            Update
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default ChangePasswordPage;

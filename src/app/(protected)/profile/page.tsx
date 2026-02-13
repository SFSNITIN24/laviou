"use client";
import Image from "next/image";
import Link from "next/link";
import { Form, Input } from "antd";
import { EditIcon, LeftArrow } from "@/utils/svg";
import sampleProfile from "@/assets/images/profileimage.png";
import Button from "@/components/Button";
import FormLabel from "@/components/FormLabel";
import { formRules } from "@/constants/formRules";


const ProfilePage = () => {
  const profilePhoto = "null";

  const onFinish = (values: {
    email: string;
    firstName: string;
    lastName: string;
  }) => {
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
            My Profile
          </h1>

          <p className="text-secondary text-base font-normal leading-[1.5] tracking-normal text-center text-[#4D4D4D]">
            Your profile helps you return to the place where your
            memories are preserved.
          </p>

        </div>

        <div className="flex justify-center">
          <div className="relative">
            {profilePhoto ? (
              <Image
                src={sampleProfile}
                width={150}
                height={150}
                alt="Profile"
                className="w-37.5 h-37.5 rounded-full object-cover"
              />
            ) : (
              null
            )}

            <div className="absolute bottom-1 right-0">
              <label className="cursor-pointer h-10.5 w-10.5 bg-primary rounded-full flex items-center justify-center">
                <input
                  type="file"
                  accept="image/*"
                  // onChange={handleFileChange}
                  className="hidden!"
                />
                <EditIcon />
              </label>
            </div>
          </div>
        </div>

        <Form
          layout="vertical"
          onFinish={onFinish}
          className="mt-8 w-full"
          requiredMark={false}
        >
          <Form.Item
            label={<FormLabel>First Name</FormLabel>}
            name="firstName"
            rules={formRules.firstName}
          >
            <Input placeholder="Enter first name" prefixCls="custom-input" />
          </Form.Item>

          <Form.Item
            label={<FormLabel>Last Name</FormLabel>}
            name="lastName"
            rules={formRules.lastName}
          >
            <Input placeholder="Enter last name" prefixCls="custom-input" />
          </Form.Item>

          <Form.Item
            label={<FormLabel>Email address</FormLabel>}
            name="email"
            rules={formRules.email}
          >
            <Input placeholder="Enter email address" prefixCls="custom-input" />
          </Form.Item>

          <Button
            htmlType="submit"
            className="w-full !h-12 !mt-9"
            variant="primary"

          >
            Update Profile
          </Button>
        </Form>
      </div>
    </div>

  );
};

export default ProfilePage;

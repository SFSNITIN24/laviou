"use client";

import { Form, Input, Radio } from "antd";
import Button from "@/components/Button";
import { LeftArrow } from "@/utils/svg";
import { useState } from "react";
import { useRouter } from "next/navigation";

const ExhibitPermissions = () => {
  const router = useRouter();
  const [visibility, setVisibility] = useState("link");

  const handleSubmit = (values: { visibility: string }) => {
    console.log(values);
    router.push("/exhibit/123");
  };

  return (
    <div className="py-2 md:py-7">
      {/* Back */}
      <div
        className="flex gap-2 items-center mb-10 cursor-pointer"
        onClick={() => router.back()}
      >
        <LeftArrow /> Back
      </div>

      <div className="flex flex-col items-center justify-center w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <h3 className="text-[32px] md:text-[40px] leading-[120%]">
            Who can see this?
          </h3>
          <p className="mt-2 text-sm md:text-base text-[#8A8A8A]">
            You can choose who sees this artifact
          </p>
        </div>

        <Form
          layout="vertical"
          className="max-w-140 w-full mx-auto"
          onFinish={handleSubmit}
        >
          <Radio.Group
            value={visibility}
            onChange={(e) => setVisibility(e.target.value)}
            className="flex! flex-col! gap-8"
          >
            {/* Only me */}
            <Radio value="private" prefixCls="custom-radio">
              <div>
                <p className="font-semibold text-base mb-1.25">Only me</p>
                <p className="text-sm  text-[#4D4D4D] leading-[150%]">
                  This remains private.
                </p>
              </div>
            </Radio>

            <div className="flex flex-col gap-3">
              <Radio value="specific" prefixCls="custom-radio">
                <div>
                  <p className="font-semibold text-base mb-1.25">
                    Specific people
                  </p>
                  <p className="text-sm text-[#4D4D4D] leading-[150%]">
                    Invite individuals by name or email.
                  </p>
                </div>
              </Radio>

              {visibility === "specific" && (
                <div className="p-4 rounded-lg bg-[#F7F6F3]">
                  <Form.List name="members">
                    {(fields, { add }) => (
                      <>
                        <div className="flex justify-between items-center mb-3">
                          <div>
                            <p className="text-sm text-black font-medium leading-[150%]">
                              Select specific people
                            </p>
                            <p className="text-sm text-[#4D4D4D] leading-[150%] hidden sm:block">
                              Enter the email address we share them links
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => add()}
                            className="text-base text-[#8A9078]"
                          >
                            + Add member
                          </button>
                        </div>

                        {fields.map(({ key, name }) => (
                          <div key={key} className="flex gap-2 mb-2">
                            <Form.Item
                              name={name}
                              className="flex-1 mb-1.5!"
                              rules={[
                                {
                                  type: "email",
                                  message: "Enter a valid email",
                                },
                              ]}
                            >
                              <Input
                                placeholder="Enter email address"
                                prefixCls="custom-input"
                                className="group bg-[#F8F7F4]!"
                              />
                            </Form.Item>
                          </div>
                        ))}
                      </>
                    )}
                  </Form.List>
                </div>
              )}
            </div>
            {/* Specific people */}

            <div className="flex flex-col gap-3">
              {/* Anyone with a link */}
              <Radio value="link" prefixCls="custom-radio">
                <div>
                  <p className="font-semibold text-base mb-1.25">
                    Anyone with a link
                  </p>
                  <p className="text-sm text-[#4D4D4D] leading-[150%]">
                    Accessible only to those you share it with.
                  </p>
                </div>
              </Radio>

              {visibility === "link" && (
                <div className="flex gap-2 bg-[#F8F7F4] p-4 rounded-xl">
                  <Input
                    value="NFDLCRUWHYX65LEUJWLom1YCE"
                    readOnly
                    className="bg-[#F8F7F4]! h-12!"
                  />
                  <Button variant="primary" className="px-2.5">
                    Copy
                  </Button>
                </div>
              )}
            </div>

            {/* Public */}
            <Radio value="public" prefixCls="custom-radio">
              <div>
                <p className="font-semibold text-base mb-1.25">Public</p>
                <p className="text-sm text-[#4D4D4D] leading-[150%]">
                  Visible to anyone.
                </p>
              </div>
            </Radio>
          </Radio.Group>

          {/* Footer */}
          <div className="mt-14 text-center">
            <p className="text-xs text-[#8A8A8A] mb-3">
              You can change this at any time.
            </p>

            <Button
              htmlType="submit"
              variant="outline"
              className="w-full h-12! text-black font-normal text-base"
            >
              Save permissions
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default ExhibitPermissions;

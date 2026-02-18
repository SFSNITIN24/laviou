"use client";

import Image from "next/image";
import homeImage from "@/assets/images/home.png";
import Button from "@/components/Button";
import { Form, Input, Radio } from "antd";
import { useState } from "react";
import { useRouter } from "next/navigation";

const MakeDonation = () => {
  const [form] = Form.useForm();
  const router = useRouter();
  const [visibility, setVisibility] = useState("link");

  const handleSubmit = (values: { visibility: string }) => {
    console.log(values);
    router.push("/exhibit/123");
  };

  return (
    <div className="flex flex-col-reverse md:flex-row gap-6 md:gap-25 py-6 md:py-11 w-full min-h-[calc(100vh-72px)]">
      {/* Content */}
      <div className="flex flex-col justify-between w-full md:max-w-110">
        <div className="flex flex-col gap-8 ">
          <div>
            <h1 className="text-[24px] md:text-[32px] leading-[120%]">
              When you’re ready, here are some ways to donate this item.
            </h1>
            <p className="md:text-lg text-base leading-[140%] mt-3 text-[#4D4D4D]">
              You can choose one, choose later, or handle this outside Laviou.
            </p>
          </div>

          <Form
            layout="vertical"
            className="max-w-140 w-full mx-auto"
            onFinish={handleSubmit}
            form={form}
          >
            <Radio.Group
              value={visibility}
              onChange={(e) => setVisibility(e.target.value)}
              className="flex! flex-col! gap-8"
            >
              <Radio value="charity" prefixCls="custom-radio">
                <p className="font-semibold text-base">Local charities </p>
              </Radio>

              <Radio value="museums" prefixCls="custom-radio">
                <p className="font-semibold text-base mb-1.25">
                  Museums or archives
                </p>
              </Radio>

              <Radio value="community" prefixCls="custom-radio">
                <p className="font-semibold text-base">
                  Community organizations
                </p>
              </Radio>

              <div className="flex flex-col gap-4">
                <Radio value="nonprofits" prefixCls="custom-radio">
                  <p className="font-semibold text-base">
                    Specialized nonprofits
                  </p>
                </Radio>
                {visibility === "nonprofits" && (
                  <div className="p-4 bg-[#F8F7F4] rounded-xl">
                    <Form.Item
                      label="Organization"
                      name="organization"
                      prefixCls="custom-form-label"
                    >
                      <Input
                        type="text"
                        placeholder="Write here..."
                        prefixCls="custom-input"
                      />
                    </Form.Item>
                    <Form.Item
                      label="Category name "
                      name="category"
                      prefixCls="custom-form-label"
                    >
                      <Input
                        type="text"
                        placeholder="Write here..."
                        prefixCls="custom-input"
                      />
                    </Form.Item>
                    <Form.Item
                      label="Brief factual description"
                      name="description"
                      prefixCls="custom-form-label"
                    >
                      <Input.TextArea
                        rows={6}
                        placeholder="Write here..."
                        className="bg-[#F8F7F4]!"
                      />
                    </Form.Item>
                    <Form.Item
                      label={
                        <label className="leading-[150%] text-[20px]">
                          Location or scope{" "}
                          <span className="text-[#4D4D4D] text-base">
                            (if relevant)
                          </span>
                        </label>
                      }
                      name="location"
                      prefixCls="custom-form-label"
                    >
                      <Input
                        type="text"
                        placeholder="Write here..."
                        prefixCls="custom-input"
                      />
                    </Form.Item>
                  </div>
                )}
              </div>

              <Radio value="handleMyself" prefixCls="custom-radio">
                <p className="font-semibold text-base">Handle this myself</p>
              </Radio>
            </Radio.Group>
          </Form>
        </div>

        <div className="text-center w-full flex flex-col gap-3 mt-14 md:mt-15">
          <Button
            onClick={() => form.submit()}
            variant="outline"
            className="w-full h-12 text-black! font-normal!"
          >
            Save donation choice
          </Button>
          <Button
            href="/museum"
            variant="outline"
            className="w-full h-12 text-black! font-normal!"
          >
            Return to My Museum
          </Button>
          <p className="text-base leading-[150%] text-[#4D4D4D] mt-7">
            Some decisions are easier with another person.
          </p>
          <Button
            variant="outline"
            className="w-full h-12 text-black! font-normal!"
          >
            Concierge
          </Button>
        </div>
      </div>

      {/* Image */}
      <div className="w-full flex flex-col">
        <div className="relative w-full min-h-42.5 sm:h-65 md:h-full max-h-[calc(100vh-150px)] md:flex-1">
          <Image
            src={homeImage.src}
            alt="Onboarding Image"
            className="rounded-lg object-cover"
            fill
            priority
          />
        </div>
        <Button
          href="/museum/123"
          variant="outline"
          className="w-full h-12 text-black! font-normal! mt-6 max-md:mt-3"
        >
          View Item Detail
        </Button>
      </div>
    </div>
  );
};

export default MakeDonation;

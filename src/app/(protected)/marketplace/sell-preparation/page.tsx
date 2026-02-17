"use client";

import Image from "next/image";
import homeImage from "@/assets/images/home.png";
import Button from "@/components/Button";
import { Form, Input } from "antd";
import { DollarIcon } from "@/utils/svg";

const SellPreparation = () => {
  return (
    <div className="flex flex-col-reverse md:flex-row gap-8 md:gap-25 py-6 md:py-11 w-full min-h-[calc(100vh-72px)]">
      {/* Content */}
      <div className="flex flex-col justify-between w-full md:max-w-110">
        <div className="flex flex-col gap-8 ">
          <div>
            <h1 className="text-[24px] md:text-[32px] leading-[120%]">
              Prepare this item for sale.
            </h1>
            <p className="md:text-lg text-base leading-[140%] mt-3 text-[#4D4D4D]">
              You can prepare this item for sale at your own pace.
            </p>
          </div>

          <Form layout="vertical">
            <h5 className="text-lg md:text-[20px] leading-[120%]">
              Item Details
            </h5>
            <p className="text-base leading-[150%] mt-1.5 mb-4 text-[#4D4D4D]">
              Include only what feels relevant.
            </p>

            <Form.Item
              label="Condition"
              name="condition"
              prefixCls="custom-form-label"
            >
              <Input
                type="text"
                placeholder="Write here..."
                prefixCls="custom-input-colored"
              />
            </Form.Item>
            <Form.Item
              label={
                <label className="leading-[150%]">
                  Dimensions <span className="text-[#4D4D4D]">(optional)</span>
                </label>
              }
              name="dimensions"
              prefixCls="custom-form-label"
            >
              <Input
                type="text"
                placeholder="Write here..."
                prefixCls="custom-input-colored"
              />
            </Form.Item>
            <Form.Item
              label={
                <label className="leading-[150%]">
                  Materials <span className="text-[#4D4D4D]">(optional)</span>
                </label>
              }
              name="materials"
              prefixCls="custom-form-label"
            >
              <Input
                type="text"
                placeholder="Write here..."
                prefixCls="custom-input-colored"
              />
            </Form.Item>

            <Form.Item
              label={
                <div>
                  <label className="leading-[150%] text-[20px]">
                    Provenance and Context{" "}
                    <span className="text-[#4D4D4D] text-base">(optional)</span>
                  </label>
                  <p className="text-[#4D4D4D] text-base leading-[150%] mt-1.5">
                    Is there anything about this item’s history that should be
                    known?
                  </p>
                </div>
              }
              name="context"
              className="mt-12"
              prefixCls="custom-form-label"
            >
              <Input.TextArea
                rows={6}
                placeholder="Enter a story for your item"
                className="bg-[#F2F1ED]!"
              />
            </Form.Item>

            <Form.Item
              label={
                <div>
                  <label className="leading-[150%] text-[20px]">
                    Provenance and Context{" "}
                    <span className="text-[#4D4D4D] text-base">(optional)</span>
                  </label>
                  <p className="text-[#4D4D4D] text-base leading-[150%] mt-1.5">
                    Is there anything about this item’s history that should be
                    known?
                  </p>
                </div>
              }
              name="context"
              className="mt-12"
              prefixCls="custom-form-label"
            >
              <Input
                prefix={<DollarIcon />}
                placeholder="Write here..."
                prefixCls="custom-input-colored"
              />
            </Form.Item>
          </Form>
        </div>

        <div className="text-center w-full flex flex-col gap-3 mt-11">
          <i className="text-sm leading-[150%] text-[#8A9078]">
            Your changes are saved as you go.
          </i>
          <Button
            href="/museum"
            variant="outline"
            className="w-full h-12 text-black! font-normal!"
          >
            Save and continue later
          </Button>
          <Button
            href="/marketplace/preview"
            variant="outline"
            className="w-full h-12 text-black! font-normal!"
          >
            Preview listing
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
      </div>
    </div>
  );
};

export default SellPreparation;

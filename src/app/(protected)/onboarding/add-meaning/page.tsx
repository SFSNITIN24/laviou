"use client";

import Button from "@/components/Button";
import Image from "next/image";
import homeImage from "@/assets/images/home.png";
import Link from "next/link";
import { LeftArrow } from "@/utils/svg";
import { Form, Input } from "antd";
import { useRouter } from "next/navigation";

const FEELINGS = [
  { label: "Comfort", value: "comfort" },
  { label: "Love", value: "love" },
  { label: "Pride", value: "pride" },
  { label: "Wonder", value: "wonder" },
  { label: "Joy", value: "joy" },
];

const AddMeaning = () => {
  const [form] = Form.useForm();
  const router = useRouter();

  const handleSubmit = (values: any) => {
    console.log(values);
    router.push("/onboarding/confirmation");
  };

  const selectedFeelings = Form.useWatch("feelings", form) || [];

  return (
    <div className="flex flex-col-reverse md:flex-row gap-8 md:gap-25 py-6 md:py-11 w-full min-h-[calc(100vh-72px)]">
      {/* Content */}
      <div className="flex flex-col justify-between w-full md:w-[40%]">
        <div className="flex flex-col gap-5">
          <Link
            href={"/onboarding"}
            className="flex items-center gap-3 cursor-pointer max-md:hidden"
          >
            <LeftArrow width={24} height={24} />
            <span className="font-medium text-sm leading-normal tracking-normal text-center text-[#6E745E]">
              Back
            </span>
          </Link>
          <Form form={form} onFinish={handleSubmit} layout="vertical">
            <Form.Item
              label="What kind of meaning does this hold for you?"
              name="title"
            >
              <Input.TextArea
                rows={6}
                placeholder="Enter a title for your item"
                className="bg-[#F2F1ED]!"
              />
            </Form.Item>

            <Form.Item
              label={
                <label className="leading-[150%]">
                  When did this enter your life?{" "}
                  <span className="text-[#4D4D4D]">(optional)</span>
                </label>
              }
              name="title"
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
                  When you encounter this, what feeling is most attached to it?{" "}
                  <span className="text-[#4D4D4D]">(optional)</span>
                </label>
              }
              name="feelings"
            >
              <div className="flex flex-wrap gap-1.5">
                {FEELINGS.map((feeling) => {
                  const isSelected = selectedFeelings.includes(feeling.value);
                  return (
                    <Button
                      key={feeling.value}
                      variant={isSelected ? "primary" : "secondary"}
                      className={`rounded-full! px-4! py-2! font-medium text-sm ${isSelected ? "border border-[#8A9078]" : "bg-[#F2F1ED]!"}`}
                      onClick={() =>
                        form.setFieldValue(
                          "feelings",
                          isSelected
                            ? selectedFeelings.filter(
                                (f: string) => f !== feeling.value,
                              )
                            : [...selectedFeelings, feeling.value],
                        )
                      }
                    >
                      {feeling.label}
                    </Button>
                  );
                })}
              </div>
            </Form.Item>
          </Form>
        </div>

        <div className="flex flex-col gap-3 mt-14">
          <Button
            variant="primary"
            className="w-full h-12"
            onClick={() => form.submit()}
          >
            Save and continue
          </Button>
          <Button variant="outline" className="w-full h-12">
            Save as draft
          </Button>
        </div>
      </div>

      {/* Image */}
      <div className="w-full md:w-[60%] flex flex-col">
        <Link
          href={"/onboarding"}
          className="flex items-center gap-3 cursor-pointer md:hidden mb-6"
        >
          <LeftArrow width={24} height={24} />
          <span className="font-medium text-sm leading-normal tracking-normal text-center text-[#6E745E]">
            Back
          </span>
        </Link>

        <div className="relative w-full min-h-42.5 sm:h-65 md:h-full md:flex-1">
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

export default AddMeaning;

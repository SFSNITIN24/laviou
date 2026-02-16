"use client";

import Button from "@/components/Button";
import { HolderIcon, LeftArrow } from "@/utils/svg";
import { Form, Input, Select } from "antd";
import { useRouter } from "next/navigation";
import React from "react";

interface CreateExhibitProps {
  isEditing: boolean;
  initialValues?: CreateExhibitFormVals;
}

interface CreateExhibitFormVals {
  title: string;
  subtitle: string;
  story: string;
  items: { story: string; artifact: string }[];
}

const CreateEditExhibitForm: React.FC<CreateExhibitProps> = ({
  isEditing = false,
  initialValues,
}) => {
  const router = useRouter();

  const handleSubmit = (values: CreateExhibitFormVals) => {
    console.log(values, isEditing);
    router.push(isEditing ? "/exhibit/123" : "/exhibit/exhibit-permissions");
  };

  const title = isEditing ? "Edit Exhibit" : "Create Exhibit";
  const subtitle = isEditing
    ? "You can edit artifacts and details when you’re ready"
    : "You can add artifacts and details when you’re ready";

  return (
    <div className=" mt-2 md:mt-7 pb-14 md:pb-26 ">
      <div
        className="flex gap-2 items-center cursor-pointer"
        onClick={() => router.back()}
      >
        <LeftArrow /> Back
      </div>
      <div className="mt-10 md:mt-14 flex flex-col items-center justify-center w-full">
        <h3 className="text-[32px] md:text-[40px] leading-[120%]">{title}</h3>
        <p className="mt-2 text-base leading-[150%]">{subtitle}</p>

        <Form
          className="mt-10! md:mt-15! w-full max-w-175"
          layout="vertical"
          requiredMark={false}
          onFinish={handleSubmit}
          initialValues={initialValues}
        >
          <Form.Item
            label="Exhibit title"
            name="title"
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
                Exhibit Subtitle{" "}
                <span className="text-[#4D4D4D]">(optional)</span>
              </label>
            }
            name="subtitle"
            prefixCls="custom-form-label"
          >
            <Input
              type="text"
              placeholder="Write here..."
              prefixCls="custom-input-colored"
            />
          </Form.Item>
          <Form.Item
            label="What story do these items tell together?"
            name="story"
            prefixCls="custom-form-label"
          >
            <Input.TextArea
              rows={6}
              placeholder="Enter a story for your item"
              className="bg-[#F2F1ED]!"
            />
          </Form.Item>

          {/* Included Items */}
          <Form.List name="items">
            {(fields, { add, remove }) => (
              <>
                <div className="mt-6 flex justify-between items-center">
                  <span className="text-[20px] md:text-[22px] font-medium">
                    Included Items
                  </span>

                  <Button
                    htmlType="button"
                    variant="outline"
                    className="border-none! hover:bg-transparent"
                    onClick={() => add()}
                  >
                    + Add Artifact
                  </Button>
                </div>

                <div className="flex flex-col gap-6 md:gap-3 mt-3">
                  {fields.map(({ key, name }) => (
                    <div key={key}>
                      <div className="rounded-lg flex items-center gap-3">
                        <HolderIcon />

                        {/* Artifact select */}
                        <div className="w-full bg-white pt-4 px-3 rounded-md">
                          <Form.Item
                            label="Artifact"
                            name={[name, "artifact"]}
                            rules={[
                              { required: true, message: "Select artifact" },
                            ]}
                            prefixCls="custom-form-label"
                          >
                            <Select placeholder="Select" className="h-12!">
                              <Select.Option value="mothers-gifts">
                                Mother’s Gifts
                              </Select.Option>
                              <Select.Option value="letters">
                                Letters
                              </Select.Option>
                            </Select>
                          </Form.Item>

                          {/* Item story */}
                          <Form.Item
                            label="What story do this item tell in exhibit?"
                            name={[name, "story"]}
                            rules={[{ required: true, message: "Enter story" }]}
                            prefixCls="custom-form-label"
                          >
                            <Input.TextArea
                              rows={4}
                              placeholder="Enter a story for your item"
                            />
                          </Form.Item>
                        </div>
                        {/* Remove */}
                        <button
                          type="button"
                          onClick={() => remove(name)}
                          className="text-base text-[#8A9078] hover:underline hidden md:block"
                        >
                          Remove
                        </button>
                      </div>
                      <div className="flex justify-end mt-3 md:hidden">
                        <button
                          type="button"
                          onClick={() => remove(name)}
                          className="text-[#8A9078] hover:underline font-medium text-base"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </Form.List>

          {isEditing ? (
            <div className="flex gap-4  mt-14!">
              <Button
                htmlType="submit"
                variant="primary"
                className="w-full h-12!"
              >
                Save Changes
              </Button>
              <Button
                onClick={() => router.back()}
                variant="outline"
                className="w-full h-12! text-black font-normal"
              >
                Return
              </Button>
            </div>
          ) : (
            <Button
              htmlType="submit"
              variant="primary"
              className="w-full h-12! mt-14!"
            >
              Save Exhibit
            </Button>
          )}
        </Form>
      </div>
    </div>
  );
};

export default CreateEditExhibitForm;

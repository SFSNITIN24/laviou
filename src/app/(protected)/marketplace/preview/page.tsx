import Button from "@/components/Button";
import Image from "next/image";
import homeImage from "@/assets/images/home.png";
import { Divider } from "antd";

const Preview = () => {
  return (
    <div className="py-6 md:py-11 w-full min-h-[calc(100vh-72px)] flex flex-col gap-6 md:gap-12">
      <div className="w-full text-center">
        <h1 className="text-[20px] md:text-[24px] leading-[120%]">
          This is a preview. Nothing has been published yet.
        </h1>
        <p className="text-base leading-[150%] mt-3 text-[#4D4D4D]">
          You can return to editing, or decide not to list this item.
        </p>
      </div>
      <div className="flex flex-col md:flex-row gap-8 md:gap-25">
        {/* Image */}
        <div className="w-full flex flex-col">
          <div className="relative w-full min-h-100 md:h-full md:flex-1">
            <Image
              src={homeImage.src}
              alt="Onboarding Image"
              className="rounded-lg object-cover"
              fill
              priority
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col w-full md:max-w-[50%]">
          <div className="flex flex-col gap-10">
            <div>
              <h1 className="text-[24px] md:text-[32px] leading-[120%]">
                Across Generations
              </h1>
              <p className="text-base leading-[150%] mt-1.5 text-[#8A9078]">
                By Sam Altman
              </p>

              <h3 className="text-[32px] leading-[120%]">$28.00</h3>
            </div>

            <div className="grid grid-cols-2 gap-8">
              <div>
                <span className="text-base text-[#4D4D4D] leading-[150%]">
                  Condition
                </span>
                <p className="font-medium text-lg leading-[120%]">Very Good</p>
              </div>
              <div>
                <span className="text-base text-[#4D4D4D] leading-[150%]">
                  Dimensions
                </span>
                <p className="font-medium text-lg leading-[120%]">
                  6 X 12 Inch&apos;s{" "}
                </p>
              </div>
              <div>
                <span className="text-base text-[#4D4D4D] leading-[150%]">
                  Materials
                </span>
                <p className="font-medium text-lg leading-[120%]">Wood</p>
              </div>
            </div>

            <Divider className="my-0! border-[#4D4D4D]!" prefixCls="custom-divider" />

            <div>
              <h4 className="text-[20px] leading-[120%] mb-2.5">
                Story this item told
              </h4>
              <p className="text-base leading-[150%]">
                Boba etiam ut bulla tea est potus dilectus singulari
                compositione saporum et textuum, quae in Taiwan annis 1980 orta
                sunt. Boba refert ad pilas masticas tapiocas in fundo potus
                inventas, quae typice lacte tea nigro sapiuntur. Boba
                phaenomenon.
              </p>
            </div>
          </div>

          <div className="mt-15 flex flex-col gap-3">
            <Button
              href="/sell-preparation"
              variant="outline"
              className="w-full h-12 text-black! font-normal!"
            >
              Edit details
            </Button>
            <Button
              href="/marketplace/confirmation"
              variant="outline"
              className="w-full h-12 text-black! font-normal!"
            >
              Publish Listing
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preview;

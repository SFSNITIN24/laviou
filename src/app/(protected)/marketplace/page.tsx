"use client";

import Image from "next/image";
import homeImage from "@/assets/images/home.png";
import Button from "@/components/Button";

const sellingRules = [
  "Selling is optional and deliberate",
  "You choose when and how to list",
  "Your item’s meaning remains part of its record",
  "There is no pressure to optimize for price",
];

const Marketplace = () => {
  return (
    <div className="flex flex-col-reverse md:flex-row gap-8 md:gap-25 py-6 md:py-11 w-full min-h-[calc(100vh-72px)]">
      {/* Content */}
      <div className="flex flex-col justify-between w-full md:max-w-110">
        <div className="flex flex-col gap-8">
          <div>
            <h1 className="text-[24px] md:text-[32px] leading-[120%]">
              Selling through Laviou is designed to be thoughtful, not fast.
            </h1>
            <p className="md:text-lg text-base leading-[140%] mt-3 text-[#4D4D4D]">
              Items are presented with their stories intact, and buyers are
              invited to approach them with care.
            </p>
          </div>
          <div>
            <h2 className="text-base md:text-[20px] leading-[120%] font-semibold">
              Set the rule by yourself
            </h2>
            <ul className="list-disc pl-5 mt-3">
              {sellingRules.map((rule, index) => (
                <li key={index} className="text-base leading-[150%]">
                  {rule}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="text-center w-full flex flex-col gap-3 max-md:mt-14">
          <i className="text-sm leading-[150%] text-[#8A9078]">
            You are not committing to anything by continuing.
          </i>
          <Button
            href="/sell-preparation"
            variant="outline"
            className="w-full h-12 text-black! font-normal!"
          >
            Continue preparing this item for sale
          </Button>
          <Button
            href="/museum"
            variant="outline"
            className="w-full h-12 text-black! font-normal!"
          >
            Return to My Museum
          </Button>
        </div>
      </div>

      {/* Image */}
      <div className="w-full flex flex-col">
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

export default Marketplace;

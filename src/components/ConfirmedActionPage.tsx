"use client";

import Image from "next/image";
import Button from "@/components/Button";
import React from "react";

type CommonSuccessLayoutProps = {
  card?: string | React.ReactNode;
  title: string;
  subtitle?: string;
  helperText?: string;
  buttonText?: string;
  buttonHref?: string;
};

const ConfirmedActionPage = ({
  card,
  title,
  subtitle,
  helperText,
  buttonText = "Return to My Museum",
  buttonHref = "/museum",
}: CommonSuccessLayoutProps) => {
  return (
    <div className="flex flex-col gap-8 md:gap-10 items-center justify-center text-center py-12.75 min-h-[calc(100vh-72px)]">
      {/* Card */}
      {card && typeof card === "string" ? (
        <Image
          src={card}
          alt="Card image"
          width={300}
          height={300}
          className="rounded-sm shadow-lg md:w-164.75 w-full md:h-95.5 h-full object-cover"
        />
      ) : (
        <div>{card}</div>
      )}

      {/* Text */}
      <div>
        <h2 className="text-2xl md:text-[32px] font-normal leading-[120%]">
          {title}
        </h2>

        {subtitle && (
          <p className="text-base md:text-[20px] leading-[120%] text-[#4D4D4D] mt-3">
            {subtitle}
          </p>
        )}
      </div>

      <div>
        {helperText && (
          <i className="text-sm text-[#8A9078] leading-[150%]">{helperText}</i>
        )}

        {/* Button */}
        <div className="mt-6">
          <Button
            href={buttonHref}
            variant="outline"
            className="text-black! font-normal! h-12 w-full max-w-85.5"
          >
            {buttonText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmedActionPage;

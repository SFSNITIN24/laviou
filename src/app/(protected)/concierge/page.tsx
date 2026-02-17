"use client";

import Button from "@/components/Button";
import Logo from "@/components/Logo";
import { useEffect, useState } from "react";

export default function ConciergeRequestsPage() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <div className="flex items-center justify-center text-center py-6">
      <div className="flex flex-col gap-10 items-center justify-center max-w-135 w-full">
        {/* Logo */}
        <div className="flex flex-col items-center gap-3 md:gap-5">
          <Logo
            width={isMobile ? "58px" : "94px"}
            height={isMobile ? "58px" : "94px"}
          />
          <h1 className="text-[49px]! md:text-[77px]! leading-[100%]">
            Laviou
          </h1>
        </div>

        {/* Content */}
        <div>
          <h3 className="leading-[120%] text-[24px] md:text-[32px]">
            Some decisions are easier with another person.
          </h3>

          <p className="text-[#4D4D4D] text-lg font-light mt-3 leading-[150%]">
            Laviou Concierge offers one-on-one support to help you think through
            next steps, at your pace.
          </p>

          <div className="flex flex-col gap-2.5 p-6 bg-[#F8F7F4] mt-6">
            <p className="text-base font-medium leading-[150%]">
              This is entirely optional.
            </p>
            <p className="text-base font-normal leading-[150%] text-[#4D4D4D]">
              Concierge support can help with valuation, donation options,
              gifting plans, or legacy documentation
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <i className="text-sm leading-[150%] text-[#8A9078]">
            You can continue without concierge at any time.
          </i>

          <Button variant="primary" className="md:w-117.25! w-full! h-12">
            Learn about concierge
          </Button>
          <Button variant="outline" className="w-117.25! h-12">
            Continue without concierge
          </Button>
        </div>
      </div>
    </div>
  );
}

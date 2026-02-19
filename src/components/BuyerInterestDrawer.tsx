import { useEffect, useState } from "react";
import { CloseIcon } from "@/utils/svg";
import Link from "antd/es/typography/Link";
import { Divider } from "antd";
import Button from "./Button";

const buyerInterestData = [
  { title: "Across Generations", time: "5 hrs" },
  { title: "Mother's Gifts", time: "12 hrs" },
  { title: "Across Generations", time: "5 Days" },
  { title: "Mother's Gifts", time: "6 Days" },
  { title: "Across Generations", time: "1 month" },
  { title: "Across Generations", time: "5 Days" },
  { title: "Across Generations", time: "5 Days" },
  { title: "Across Generations", time: "5 Days" },
];

export default function BuyerInterestDrawer({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  useEffect(() => {
    const openHandler = () => setOpen(true);

    window.addEventListener("open-buyer-interest", openHandler);

    return () => {
      window.removeEventListener("open-buyer-interest", openHandler);
    };
  }, []);
  return (
    <aside
      className={`fixed inset-y-0 right-0 z-60 w-full max-w-125 bg-[#F8F7F4]
        transform transition-transform duration-300 ease-in-out
        md:px-8.5 px-4 pb-8
        flex flex-col
        ${open ? "translate-x-0" : "translate-x-full"}`}
    >
      <div className="flex flex-col h-full w-full">
        {/* Header */}
        <div className="flex items-center justify-between mt-4.75 mb-4">
          <h2 className="font-heading font-bold text-lg md:text-[24px] leading-none">
            Buyer Interest
          </h2>

          <button onClick={() => setOpen(false)} className="cursor-pointer">
            <CloseIcon color="#8A9078" width={20} height={20} />
          </button>
        </div>

        <div className="flex flex-col gap-8 mt-3.75 w-full overflow-y-auto">
          {buyerInterestData.map((item, index) => (
            <div key={index}>
              <div className="flex justify-between gap-2 w-full">
                <h1 className="font-bold text-base leading-[150%]">
                  {item.title}
                </h1>
                <p className="font-normal text-sm leading-[150%] text-[#4D4D4D]">
                  {item.time}
                </p>
              </div>

              <p className="font-normal text-base leading-[150%]">
                Someone has expressed interest in this item.
              </p>
              <p className="font-normal text-xs leading-[140%]">
                There’s no need to respond right away.
              </p>
              <Button
                href="#"
                variant="outline"
                className="text-[#8A9078] w-fit border-none! text-sm mt-3"
              >
                View details
              </Button>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}

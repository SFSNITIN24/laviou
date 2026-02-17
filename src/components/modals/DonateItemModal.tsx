"use client";

import ModalComponent from "@/components/ModalComponent";
import Button from "../Button";
import { handleSettingListingType } from "@/lib/confirm-action";
import { usePathname, useRouter } from "next/navigation";

interface DonateItemModalProps {
  open: boolean;
  onClose: () => void;
}

export default function DonateItemModal({
  open,
  onClose,
}: DonateItemModalProps) {
  const pathname = usePathname();
  const router = useRouter();
  
  const handleConfirm = () => {
    handleSettingListingType("donate");
    console.log(pathname);
    router.push(
      `/${pathname?.split("/")[1]}/${pathname?.split("/")[2]}/confirmation`,
    );
  };

  return (
    <ModalComponent
      open={open}
      onClose={onClose}
      closable={false}
      mask={{ closable: false }}
    >
      <div
        className="
    w-[385px]
    h-auto
    p-6
    rounded-[20px]
    bg-white
    shadow-[6px_6px_29.9px_rgba(0,0,0,0.1)]
    flex flex-col gap-[24px]
    text-center
  "
      >
        <div className="flex flex-col gap-[12px]">
          <h2 className="font-heading text-2xl font-normal leading-[1.2] tracking-normal text-center text-[#1A1A1A]">
            Donate this Item
          </h2>

          <p className="font-body text-base font-normal leading-[1.5] tracking-normal text-center text-[#4D4D4D]">
            Prepare this item for donation?
          </p>
        </div>

        <div className="space-y-4">
          <Button
            variant="primary"
            className="w-full h-[48px]"
            onClick={handleConfirm}
          >
            Prepare for donation
          </Button>
          <Button
            variant="secondary"
            className="w-full h-[48px]"
            onClick={onClose}
          >
            Return
          </Button>
        </div>
      </div>
    </ModalComponent>
  );
}

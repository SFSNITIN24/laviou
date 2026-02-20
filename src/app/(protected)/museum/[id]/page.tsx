"use client";
import Image from "next/image";
import homeImage from "@/assets/images/home.png";
import Button from "@/components/Button";
import { useState } from "react";
import SellItemModal from "@/components/modals/SellItemModal";
import KeepItemModal from "@/components/modals/KeepItemModal";
import ArchiveItemModal from "@/components/modals/ArchiveItemModal";
import GiftItemModal from "@/components/modals/GiftItemModal";
import DonateItemModal from "@/components/modals/DonateItemModal";
import { useItem } from "@/features/items/hooks/useItems";
import { useParams } from "next/navigation";

const ArtifactDetails = () => {
  const params = useParams();
  const { data, isLoading, error } = useItem(params.id as string);
  const [modalStatus, setModalStatus] = useState({ status: false, action: "" });

  const dummyTags = ["During college", "Love"];

  const actions = ["keep", "gift", "donate", "sell", "archive"];

  if (isLoading) {
    return <div className="p-6">Loading museum...</div>;
  }
  if (error) {
    return <div className="p-6">Failed to load museum items.</div>;
  }

  return (
    <div className="flex flex-col md:flex-row gap-8 md:gap-12.5 py-8.5">
      <Image
        src={homeImage.src}
        alt="Onboarding Image"
        className="rounded-lg object-cover max-h-[calc(100vh-150px)] md:w-[50%] w-full"
        height={500}
        width={500}
        priority
      />
      <div>
        <div className="flex flex-col gap-8">
          <div>
            <h2 className="text-[32px] md:text-[40px] leading-[120%] mb-3">
              {data?.name}
            </h2>
            {/* Tags */}
            <div className="flex gap-1.5">
              {dummyTags.map((tag) => (
                <span
                  key={tag}
                  className="px-4 rounded-full bg-[#8A90784D] text-xs h-8 flex items-center justify-center"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <p className="leading-[160%] md:text-xl text-[#4D4D4D]">
            {data?.description}
          </p>

          <div className="flex md:flex-row flex-col gap-4">
            <Button variant="outline" className="w-full py-3">
              Return to My Museum
            </Button>
            <Button variant="outline" href="/exhibit/exhibit-permissions" className="w-full py-3 border-none!">
              Sharing & Permissions
            </Button>
          </div>
        </div>

        <div className="mt-20 md:mt-25 flex flex-col gap-8">
          <h3 className="text-[20px] md:text-[22px] font-medium leading-[160%] text-center">
            If and when you&apos;re ready, what would you like to do with this
            item?
          </h3>

          {/* Action buttons */}
          {actions.map((action) => (
            <Button
              key={action}
              variant="outline"
              className="w-full py-3 text-base font-normal! capitalize text-black"
              onClick={() => setModalStatus({ status: true, action })}
            >
              {action}
            </Button>
          ))}

          <div>
            <h3 className="text-lg leading-[160%] text-center mb-2">
              You don’t have to decide now.
            </h3>
            <p className="text-center leading-[160%] text-[#4D4D4D]">
              This item can remain here as long as you need.
            </p>
          </div>
        </div>
      </div>

      {modalStatus.action === "sell" && (
        <SellItemModal
          open={modalStatus.status}
          onClose={() => setModalStatus({ status: false, action: "" })}
        />
      )}

      {modalStatus.action === "keep" && (
        <KeepItemModal
          open={modalStatus.status}
          onClose={() => setModalStatus({ status: false, action: "" })}
        />
      )}

      {modalStatus.action === "archive" && (
        <ArchiveItemModal
          open={modalStatus.status}
          onClose={() => setModalStatus({ status: false, action: "" })}
        />
      )}

      {modalStatus.action === "gift" && (
        <GiftItemModal
          open={modalStatus.status}
          onClose={() => setModalStatus({ status: false, action: "" })}
        />
      )}

      {modalStatus.action === "donate" && (
        <DonateItemModal
          open={modalStatus.status}
          onClose={() => setModalStatus({ status: false, action: "" })}
        />
      )}
    </div>
  );
};

export default ArtifactDetails;

"use client";

import Button from "@/components/Button";
import ArchiveItemModal from "@/components/modals/ArchiveItemModal";
import DonateItemModal from "@/components/modals/DonateItemModal";
import GiftItemModal from "@/components/modals/GiftItemModal";
import KeepItemModal from "@/components/modals/KeepItemModal";
import SellItemModal from "@/components/modals/SellItemModal";
import Image from "next/image";
import { useState } from "react";
import homeImage from "@/assets/images/home.png";

const EXHIBIT_DATA = [
  {
    id: 1,
    title: "Mother’s Gifts",
    tags: ["During college", "Love"],
    description: `This collection explores the quiet spaces between memories, where the most profound reflections often reside. Each artifact chosen represents a moment of stillness and the weight of unspoken words. Silence is rarely empty. It is heavy with the things we chose not to say, the paths we decided not to take, and the faces we struggle to forget. Memory is a selective architect. It discards the mundane and reinforces the moments of high emotional contrast.`,
  },
  {
    id: 2,
    title: "Across Generations",
    tags: ["Private", "During college", "Love"],
    description: `This collection explores the quiet spaces between memories, where the most profound reflections often reside. Each artifact chosen represents a moment of stillness and the weight of unspoken words. Silence is rarely empty. It is heavy with the things we chose not to say, the paths we decided not to take, and the faces we struggle to forget. Memory is a selective architect. It discards the mundane and reinforces the moments of high emotional contrast.`,
  },
];

const ExhibitPage = () => {
  const [modalStatus, setModalStatus] = useState({
    status: false,
    action: "",
  });

  const actions = ["keep", "gift", "donate", "sell", "archive"];

  return (
    <div className="py-14">
      <div className="flex flex-col items-center justify-center w-full gap-4 md:gap-6">
        <div>
          <p className="text-xs md:text-base text-[#8A9078] leading-[150%] text-center">
            Some stories are meant to be experienced together.
          </p>
          <h3 className="text-[32px] md:text-[40px] leading-[120%] text-center">
            Exhibit Title
          </h3>
        </div>

        <h5 className="text-base md:text-lg leading-[150%] text-[#4D4D4D]">
          This collection explores the quiet spaces between memories
        </h5>

        <p className="leading-[150%] text-sm md:text-base text-[#8A8A8A] text-center">
          This collection explores the quiet spaces between memories, where the
          most profound reflections often reside. Each artifact chosen
          represents a moment of stillness and the weight of unspoken words.
        </p>
      </div>

      <div className="mt-14 md:mt-20 flex flex-col md:gap-30 gap-25">
        {EXHIBIT_DATA.map((item, index) => {
          const isEven = index % 2 === 0;

          return (
            <div
              key={item.id}
              className={`flex flex-col md:flex-row gap-8 md:gap-12.5 ${
                !isEven ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Image */}
              <Image
                src={homeImage.src}
                alt="Exhibit Item Image"
                className="rounded-lg object-cover max-h-[calc(100vh-150px)] md:w-[50%] w-full"
                height={500}
                width={500}
                priority
              />

              {/* Content */}
              <div className="md:w-[50%] flex flex-col gap-6">
                <div>
                  <h2 className="text-[32px] md:text-[40px] leading-[120%] mb-3">
                    {item.title}
                  </h2>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-4 rounded-full bg-[#8A90784D] text-xs h-8 flex items-center justify-center"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <p className="leading-[160%] md:text-xl text-[#4D4D4D] whitespace-pre-line">
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex md:flex-row flex-col gap-4 mt-12 md:mt-16 xl:max-w-[50%] mx-auto">
        <Button
          variant="outline"
          href="/museum"
          className="w-full py-3 text-black! font-normal"
        >
          Return to My Museum
        </Button>
        <Button
          variant="outline"
          href="/exhibit/edit-exhibit"
          className="w-full py-3 text-black! font-normal"
        >
          Edit Exhibit
        </Button>
        <Button
          variant="outline"
          href="/exhibit/exhibit-permissions"
          className="w-full py-3 border-none!"
        >
          Sharing & Permissions
        </Button>
      </div>

      <div className="mt-20 md:mt-25 flex items-center flex-col gap-8">
        <h3 className="text-[20px] md:text-[22px] font-medium leading-[160%] text-center">
          If and when you&apos;re ready, what would you like to do with this
          item?
        </h3>

        {/* Action buttons */}
        {actions.map((action) => (
          <Button
            key={action}
            variant="outline"
            className="w-full py-3 text-base font-normal! capitalize max-w-145.5 text-black"
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

export default ExhibitPage;

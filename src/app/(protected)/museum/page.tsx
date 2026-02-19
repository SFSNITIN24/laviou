"use client";

import { useEffect, useState } from "react";
import Button from "@/components/Button";
import { ButtonForwardButton, ButtonPreviousButton } from "@/utils/svg";
import { useItems } from "@/features/items/hooks/useItems";
import { useRouter } from "next/navigation";

interface Collection {
  id: string;
  title: string;
  description: string;
  image: string;
  itemCount: number;
}

const CARD_WIDTH = 346;
const GAP = 100;

export default function MuseumPage() {
  const router = useRouter()
  const { data, isLoading, error } = useItems(1);
  const collections: Collection[] =
    data?.data?.map((item) => ({
      id: item.id,
      title: item.name,
      description: item.description,
      image: item.imageUrl || "/api/placeholder/300/200",
      itemCount: 1,
    })) ?? [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(3);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      const count = Math.max(
        1,
        Math.floor((w - 80) / (CARD_WIDTH + GAP))
      );
      setCardsPerView(count);
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  /* ✅ safe visible slice */
  const visibleCollections = Array.from({
    length: Math.min(cardsPerView, collections.length),
  }).map((_, i) => collections[(currentIndex + i) % collections.length])

  if (isLoading) {
    return <div className="p-6">Loading museum...</div>;
  }
  if (error) {
    return <div className="p-6">Failed to load museum items.</div>;
  }

  const handlePrevious = () => {
    setCurrentIndex((p) =>
      p === 0 ? collections.length - 1 : p - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((p) =>
      p === collections.length - 1 ? 0 : p + 1
    );
  };


  return (
    <div className="w-full flex flex-col gap-16 py-[17px]">
      <div className="flex flex-col gap-5">

        <div className="flex flex-col gap-2">
          <h1 className="text-[40px] font-normal leading-[120%] text-center text-[#1A1A1A] font-heading">
            My Museum
          </h1>

          <p className="text-[16px] font-normal leading-[150%] text-center text-gray-600 font-body">
            Your museum remains private until you choose to share it.
          </p>

        </div>

        {/* Action Buttons */}
        <div className="flex flex-col items-center sm:flex-row justify-center gap-3">
          <Button
            href="/onboarding"
            variant="primary"
            className="w-[340px] sm:w-[260px] h-12!"
          >
            Add another item
          </Button>
          <Button
            variant="outline"
            className=" w-[340px] sm:w-[260px] h-12! text-black! font-normal!"
          >
            View an exhibit
          </Button>
        </div>
      </div>

      {/* Collections Section */}
      <div className="relative mx-0 sm:mx-5 ">


        {/* Collection Cards */}
        <div className="flex justify-center gap-6 lg:gap-[100px]">

          {visibleCollections?.length ? visibleCollections.map((collection) => (
            <div
              key={collection.id}
              onClick={() => router.push(`/museum/${collection.id}`)}
              className="w-[346px] h-[456px] bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow overflow-hidden flex flex-col"
            >
              {/* Image */}
              <div className="w-full h-[323px] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={collection.image}
                  alt={collection.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="h-[133px] py-4 px-3 flex flex-col gap-[10px]">
                <div className="flex flex-col gap-[6px]">
                  <h3 className="text-[20px] font-normal leading-[120%] text-[#1A1A1A] font-heading">
                    {collection.title}
                  </h3>

                  <p className="text-[14px] font-normal leading-[150%] text-gray-600 font-body line-clamp-1">
                    {collection.description}
                  </p>
                </div>

                <div className="mt-auto">
                  <Button variant="secondary" className="w-full h-10">
                    Sharing & permissions
                  </Button>
                </div>
              </div>
            </div>
          )) : (
            <div className="text-center text-gray-600">
              No items yet. Complete onboarding to add your first item.
            </div>
          )}
        </div>
        <div className="flex justify-center gap-4 mt-3">
          <button
            onClick={handlePrevious}
            className="
    w-[36px] h-[36px]
    p-[10px]
    rounded-[6px]
    border border-[#2E2E2C]
    bg-white
    flex items-center justify-center
    hover:bg-gray-50
     cursor-pointer
  "
          >
            <ButtonPreviousButton />
          </button>


          <button
            onClick={handleNext}
            className="
    w-[36px] h-[36px]
    p-[10px]
    rounded-[6px]
    border border-[#2E2E2C]
    bg-white
    flex items-center justify-center
    hover:bg-gray-50
    cursor-pointer
  "
          >
            <ButtonForwardButton />
          </button>

        </div>

      </div>
    </div>

  );
}

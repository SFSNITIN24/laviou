"use client";

import { useState } from "react";
import Button from "@/components/Button";
import { CameraCaptureButton } from "@/components/modals/CameraCaptureModal";
import Image from "next/image";
import homeImage from "@/assets/images/home.png";
import { useRouter } from "next/navigation";

const OnboardingPage = () => {
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const router = useRouter();

  const handleCapture = (file: File) => {
    console.log(file);
    const imageUrl = URL.createObjectURL(file);
    setCapturedImage(imageUrl);
  };

  const handleRemove = () => {
    if (capturedImage) {
      URL.revokeObjectURL(capturedImage);
    }
    setCapturedImage(null);
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 md:gap-25 py-6 md:py-11 w-full min-h-[calc(100vh-72px)]">
      {/* Image */}
      <div className="w-full md:w-[60%] flex flex-col">
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

      {/* Content */}
<div className="flex flex-col w-full md:w-[40%] flex-1">
        <div className="flex-1">
          <h2 className="text-2xl md:text-[32px] font-semibold text-black leading-[120%] text-center mb-6 md:mb-8">
            Capture one item that holds meaning for you.
          </h2>

          <div className="flex justify-center md:h-70 h-50 w-full">
            {!capturedImage ? (
              <CameraCaptureButton onCapture={handleCapture} />
            ) : (
              <div className="relative w-full h-full group">
                <Image
                  src={capturedImage}
                  alt="Captured item"
                  className="w-full h-full rounded-lg object-cover"
                  width={600}
                  height={600}
                />

                {/* Hover overlay (optional dim) */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg" />

                {/* Delete icon */}
                <button
                  onClick={handleRemove}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-10 h-10 rounded-full text-red-500 opacity-0 group-hover:opacity-50 hover:opacity-90 group-hover:bg-white/60 transition-all duration-200 ease-out hover:bg-red-500 hover:text-white cursor-pointer"
                  aria-label="Remove image"
                >
                  R
                </button>
              </div>
            )}
          </div>
        </div>

        <Button
          variant="primary"
          className="w-full h-12 mt-auto!"
          onClick={() => router.push("/onboarding/add-meaning")}
        >
          Continue when ready
        </Button>
      </div>
    </div>
  );
};

export default OnboardingPage;

"use client";
import ConfirmedActionPage from "@/components/ConfirmedActionPage";
import { confirmationTypeData } from "@/features/items/constant";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type ConfirmationType = keyof typeof confirmationTypeData;

const ConfirmationPage = () => {
  const router = useRouter();
  const { id } = useParams();
  const pathname = usePathname();

  const [type] = useState<string | null>(() => {
    if (typeof window === "undefined") return null;
    return sessionStorage.getItem("listingType");
  });

  const confirmationConfig =
    type && type in confirmationTypeData
      ? confirmationTypeData[type as ConfirmationType]
      : null;

  useEffect(() => {
    console.log(type, id, router);
    if (!type && id) {
      router.replace(`/${pathname?.split("/")[1]}/${id}`);
    }
  }, [type, id, router]);

  if (!type || !confirmationConfig) return null;

  return (
    <div>
      <ConfirmedActionPage
        card={null}
        title={confirmationConfig.title}
        subtitle={confirmationConfig.subtitle}
        helperText={confirmationConfig.helperText}
      />
    </div>
  );
};

export default ConfirmationPage;

"use client";

import ModalComponent from "@/components/ModalComponent";
import Button from "../Button";
import { useLogout } from "@/features/auth/hooks/useAuth";


interface LogoutModalProps {
  open: boolean;
  onClose: () => void;
}

export default function LogoutModal({ open, onClose }: LogoutModalProps) {
  const logout = useLogout();

  return (
    <ModalComponent open={open} onClose={onClose} closable={false} mask={{ closable: false }}>
      <div className="
    w-[385px]
    h-auto
    p-6
    rounded-[20px]
    bg-white
    shadow-[6px_6px_29.9px_rgba(0,0,0,0.1)]
    flex flex-col gap-[24px]
    text-center
  ">
        <div className="flex flex-col gap-[12px]">

          <h2 className="font-heading text-2xl font-normal leading-[1.2] tracking-normal text-center text-[#1A1A1A]">
            Logout
          </h2>

          <p className="font-body text-base font-normal leading-[1.5] tracking-normal text-center text-[#4D4D4D]">
            You're about to log out of your account
          </p>
        </div>

        <div className="space-y-4">
          <Button
            variant="secondary"
            className="w-full h-[48px]"
            onClick={async () => {
              try {
                await logout.mutateAsync();
              } finally {
                window.location.href = "/";
              }
            }}
          >
            {logout.isPending ? "Logging out..." : "Log out"}
          </Button>
          <Button variant="secondary" className="w-full h-[48px]" onClick={onClose}>
            Stay signed in
          </Button>
        </div>
      </div>
    </ModalComponent>
  );
}

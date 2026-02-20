"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import LogoutModal from "@/components/modals/LogoutModal";

export default function ProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const router = useRouter();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const menuItems = [
    { label: "My Profile", link: "/profile" },
    { label: "Change Password", link: "/change-password" },
    { label: "Draft", link: "/drafts" },
    { label: "My Donation", link: "/donation" },
    { label: "Concierge", link: "/concierge" },
    { label: "Archive", link: "/archive" },
  ];

  return (
    <div className="relative">
      {/* Profile Picture - Visible on both mobile and desktop */}
      <button
        onClick={() => {
          if (window.innerWidth >= 768) {
            // Desktop: toggle dropdown
            toggleDropdown();
          } else {
            // Mobile: toggle sidebar
            window.dispatchEvent(new CustomEvent("toggle-sidebar"));
          }
        }}
        className="flex items-center justify-center rounded-lg transition-colors cursor-pointer w-[44px] h-[44px]"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face"
          alt="Profile"
          className="w-[36px] h-[36px] rounded-full object-cover"
        />
      </button>

      {/* Dropdown Menu - Only on desktop */}
      {isOpen && (
        <div
          className="
    absolute right-0 mt-2
    w-[175px]
    bg-white/90
    rounded-xl
    border border-gray-200
    p-3
    z-50
    md:block hidden
    backdrop-blur-[30px]
    shadow-[-0.27px_-0.27px_1.09px_rgba(255,255,255,0.4)_inset,0px_4.35px_21.75px_rgba(0,0,0,0.1)]
  "
        >
          {menuItems?.map((item, index) => (
            <span
              key={index}
              onClick={() => {
                router.push(item.link);
                setIsOpen(false);
              }}
              className="
        flex items-center gap-[5px]
        w-[151px] h-[37px]
        px-[6px] py-2
        rounded-md
        font-body text-sm font-normal leading-[1.5] tracking-normal
        text-gray-700
        hover:bg-gray-50
        transition-colors
        cursor-pointer
      "
            >
              {item.label}
            </span>
          ))}

          {/* Divider */}
          <div className="border-t border-gray-200 my-2" />

          {/* Logout */}
          <span
            className="
      flex items-center gap-[5px]
      w-[151px] h-[37px]
      px-[6px] py-2
      rounded-md
      font-body text-sm font-normal leading-[1.5]
      text-red-600
      hover:bg-red-50
      transition-colors
    "
            onClick={(e) => {
              e.preventDefault();
              setIsOpen(false);
              setIsLogoutModalOpen(true);
            }}
          >
            Logout
          </span>
        </div>
      )}

      {/* Overlay to close dropdown when clicking outside - Only on desktop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 md:block hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Logout Modal */}
      <LogoutModal
        open={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
      />
    </div>
  );
}

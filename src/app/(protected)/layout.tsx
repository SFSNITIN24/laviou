"use client";

import Logo from "@/components/Logo";
import { CloseIcon } from "@/utils/svg";
import { useState, useEffect } from "react";
import LogoutModal from "@/components/modals/LogoutModal";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  useEffect(() => {
    const handleToggleSidebar = () => {
      setIsSidebarOpen((prev) => !prev);
    };

    window.addEventListener("toggle-sidebar", handleToggleSidebar);
    return () =>
      window.removeEventListener("toggle-sidebar", handleToggleSidebar);
  }, []);

  return (
    <>
      {/* Mobile Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-[60] w-64 bg-[#8A9078]
        transform transition-transform duration-300 ease-in-out
        md:hidden pt-[24px] px-[16px] pb-[32px]
        flex flex-col
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <nav className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-[9px]">
              <Logo width="30px" height="30px" color="white" />
              <h2 className="font-heading font-normal text-[36px] leading-none text-white">
                Laviou
              </h2>
            </div>

            <button
              onClick={() => setIsSidebarOpen(false)}
              className="cursor-pointer"
            >
              <CloseIcon color="white" width={16} height={16} />
            </button>
          </div>

          {/* Menu Items */}
          <div className="space-y-2">
            {[
              { href: "/dashboard", label: "Dashboard" },
              { href: "/items", label: "Items" },
              { href: "/concierge", label: "Concierge" },
              { href: "/settings", label: "Settings" },
              { href: "/sharing", label: "Sharing" },
            ]?.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="
                  flex items-center gap-[6px]
                  w-[210px] h-[37px]
                  px-[6px] py-2
                  rounded-md
                  font-body text-sm font-normal leading-[1.5]
                  text-white
                  hover:bg-white/20
                  transition-colors
                "
                onClick={() => setIsSidebarOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Logout — pinned to bottom */}
          <div className="mt-auto border-t border-white/20 pt-3">
            <a
              href="#"
              className="
                flex items-center gap-[6px]
                w-[210px] h-[37px]
                px-[6px] py-2
                rounded-md
                font-body text-sm font-normal leading-[1.5]
                text-white
                hover:bg-white/20
                transition-colors
              "
              onClick={(e) => {
                e.preventDefault();
                setIsSidebarOpen(false);
                setIsLogoutModalOpen(true);
              }}
            >
              Logout
            </a>
          </div>
        </nav>
      </aside>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 backdrop-blur-[5.1px] z-50 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Logout Modal */}
      <LogoutModal open={isLogoutModalOpen} onClose={() => setIsLogoutModalOpen(false)} />

      {/* Main content */}
      <div className={`${isSidebarOpen ? "overflow-hidden max-h-screen" : ""}`}>
        {children}
      </div>
    </>
  );
}

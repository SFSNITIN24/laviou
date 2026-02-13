import React from "react";
import ProfileDropdown from "@/components/ProfileDropdown";
import Button from "@/components/Button";
import Logo from "./Logo";
import { ChevronLeftIcon } from "@/utils/svg";

interface AppLayoutProps {
  children: React.ReactNode;
  variant?: "default" | "auth" | "minimal" | "user";
  title?: string;
  subtitle?: string;
  showHomeLink?: boolean;
  showAuthSwitch?: boolean;
  authSwitchText?: string;
  authSwitchLink?: string;
  showFooter?: boolean;
  footerText?: string;
  // Auth header props
  authLeftTitle?: string;
  authLeftLink?: string;
  authRightText?: string;
  authRightSwitchText?: string;
  authRightSwitchLink?: string;
}

export default function AppLayout({
  children,
  variant = "default",
  title,
  subtitle,
  showFooter = true,
  footerText = "Copyright 2026 Laviou. All rights Reserved",
  authLeftTitle,
  authLeftLink,
  authRightText,
  authRightSwitchText,
  authRightSwitchLink,
}: AppLayoutProps) {
  // Render different header based on variant
  const renderHeader = () => {
    switch (variant) {
      case "auth":
        return (
          <div className="flex items-center justify-between px-8 py-6">
            {/* Left side - Title and Navigation Link */}
            <div className="flex items-center gap-[12px] cursor-pointer">
              {authLeftTitle && authLeftLink && (
                <a
                  href={authLeftLink}
                  className="flex items-center gap-[12px] cursor-pointer"
                >
                  <ChevronLeftIcon width={24} height={24} />
                  <span className="font-semibold text-sm leading-[1.5] tracking-normal text-center text-[#1A1A1A]">
                    {authLeftTitle}
                  </span>
                </a>
              )}
            </div>

            {/* Right side - Text and Link */}
            <div className="flex items-center space-x-1">
              {authRightText && (
                <span className="text-gray-600">{authRightText}</span>
              )}
              {authRightSwitchText && authRightSwitchLink && (
                <a
                  href={authRightSwitchLink}
                  className="text-sm font-normal leading-[1.5] tracking-normal text-center text-[#8A9078]"
                >
                  {authRightSwitchText}
                </a>
              )}
            </div>
          </div>
        );

      case "minimal":
        return (
          <div className="flex items-center justify-between px-8 py-6">
            <div className="flex items-center gap-[9px] my-[5px]">
              <Logo width="30px" height="30px" />
              <h2 className="font-normal text-[#8A9078] text-[36px] leading-none tracking-normal">
                Laviou
              </h2>
            </div>
          </div>
        );

      case "user":
        return (
          <header className="bg-white px-4 sm:px-[40px] py-[16px] gap-[10px] border-b-[1px] border-[#E9E7E2] h-[72px]">
            <div className="flex items-center justify-between h-full">
              {/* Logo */}
              <div className="flex items-center gap-[7px] md:gap-[9px] my-[5px]">
                <Logo width="30px" height="30px" />
                <h2 className="font-heading font-normal text-[28.61px] leading-none tracking-normal text-[#8A9078] md:text-[36px]">
                  Laviou
                </h2>
              </div>

              {/* Navigation */}

              <nav className="flex items-center space-x-4">
                <ProfileDropdown />
              </nav>
            </div>
          </header>
        );

      case "default":
      default:
        return (
          <header className="bg-white px-4 sm:px-[40px] py-[16px] gap-[10px] border-b-[1px] border-[#E9E7E2] h-[72px]">
            <div className="flex items-center justify-between h-full">
              {/* Logo */}
              <div className="flex items-center gap-[7px] md:gap-[9px] my-[5px]">
                <Logo width="30px" height="30px" />
                <h2 className="font-heading font-normal text-[28.61px] leading-none tracking-normal text-[#8A9078] md:text-[36px]">
                  Laviou
                </h2>
              </div>

              {/* Navigation */}
              <nav className="flex items-center space-x-4">
                <Button
                  href="/login"
                  variant="primary"
                  className="w-[76px] sm:w-[148px] !h-[40px] p-[8px]"
                >
                  Login
                </Button>
                <Button
                  href="/register"
                  variant="secondary"
                  className="w-[76px] sm:w-[148px] !h-[40px] p-[8px]"
                >
                  Sign Up
                </Button>
              </nav>
            </div>
          </header>
        );
    }
  };

  // Render different main content based on variant
  const renderMain = () => {
    switch (variant) {
      case "auth":
        return (
          <main className="flex-1 flex flex-col gap-[32px] items-center justify-center max-w-[420px] w-full mx-auto px-4 sm:px-0 min-w-[342px]">
            {/* Logo and Title */}
            <Logo width="126px" height="126px" />
            {(title || subtitle) && (
              <div className="flex items-center flex-col text-center w-full">
                {title && (
                  <h3 className="font-heading text-2xl font-normal leading-[1.2] tracking-normal text-center text-[#1A1A1A] mb-3">
                    {title}
                  </h3>
                )}
                {subtitle && (
                  <p className="font-body text-base font-normal leading-[1.5] tracking-normal text-center text-gray-600">
                    {subtitle}
                  </p>
                )}
              </div>
            )}

            {/* Form Content */}
            <div className="w-full">{children}</div>
          </main>
        );

      case "minimal":
        return (
          <main className="flex-1 flex items-center justify-center px-4 sm:px-0">
            {children}
          </main>
        );

      case "default":
      default:
        return (
          <main className="flex-1 flex items-center justify-center px-4 sm:px-0">
            {children}
          </main>
        );
    }
  };

  // Render different footer based on variant
  const renderFooter = () => {
    if (!showFooter) return null;

    switch (variant) {
      case "auth":
        return (
          <footer className="text-center py-6 text-sm text-gray-500">
            {footerText}
          </footer>
        );

      case "minimal":
        return (
          <footer className="text-center py-6 text-sm text-gray-500">
            {footerText}
          </footer>
        );

      case "default":
      default:
        return (
          <footer>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <div className="font-normal italic text-xs leading-[1.4] tracking-normal text-center text-[#4D4D4D]">
                {footerText}
              </div>
            </div>
          </footer>
        );
    }
  };

  // Determine background class based on variant
  const getBackgroundClass = () => {
    switch (variant) {
      case "auth":
        return "bg-orange-50";
      case "minimal":
        return "bg-gray-50";
      case "default":
      default:
        return "bg-white";
    }
  };

  return (
    <div
      className={`${getBackgroundClass()} ${variant === "auth" || variant === "default" ? "min-h-screen flex flex-col" : "min-h-screen"}`}
    >
      {renderHeader()}
      {renderMain()}
      {renderFooter()}
    </div>
  );
}

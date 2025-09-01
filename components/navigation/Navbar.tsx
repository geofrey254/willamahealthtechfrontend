"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/upload", label: "Upload" },
  { href: "#", label: "History" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="bg-[#214842] border-b border-gray-700 sticky top-0 z-40 shadow-lg backdrop-blur-sm">
      <div className="container mx-auto px-6">
        <div className="flex h-18 items-center justify-between">
          {/* Medical-themed Logo Section */}
          <div className="flex items-center">
            <Link
              href="/"
              className="group flex items-center space-x-4 transition-all duration-300 hover:scale-105"
            >
              {/* Medical Cross + Document Icon */}
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-[#f4d392] to-[#e6c066] rounded-xl flex items-center justify-center shadow-xl transform transition-all duration-300 group-hover:rotate-3 group-hover:shadow-2xl">
                  {/* Stethoscope + Document Combined Icon */}
                  <svg
                    className="w-7 h-7 text-[#214842]"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M19,19H5V5H19V19M17,17H7V15H17V17M17,13H7V11H17V13M17,9H7V7H17V9Z" />
                    {/* Medical cross overlay */}
                    <circle cx="18" cy="6" r="3" fill="currentColor" />
                    <path
                      d="M18,4.5V7.5M16.5,6H19.5"
                      stroke="#214842"
                      strokeWidth="0.8"
                      fill="none"
                    />
                  </svg>
                </div>
                {/* Pulse animation ring */}
                <div className="absolute inset-0 w-12 h-12 bg-[#f4d392] rounded-xl opacity-20 animate-ping"></div>
                {/* Glow effect */}
                <div className="absolute inset-0 w-12 h-12 bg-[#f4d392] rounded-xl opacity-30 blur-lg group-hover:opacity-50 transition-opacity"></div>
              </div>

              {/* Enhanced Medical Brand */}
              <div className="flex flex-col">
                <h1 className="relative">
                  <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#f4d392] via-white to-[#f4d392] tracking-wide">
                    DOC
                  </span>
                  <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-[#f4d392] to-white tracking-wide">
                    ME
                  </span>
                  {/* Medical heartbeat line */}
                  <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#f4d392] to-transparent opacity-70">
                    <div className="absolute inset-0 bg-[#f4d392] animate-pulse"></div>
                  </div>
                </h1>
                <div className="flex items-center space-x-1 -mt-0.5">
                  <span className="text-xs text-[#f4d392]/80 font-bold tracking-[0.2em]">
                    MEDICAL REPORT
                  </span>
                  <div className="w-1 h-1 bg-[#f4d392] rounded-3xl animate-pulse"></div>
                  <span className="text-xs text-[#f4d392]/80 font-bold tracking-[0.2em]">
                    ANALYZER
                  </span>
                </div>
              </div>
            </Link>
          </div>

          {/* Enhanced Medical Navigation */}
          <nav className="flex items-center space-x-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative px-5 py-2.5 text-sm font-bold transition-all duration-300 rounded-xl group overflow-hidden",
                    isActive
                      ? "text-[#214842] bg-[#f4d392] shadow-lg shadow-[#f4d392]/25 scale-105"
                      : "text-white hover:text-[#214842] hover:bg-[#f4d392]/90 hover:shadow-lg hover:scale-105"
                  )}
                >
                  {/* Content */}
                  <span className="relative z-20 flex items-center space-x-2">
                    {/* Medical icons for each nav item */}
                    {item.href === "/" && (
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z" />
                      </svg>
                    )}
                    {item.href === "/upload" && (
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20M12,11L16,15H13V19H11V15H8L12,11Z" />
                      </svg>
                    )}
                    {item.href === "#" && (
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M13.5,8H12V13L16.28,15.54L17,14.33L13.5,12.25V8M13,3A9,9 0 0,0 4,12H1L4.96,16.03L9,12H6A7,7 0 0,1 13,5A7,7 0 0,1 20,12A7,7 0 0,1 13,19C11.07,19 9.32,18.21 8.06,16.94L6.64,18.36C8.27,20 10.5,21 13,21A9,9 0 0,0 22,12A9,9 0 0,0 13,3" />
                      </svg>
                    )}
                    <span>{item.label}</span>
                  </span>

                  {/* Active state background with medical cross pattern */}
                  {isActive && (
                    <>
                      <div className="absolute inset-0 bg-[#f4d392] rounded-xl"></div>
                      <div className="absolute inset-0 bg-gradient-to-r from-[#f4d392] to-[#e6c066] rounded-xl animate-pulse opacity-30"></div>
                    </>
                  )}

                  {/* Hover effect with medical theme */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#f4d392]/20 via-[#f4d392]/40 to-[#f4d392]/20 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110"></div>

                  {/* Medical pulse effect on hover */}
                  <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-[#f4d392] group-hover:w-4/5 group-hover:left-[10%] transition-all duration-500 rounded-full">
                    <div className="absolute inset-0 bg-[#f4d392] animate-pulse rounded-full"></div>
                  </div>
                </Link>
              );
            })}

            {/* Medical status indicator */}
            <div className="ml-4 flex items-center space-x-2">
              <div className="w-2 h-2 bg-[#f4d392] rounded-full animate-pulse"></div>
              <span className="text-xs text-[#f4d392]/70 font-medium">
                SYSTEM ACTIVE
              </span>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}

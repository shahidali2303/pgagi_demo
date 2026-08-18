"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, TrendingUp, Heart, Settings, X } from "lucide-react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { toggleSidebar } from "@/store/slices/uiSlice";

const navItems = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Trending", href: "/trending", icon: TrendingUp },
  { name: "Favorites", href: "/favorites", icon: Heart },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const isOpen = useAppSelector((state) => state.ui.isSidebarOpen);
  const dispatch = useAppDispatch();
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/70 backdrop-blur-sm lg:hidden transition-opacity duration-300"
          onClick={() => dispatch(toggleSidebar())}
        />
      )}

      {/* Sidebar Container */}
      <aside
        // Added transition-colors duration-300 ease-in-out
        className={`fixed inset-y-0 left-0 z-30 w-64 transform bg-white dark:bg-bg-surface border-r border-slate-200 dark:border-border-base transition-all duration-300 ease-in-out lg:translate-x-0 lg:static lg:z-auto ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Logo / Header */}
          <div className="flex h-16 items-center justify-between px-6 border-b border-slate-200 dark:border-border-base">
            <h1 className="text-xl font-bold text-slate-900 dark:text-text-primary">
              MyDash
            </h1>
            <button
              onClick={() => dispatch(toggleSidebar())}
              className="lg:hidden text-slate-500 hover:text-slate-900 dark:text-text-secondary dark:hover:text-text-primary"
            >
              <X size={24} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-2 px-4 py-6">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-slate-100 text-slate-900 dark:bg-accent-base/20 dark:text-text-primary dark:border dark:border-accent-base/30"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-text-secondary dark:hover:bg-bg-base dark:hover:text-text-primary"
                  }`}
                >
                  <item.icon size={20} />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>
    </>
  );
}

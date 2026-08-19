"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  TrendingUp,
  Heart,
  Settings,
  X,
  LogOut,
  Languages,
} from "lucide-react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { toggleSidebar } from "@/store/slices/uiSlice";
import { logout } from "@/store/slices/authSlice";
import { useTranslation } from "react-i18next";

export function Sidebar() {
  const { t, i18n } = useTranslation();
  const isOpen = useAppSelector((state) => state.ui.isSidebarOpen);
  const dispatch = useAppDispatch();
  const pathname = usePathname();

  const navItems = [
    { name: t("nav.dashboard"), href: "/", icon: Home },
    { name: t("nav.trending"), href: "/trending", icon: TrendingUp },
    { name: t("nav.favorites"), href: "/favorites", icon: Heart },
    { name: t("nav.settings"), href: "/settings", icon: Settings },
  ];

  const handleLogout = () => {
    dispatch(logout());
  };

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "es" : "en";
    i18n.changeLanguage(newLang);
  };

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
        className={`fixed inset-y-0 left-0 z-30 w-64 transform bg-white dark:bg-bg-surface border-r border-slate-200 dark:border-border-base transition-all duration-300 ease-in-out lg:translate-x-0 lg:static lg:z-auto ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Logo / Header */}
          <div className="flex h-16 items-center justify-between px-6 border-b border-slate-200 dark:border-border-base">
            <h1 className="text-xl font-bold text-slate-900 dark:text-text-primary">
              PGAGI DEMO
            </h1>
            <button
              onClick={() => dispatch(toggleSidebar())}
              className="lg:hidden text-slate-500 hover:text-slate-900 dark:text-text-secondary dark:hover:text-text-primary"
              aria-label="Close sidebar"
            >
              <X size={24} />
            </button>
          </div>

          {/* Navigation  */}
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
                  <item.icon size={20} aria-hidden="true" />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Bottom Section */}
          <div className="border-t border-slate-200 dark:border-border-base p-4 space-y-1.5">
            {/* Language Toggler */}
            <button
              onClick={toggleLanguage}
              className="group flex w-full items-center justify-between gap-3 cursor-pointer rounded-lg px-4 py-3 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-text-secondary dark:hover:bg-bg-base dark:hover:text-text-primary transition-all duration-200"
              aria-label="Toggle Language"
            >
              <span className="flex items-center gap-3">
                <Languages
                  size={20}
                  aria-hidden="true"
                  className="text-slate-400 group-hover:text-slate-600 dark:text-text-secondary dark:group-hover:text-text-primary transition-colors"
                />
                {i18n.language === "en" ? "English" : "Español"}
              </span>
              <span className="rounded-md bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-500 dark:bg-bg-base dark:text-text-secondary">
                {i18n.language === "en" ? "EN" : "ES"}
              </span>
            </button>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="group flex w-full items-center gap-3 cursor-pointer rounded-lg px-4 py-3 text-sm font-medium text-red-500 bg-red-50/60 hover:bg-red-100 dark:text-red-400 dark:bg-red-500/10 dark:hover:bg-red-500/20 transition-all duration-200"
              aria-label="Logout"
            >
              <LogOut
                size={20}
                aria-hidden="true"
                className="text-red-500 dark:text-red-400 transition-transform duration-200 group-hover:translate-x-0.5"
              />
              {t("header.logout") || "Logout"}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

"use client";

import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { useDarkMode } from "@/hooks/useDarkMode";
import { PageTransition } from "@/components/ui/PageTransition";
import { ToastContainer } from "@/components/ui/ToastContainer";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  useDarkMode();

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-bg-base text-slate-900 dark:text-text-primary transition-colors duration-300 ease-in-out">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <PageTransition>{children}</PageTransition>
        </main>
      </div>
      <ToastContainer />
    </div>
  );
}

"use client";

import { useAppSelector } from "@/store/hooks";
import { LoginPage } from "./LoginPage";
import { DashboardLayout } from "@/components/layout/DashboardLayout";

export function AuthWrapper({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  // If not authenticated, show the login screen
  if (!isAuthenticated) {
    return <LoginPage />;
  }

  // If authenticated, show the main dashboard layout
  return <DashboardLayout>{children}</DashboardLayout>;
}

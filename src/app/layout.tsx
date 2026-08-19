import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StoreProvider from "@/components/providers/StoreProvider";
import { DashboardLayout } from "@/components/layout/DashboardLayout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Personalized Content Dashboard",
  description: "Track and interact with your favorite content dynamically.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // suppressHydrationWarning prevents errors from browser extensions (like Grammarly)
    // and from the theme class changing before React hydrates.
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} antialiased transition-colors duration-300 ease-in-out`}
        suppressHydrationWarning
      >
        <StoreProvider>
          <DashboardLayout>{children}</DashboardLayout>
        </StoreProvider>
      </body>
    </html>
  );
}

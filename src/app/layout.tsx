import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StoreProvider from "@/components/providers/StoreProvider";
import { I18nProvider } from "@/components/providers/I18nProvider";
import { AuthWrapper } from "@/components/auth/AuthWrapper"; // Import the new wrapper

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
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} antialiased transition-colors duration-300 ease-in-out`}
        suppressHydrationWarning
      >
        <StoreProvider>
          <I18nProvider>
            {/* AuthWrapper handles the client-side routing logic */}
            <AuthWrapper>{children}</AuthWrapper>
          </I18nProvider>
        </StoreProvider>
      </body>
    </html>
  );
}

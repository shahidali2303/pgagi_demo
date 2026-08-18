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
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const storedTheme = localStorage.getItem('persist:root');
                if (storedTheme) {
                  try {
                    const parsed = JSON.parse(storedTheme);
                    const uiState = JSON.parse(parsed.ui);
                    if (uiState.isDarkMode) {
                      document.documentElement.classList.add('dark');
                    }
                  } catch (e) {
                    console.error('Error parsing theme:', e);
                  }
                }
              })();
            `,
          }}
        />
      </head>
      {/* Added transition-colors duration-300 ease-in-out */}
      <body
        className={`${inter.className} antialiased transition-colors duration-300 ease-in-out`}
      >
        <StoreProvider>
          <DashboardLayout>{children}</DashboardLayout>
        </StoreProvider>
      </body>
    </html>
  );
}

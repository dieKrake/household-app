import type { Metadata } from "next";
import "./globals.css";
import { inter } from "@/ui/fonts";
import ConfigureAmplifyClientSide from "./amplify-cognito-config";
import ThemeContextProvider from "@/context/theme-context";
import ThemeSwitch from "@/components/theme-switch";
import { ActivityProvider } from "@/context/activity-context";
import SaveButton from "@/components/SaveButton";

export const metadata: Metadata = {
  title: "Next.js Cognito Authentication",
  description: "Cognito authenticated Next.js app.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="!scroll-smooth">
      <body
        className={`${inter.className} text-gray-950 relative dark:bg-dark dark:text-gray-50 dark:text-opacity-90 bg-gray-200`}
      >
        <>
          <ConfigureAmplifyClientSide />
          <ThemeContextProvider>
            <ActivityProvider>{children}</ActivityProvider>
            <ThemeSwitch />
          </ThemeContextProvider>
        </>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";
import { inter } from "@/ui/fonts";
import ConfigureAmplifyClientSide from "./amplify-cognito-config";
import ThemeContextProvider from "@/context/theme-context";
import ThemeSwitch from "@/components/theme-switch";
import { ActivitiesProvider } from "@/context/activities-context";
import { EditingProvider } from "@/context/edit-context";
import { ActivityProvider } from "@/context/selected-activity-context";
import { AddingProvider } from "@/context/adding-activity-context";
import { UserProvider } from "@/context/user-context";

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
          <UserProvider>
            <ConfigureAmplifyClientSide />
            <ThemeContextProvider>
              <ActivitiesProvider>
                <ActivityProvider>
                  <AddingProvider>
                    <EditingProvider>{children}</EditingProvider>
                  </AddingProvider>
                </ActivityProvider>
              </ActivitiesProvider>
              <ThemeSwitch />
            </ThemeContextProvider>
          </UserProvider>
        </>
      </body>
    </html>
  );
}

"use client";

import AcmeLogo from "@/ui/acme-logo";
import { motion } from "framer-motion";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex items-center justify-center md:h-screen dark:bg-dark bg-gray-200">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        {children}
      </div>
    </main>
  );
}

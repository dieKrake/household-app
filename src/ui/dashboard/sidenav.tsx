"use client";

import Link from "next/link";
import NavLinks from "@/ui/dashboard/nav-links";
import AcmeLogo from "@/ui/acme-logo";
import LogoutForm from "@/ui/dashboard/logout-form";
import { motion } from "framer-motion";

export default function SideNav() {
  return (
    <motion.div
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      transition={{
        delay: 0.1,
        type: "spring",
        stiffness: 150,
        damping: 19,
      }}
      className="flex h-full flex-col px-3 py-4 md:px-2"
    >
      <Link
        className="mb-2 flex h-20 items-end justify-start rounded-md bg-semiDark dark:bg-gray-900 p-4 md:h-40 shadow-xl"
        href="/dashboard"
      >
        <div className="w-32 text-white md:w-40">
          <AcmeLogo />
        </div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden dark:opacity-100 opacity-40  h-auto w-full grow rounded-md bg-gray-50 dark:bg-gray-900 md:block shadow-xl"></div>
        <LogoutForm />
      </div>
    </motion.div>
  );
}

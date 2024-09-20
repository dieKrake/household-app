"use client";

import { PowerIcon } from "@heroicons/react/24/outline";

import { handleSignOut } from "@/lib/cognitoActions";

export default function LogoutForm() {
  return (
    <form action={handleSignOut}>
      <button className="flex h-[48px] w-full grow items-center dark:text-gray-50 justify-center gap-2 rounded-md dark:bg-gray-900 bg-gray-50 p-3 text-sm font-medium hover:bg-semiDark dark:hover:bg-semiLight hover:text-white dark:hover:text-gray-950  md:flex-none md:justify-start md:p-2 md:px-3 transition-colors duration-300 shadow-xl">
        <PowerIcon className="w-6" />
        <div className="hidden md:block">Sign Out</div>
      </button>
    </form>
  );
}

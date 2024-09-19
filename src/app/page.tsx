import AcmeLogo from "@/ui/acme-logo";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Image from "next/image";

export default function Page() {
  return (
    <main className="relative overflow-hidden">
      {/* Logo Container */}
      <div className="bg-semiDark dark:bg-gray-900 absolute top-0 left-0 right-0 z-10 pt-4 pb-4 pl-2 sm:pt-6 sm:pb-6 sm:pl-5">
        <AcmeLogo />
      </div>

      {/* Haupt Inhalt Container */}
      <div className="flex min-h-screen">
        {/* Link und Text Container */}
        <div className="bg-gray-200 dark:bg-semiDark flex flex-none flex-col justify-center items-center sm:w-96 w-36 px-4 sm:px-0">
          <p className="sm:text-3xl text-lg">
            <strong>Welcome to Acme.</strong>
          </p>
          <Link
            href="/auth/login"
            className="bg-semiDark dark:bg-dark text-white flex items-center sm:py-4 sm:px-6 p-2 rounded-xl py-2 px-4 sm:rounded-3xl sm:mt-6 mt-2 sm:text-2xl text-sm -ml-3 sm:ml-0 dark:hover:bg-gray-900 hover:bg-dark transition-colors duration-300"
          >
            <div>Login</div>
            <ArrowRightIcon className="text-white h-5 w-5 ml-4 mr-2 sm:ml-5 sm:mr-2 " />
          </Link>
        </div>

        {/* Bild Container */}
        <div className="flex justify-center items-center flex-1 dark:bg-semiDark bg-gray-200">
          <Image
            src="/hero-desktop.png"
            width={1000}
            height={760}
            className="hidden md:block"
            alt="Screenshots of the dashboard project showing desktop version"
          />
          <Image
            src="/hero-mobile.png"
            width={560}
            height={620}
            className="block md:hidden"
            alt="Screenshots of the dashboard project showing mobile version"
          />
        </div>
      </div>
    </main>
  );
}

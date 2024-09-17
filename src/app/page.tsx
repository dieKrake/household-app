import AcmeLogo from "@/ui/acme-logo";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Image from "next/image";

export default function Page() {
  return (
    <main className="relative overflow-hidden">
      {/* Logo Container */}
      <div className="bg-oceanSemiDark dark:bg-gray-900 absolute top-0 left-0 right-0 z-10">
        <AcmeLogo />
      </div>

      {/* Haupt Inhalt Container */}
      <div className="bg-yellow-400 flex min-h-screen">
        {/* Link und Text Container */}
        <div className="bg-orange-600 flex-1 flex flex-col justify-center items-center">
          <p className="text-2xl">
            <strong>Welcome to Acme.</strong>
          </p>
          <Link
            href="/auth/login"
            className="bg-red-600 flex items-center p-2 rounded-lg mt-6"
          >
            <span>Log in</span>
            <ArrowRightIcon className="bg-red-900 h-5 w-5 ml-12" />
          </Link>
        </div>

        {/* Bild Container */}
        <div className="flex-1 flex justify-center items-center">
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

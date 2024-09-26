"use client";
import { FaHome, FaTasks, FaRunning, FaStar } from "react-icons/fa";
import { FaKitchenSet } from "react-icons/fa6";
import useAuthUser from "@/app/hooks/use-auth-user";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

export default function NavLinks() {
  const user = useAuthUser();
  const links = [
    { id: 1, name: "Home", href: "/dashboard", icon: FaHome },
    {
      id: 2,
      name: "Tasks",
      href: "/dashboard/tasks",
      icon: FaTasks,
    },
    { id: 3, name: "Kitchen", href: "/dashboard/kitchen", icon: FaKitchenSet },
    {
      id: 4,
      name: "Activities",
      href: "/dashboard/activities",
      icon: FaRunning,
    },
  ];

  const pathname = usePathname();

  if (user && user.isAdmin) {
    links.push({
      id: 5,
      name: "Admin Area",
      href: "/dashboard/admins",
      icon: FaStar,
    });
  }
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <motion.div
            key={link.id}
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.02 }}
          >
            <Link
              key={link.name}
              href={link.href}
              className={clsx(
                "flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 dark:bg-gray-900 p-3 text-sm text-gray-500 font-medium hover:bg-semiDark  dark:hover:bg-semiLight hover:text-white dark:hover:text-gray-950 md:flex-none md:justify-start md:p-2 md:px-3 transition-colors duration-300 shadow-md",
                {
                  "bg-semiDark dark:bg-semiLight text-white dark:text-gray-950":
                    pathname === link.href,
                }
              )}
            >
              <LinkIcon className="w-6" />
              <p className="hidden md:block">{link.name}</p>
            </Link>
          </motion.div>
        );
      })}
    </>
  );
}

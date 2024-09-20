"use client";

import AcmeLogo from "@/ui/acme-logo";
import LoginForm from "@/ui/auth/login-form";
import { motion } from "framer-motion";

export default function Login() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        type: "tween",
        duration: 0.2,
      }}
    >
      <div className="flex h-20 w-full items-end rounded-lg bg-semiDark dark:bg-gray-900 p-3 md:h-36">
        <div className="w-32 text-white md:w-36">
          <AcmeLogo />
        </div>
      </div>
      <LoginForm />
    </motion.div>
  );
}

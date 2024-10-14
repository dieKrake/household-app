"use client";

import SuccessAnimation from "@/components/success-animation";
import { useUsersContext } from "@/context/user-context";
import { motion } from "framer-motion";
import { useEffect } from "react";

export default function Dashboard() {
  const { setIsLoggedIn } = useUsersContext();

  useEffect(() => {
    setIsLoggedIn(true);
  }, []);

  return (
    <>
      <SuccessAnimation />
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          type: "tween",
          duration: 0.2,
        }}
      ></motion.div>
    </>
  );
}

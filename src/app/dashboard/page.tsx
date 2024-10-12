"use client";

import { useUsersContext } from "@/context/user-context";
import { motion } from "framer-motion";
import { useEffect } from "react";

export default function Dashboard() {
  const { user, setIsLoggedIn } = useUsersContext();
  useEffect(() => {
    setIsLoggedIn(true);
  }, []);
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        type: "tween",
        duration: 0.2,
      }}
    >
      Dashboard Page
    </motion.div>
  );
}

"use client";

import { motion } from "framer-motion";

export default function Dashboard() {
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

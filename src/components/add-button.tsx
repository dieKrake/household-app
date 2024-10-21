"use client";

import { useAddingContext } from "@/context/adding-activity-context";
import { motion } from "framer-motion";
import { RiAddCircleFill } from "react-icons/ri";

export default function AddButton() {
  const { setIsAdding } = useAddingContext();
  return (
    <div className="flex items-start md:items-center justify-center select-none w-72 h-52 md:w-60 md:h-60 mx-2 mb-5">
      <motion.div
        animate={{ opacity: 0.95, scale: 1.0 }}
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
        className="text-6xl dark:text-semiLight text-semiDark cursor-pointer"
        onClick={() => {
          setIsAdding(true);
        }}
      >
        <RiAddCircleFill />
      </motion.div>
    </div>
  );
}

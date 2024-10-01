import { motion } from "framer-motion";

export default function SaveButton() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        type: "tween",
        duration: 0.3,
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.9 }}
      className="bg-semiDark dark:bg-semiLight py-1 shadow-xl rounded-xl dark:text-gray-950 text-white cursor-pointer select-none z-50 text-center"
      //   onClick={saveToDB}
    >
      Save
    </motion.div>
  );
}

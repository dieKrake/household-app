import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function SuccessAnimation() {
  const [showAnimation, setShowAnimation] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAnimation(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex justify-center items-center h-full w-full">
      <AnimatePresence>
        {showAnimation && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{
              type: "spring",
              duration: 0.5,
              scale: {
                type: "spring",
                stiffness: 120,
                damping: 10,
              },
              opacity: {
                duration: 0.5,
              },
            }}
            className="bg-transparent h-24 w-24 text-2xl flex justify-center items-center"
          >
            Success
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

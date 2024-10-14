import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { FaSmileBeam } from "react-icons/fa";

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
            className="dark:bg-semiLight dark:text-gray-900 bg-semiDark text-white rounded-2xl p-4 text-xl flex justify-center items-center"
          >
            <div className="flex select-none">
              <FaSmileBeam />
              <div>&nbsp; Activity Added &nbsp;</div>
              <div>
                <FaSmileBeam />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

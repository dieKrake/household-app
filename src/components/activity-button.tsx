import { motion } from "framer-motion";

type ActivityButtonProps = {
  text: string;
};

export default function ActivityButton({ text }: ActivityButtonProps) {
  return (
    <motion.div
      className="h-12 dark:bg-dark bg-light flex items-center justify-center rounded-xl dark:text-light shadow-md cursor-pointer
                   "
      whileHover={{
        scale: 1.1,
        transition: { duration: 0.1 },
      }}
      whileTap={{ scale: 0.9 }}
    >
      {text}
    </motion.div>
  );
}

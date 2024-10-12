"use client";

import ActivityBoxes from "@/components/activity-boxes";
import AddButton from "@/components/add-button";
import { motion } from "framer-motion";
import { ActivitiesProvider } from "@/context/activities-context";

export default function Activities() {
  return (
    <ActivitiesProvider>
      <div className="flex flex-col h-full w-full text-lg mt-40 md:mt-0">
        <div className="flex flex-wrap w-full justify-center">
          <ActivityBoxes />
          <motion.div
            animate={{ scale: 1, opacity: 1 }}
            initial={{ scale: 0, opacity: 0 }}
            transition={{ delay: 1, duration: 0.3 }}
          >
            <AddButton />
          </motion.div>
        </div>

        <div className="h-10 w-full"></div>
      </div>
    </ActivitiesProvider>
  );
}

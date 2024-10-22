"use client";

import ActivityBoxes from "@/components/activity-boxes";
import AddButton from "@/components/add-button";
import { motion } from "framer-motion";
import { useUsersContext } from "@/context/user-context";
import { useEffect } from "react";
import LoadingCircle from "@/components/loading-circle";
import { useActivitiesContext } from "@/context/activities-context";
import { DateProvider } from "@/context/date-context";

export default function Activities() {
  const { setIsLoggedIn } = useUsersContext();
  const { isLoading } = useActivitiesContext();

  useEffect(() => {
    setIsLoggedIn(true);
  }, []);
  return (
    <DateProvider>
      <div className="flex flex-col h-full w-full text-lg mt-40 md:mt-0">
        <div className="flex flex-wrap w-full justify-center">
          {isLoading ? (
            <LoadingCircle />
          ) : (
            <>
              <ActivityBoxes />
              <motion.div
                animate={{ scale: 1, opacity: 1 }}
                initial={{ scale: 0, opacity: 0 }}
                transition={{ delay: 1, duration: 0.3 }}
              >
                <AddButton />
              </motion.div>
            </>
          )}
        </div>

        <div className="h-10 w-full"></div>
      </div>
    </DateProvider>
  );
}

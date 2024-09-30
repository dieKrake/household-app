"use client";

import ActivityButton from "./activity-button";
import { motion } from "framer-motion";
import { useActivityContext } from "@/context/activity-context";

export default function ActivityBox() {
  const { activities, setActivities } = useActivityContext();
  const userId = "user-sub-123";
  const userActivityList =
    activities.find((user: any) => user.userId === userId)?.activities || [];

  const increaseProgress = (activityId: number) => {
    setActivities((prevActivities: any) =>
      prevActivities.map((user: any) => {
        if (user.userId === userId) {
          return {
            ...user,
            activities: user.activities.map((activity: any) =>
              activity.id === activityId &&
              activity.progress < activity.totalReps
                ? { ...activity, progress: activity.progress + 1 }
                : activity
            ),
          };
        }
        return user;
      })
    );
  };

  const decreaseProgress = (activityId: number) => {
    setActivities((prevActivities: any) =>
      prevActivities.map((user: any) => {
        if (user.userId === userId) {
          return {
            ...user,
            activities: user.activities.map((activity: any) =>
              activity.id === activityId && activity.progress > 0
                ? { ...activity, progress: activity.progress - 1 }
                : activity
            ),
          };
        }
        return user;
      })
    );
  };

  return userActivityList.map((activity: any) => (
    <motion.div
      key={activity.id}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        type: "tween",
        duration: 0.3,
      }}
      className="w-64 h-60 sm:w-56 sm:h-56 md:w-48 md:h-48 mx-2 mb-5 shadow-lg"
    >
      <div className="flex flex-col h-full justify-between p-2 gap-2 rounded-xl bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <p className="mt-2 text-xl text-gray-950 dark:text-light select-none">
            {activity.activityName}
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-[0.6rem] p-2">
          {Array.from({ length: activity.totalReps }, (_, idx) => (
            <motion.div
              key={idx}
              className={`w-6 h-6 rounded-full shadow-md ${
                idx < activity.progress
                  ? "bg-semiLight dark:bg-semiLight"
                  : "bg-gray-300 opacity-70 dark:bg-dark"
              }`}
              initial={{ scale: 1 }}
              animate={idx < activity.progress ? { scale: 1.1 } : { scale: 1 }}
              transition={{ type: "spring", stiffness: 800 }}
            />
          ))}
        </div>
        <div className="flex gap-2 text-gray-950">
          <div
            className="w-full select-none"
            onClick={() => increaseProgress(activity.id)}
          >
            <ActivityButton text="Done" />
          </div>
          <div
            className="w-full select-none"
            onClick={() => decreaseProgress(activity.id)}
          >
            <ActivityButton text="Undo" />
          </div>
        </div>
      </div>
    </motion.div>
  ));
}

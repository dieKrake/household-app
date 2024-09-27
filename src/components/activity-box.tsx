"use client";

import TaskButton from "./activity-button";
import { motion } from "framer-motion";

type Activity = {
  id: number;
  activityName: string;
  totalReps: number;
  progress: number;
};

type ActivityBoxProps = {
  activityList: Activity[];
};

export default function ActivityBox({ activityList }: ActivityBoxProps) {
  return activityList.map((activity) => (
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
          <p className="mt-2 text-xl text-gray-950 dark:text-light">
            {activity.activityName}
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 p-2">
          {Array.from({ length: activity.totalReps }, (_, index) => (
            <div
              key={index}
              className={`w-6 h-6 rounded-full shadow-md ${
                index < activity.progress
                  ? "bg-semiLight dark:bg-semiLight"
                  : "bg-gray-300 opacity-70 dark:bg-dark"
              }`}
            />
          ))}
        </div>
        <div className="flex gap-2 text-gray-950">
          <TaskButton text="Done" />
          <TaskButton text="Undo" />
        </div>
      </div>
    </motion.div>
  ));
}

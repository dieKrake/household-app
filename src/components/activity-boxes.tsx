"use client";

import ActivityButton from "./activity-button";
import { motion } from "framer-motion";
import { useActivitiesContext } from "@/context/activities-context";
import SaveButton from "./SaveButton";
import { FaEdit } from "react-icons/fa";
import { useEditingContext } from "@/context/edit-context";
import { useActivityContext } from "@/context/selected-activity-context";
import { useEffect } from "react";

export default function ActivityBoxes() {
  const { setIsEditing } = useEditingContext();
  const { activities, setActivities } = useActivitiesContext();
  const { setActivity } = useActivityContext();

  const increaseProgress = (activityId: any) => {
    setActivities((prevActivities: any) =>
      prevActivities.map((activity: any) => {
        // Check if activity matches the one we're trying to update
        if (activity.id === activityId && activity.reps < activity.total_reps) {
          const updatedReps = activity.reps + 1; // Increase reps by 1
          const isCompleted = updatedReps === activity.total_reps; // Check if completed

          return { ...activity, reps: updatedReps, isCompleted };
        }
        return activity; // Return unchanged activity if no match
      })
    );
  };

  const decreaseProgress = (activityId: any) => {
    setActivities((prevActivities: any) =>
      prevActivities.map((activity: any) => {
        // Check if activity matches the one we're trying to update
        if (activity.id === activityId && activity.reps > 0) {
          return { ...activity, reps: activity.reps - 1, isCompleted: false }; // Decrease reps by 1
        }
        return activity; // Return unchanged activity if no match
      })
    );
  };

  return (
    <>
      {activities.map((activity: any) => (
        <motion.div
          key={activity.id}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: 1,
            scale: activity.isCompleted ? 1.05 : 1,
            rotate: activity.isCompleted ? [0, 5, 0, -5, 0] : 0,
            borderRadius: "100%",
          }}
          exit={{ opacity: 0 }}
          transition={{
            type: "tween",
            duration: 0.3,
            ease: "easeInOut",
            scale: {
              type: "spring",
              stiffness: 100,
              damping: 20,
            },
          }}
          className="w-64 h-60 sm:w-56 sm:h-56 md:w-50 md:h-60 mx-2 mb-5 shadow-lg"
        >
          <div className="flex flex-col h-full justify-between p-2 gap-2 rounded-xl bg-gray-50 dark:bg-gray-900">
            <div className="relative text-center flex justify-center mt-2 text-xl text-gray-950 dark:text-light select-none">
              <p className="text-center">{activity.activity}</p>
              <motion.div
                animate={{ opacity: 0.8, scale: 1.0 }}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className="absolute right-0 pr-1 pt-1 cursor-pointer"
              >
                <FaEdit
                  onClick={() => {
                    setIsEditing(true);
                    setActivity(activity);
                  }}
                />
              </motion.div>
            </div>

            <div className="flex flex-wrap justify-center gap-[0.6rem] p-2">
              {Array.from({ length: activity.total_reps }, (_, idx) => (
                <motion.div
                  key={`${activity.id}-${idx}`}
                  className={`w-6 h-6 rounded-full shadow-md ${
                    idx < activity.reps
                      ? "bg-semiLight dark:bg-semiLight"
                      : "bg-gray-300 opacity-70 dark:bg-dark"
                  }`}
                  initial={{ scale: 1 }}
                  animate={idx < activity.reps ? { scale: 1.1 } : { scale: 1 }}
                  transition={{ type: "spring", stiffness: 800 }}
                />
              ))}
            </div>
            <div className="flex flex-wrap gap-2 text-gray-950 mb-2">
              <div
                className="w-[calc(50%-0.25rem)] select-none"
                onClick={() => increaseProgress(activity.id)}
              >
                <ActivityButton text="Done" />
              </div>
              <div
                className="w-[calc(50%-0.25rem)] select-none"
                onClick={() => decreaseProgress(activity.id)}
              >
                <ActivityButton text="Undo" />
              </div>
              <div className="w-full">
                <SaveButton />
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </>
  );
}

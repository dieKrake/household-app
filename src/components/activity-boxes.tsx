"use client";

import ActivityButton from "./activity-button";
import { motion } from "framer-motion";
import { useActivityContext } from "@/context/activity-context";
import SaveButton from "./SaveButton";
import { FaEdit } from "react-icons/fa";
import { useState } from "react";
import { useEditingContext } from "@/context/edit-context";
import { div } from "framer-motion/client";

export default function ActivityBoxes() {
  const { isEditing, setIsEditing } = useEditingContext();
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
            activities: user.activities.map((activity: any) => {
              if (
                activity.id === activityId &&
                activity.progress < activity.totalReps
              ) {
                const updatedProgress = activity.progress + 1;

                const isCompleted = updatedProgress === activity.totalReps;

                return { ...activity, progress: updatedProgress, isCompleted };
              }
              return activity;
            }),
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
                ? {
                    ...activity,
                    progress: activity.progress - 1,
                    isCompleted: false,
                  }
                : activity
            ),
          };
        }
        return user;
      })
    );
  };

  return userActivityList.map((activity: any) => (
    <>
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
            <p className="text-center">{activity.activityName}</p>
            <motion.div
              animate={{ opacity: 0.8, scale: 1.0 }}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className="absolute right-0 pr-1 pt-1 cursor-pointer"
            >
              <FaEdit onClick={() => setIsEditing(!isEditing)} />
            </motion.div>
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
                animate={
                  idx < activity.progress ? { scale: 1.1 } : { scale: 1 }
                }
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
    </>
  ));
}

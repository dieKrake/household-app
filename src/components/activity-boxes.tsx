"use client";

import ActivityButton from "./activity-button";
import { motion } from "framer-motion";
import { useActivitiesContext } from "@/context/activities-context";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { useEditingContext } from "@/context/edit-context";
import { useActivityContext } from "@/context/selected-activity-context";
import { useState } from "react";
import ConfirmWindow from "./confirm-window";
import { deleteActivity } from "@/api/activities/activities-delete";
import { editActivity } from "@/functions/editActivity-function";

export default function ActivityBoxes() {
  const { setIsEditing } = useEditingContext();
  const { activities, setActivities } = useActivitiesContext();
  const { setSelectedActivity } = useActivityContext();
  const [showDeleteAnimation, setShowDeleteAnimation] = useState(false);
  const [activityToDelete, setActivityToDelete] = useState<any>(null);

  const increaseProgress = (activityId: any) => {
    setActivities((prevActivities: any) =>
      prevActivities.map((activity: any) => {
        if (activity.id === activityId && activity.reps < activity.total_reps) {
          const updatedReps = activity.reps + 1;
          const isCompleted = updatedReps === activity.total_reps;
          editActivity(
            activity.user_id,
            activity.id,
            activity.activity,
            updatedReps,
            activity.total_reps
          );
          return { ...activity, reps: updatedReps, isCompleted };
        }
        return activity;
      })
    );
  };

  const decreaseProgress = (activityId: any) => {
    setActivities((prevActivities: any) =>
      prevActivities.map((activity: any) => {
        if (activity.id === activityId && activity.reps > 0) {
          const updatedReps = activity.reps - 1;
          editActivity(
            activity.user_id,
            activity.id,
            activity.activity,
            updatedReps,
            activity.total_reps
          );
          return { ...activity, reps: updatedReps, isCompleted: false };
        }
        return activity;
      })
    );
  };

  const handleDeleteActivity = (userId: string, activityId: string) => {
    deleteActivity(userId, activityId)
      .then(() => {
        setActivities((prevActivities: any) =>
          prevActivities.filter((activity: any) => activity.id !== activityId)
        );
      })
      .catch((error) => {
        console.error("Error deleting activity:", error);
      });
  };

  return (
    <>
      {showDeleteAnimation && activityToDelete && (
        <ConfirmWindow
          onConfirm={() => {
            handleDeleteActivity(activityToDelete.user_id, activityToDelete.id);
            setShowDeleteAnimation(false);
          }}
          onCancel={() => {
            setShowDeleteAnimation(false);
          }}
        />
      )}

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
          className="w-72 h-52 md:w-68 md:h-52 mx-2 mb-5 shadow-lg"
        >
          <div className="flex flex-col h-full justify-between p-2 gap-2 rounded-xl bg-gray-50 dark:bg-gray-900">
            <div className="relative text-center flex justify-center mt-2 text-xl text-gray-950 dark:text-light select-none">
              <motion.div
                animate={{ opacity: 0.8, scale: 1.0 }}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className="absolute left-0 pl-1 pt-1 cursor-pointer"
              >
                <FaTrashAlt
                  className="text-red-500 mt-1"
                  onClick={() => {
                    setShowDeleteAnimation(true);
                    setActivityToDelete(activity);
                  }}
                />
              </motion.div>

              <p className="text-center text-xl w-40 mt-3">
                {activity.activity}
              </p>
              <motion.div
                animate={{ opacity: 0.8, scale: 1.0 }}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className="absolute right-0 pr-1 pt-1 cursor-pointer"
              >
                <FaEdit
                  onClick={() => {
                    setIsEditing(true);
                    setSelectedActivity(activity);
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
                onClick={() => {
                  increaseProgress(activity.id);
                }}
              >
                <ActivityButton text="Done" />
              </div>
              <div
                className="w-[calc(50%-0.25rem)] select-none"
                onClick={() => decreaseProgress(activity.id)}
              >
                <ActivityButton text="Undo" />
              </div>
              {/* <div className="w-full"><SaveButton /></div> */}
            </div>
          </div>
        </motion.div>
      ))}
    </>
  );
}

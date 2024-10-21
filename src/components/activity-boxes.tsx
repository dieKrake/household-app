"use client";

import ActivityButton from "./activity-button";
import { motion } from "framer-motion";
import { useActivitiesContext } from "@/context/activities-context";
import SaveButton from "./SaveButton";
import { FaEdit, FaBan } from "react-icons/fa";
import { useEditingContext } from "@/context/edit-context";
import { useActivityContext } from "@/context/selected-activity-context";
import { useState } from "react";
import ConfirmWindow from "./confirm-window";
import { deleteActivity } from "@/api/activities/activities-delete";

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
          return { ...activity, reps: activity.reps - 1, isCompleted: false };
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
          className="w-72 h-52 md:w-60 md:h-60 mx-2 mb-5 shadow-lg"
        >
          <div className="flex flex-col h-full justify-between p-2 gap-2 rounded-xl bg-gray-50 dark:bg-gray-900">
            <div className="relative text-center flex justify-center mt-2 text-xl text-gray-950 dark:text-light select-none">
              <motion.div
                animate={{ opacity: 0.8, scale: 1.0 }}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className="absolute left-0 pl-1 pt-1 cursor-pointer"
              >
                <FaBan
                  className="text-red-500"
                  onClick={() => {
                    setShowDeleteAnimation(true);
                    setActivityToDelete(activity); // Die Aktivität speichern, die gelöscht werden soll
                  }}
                />
              </motion.div>

              <p className="text-center w-40 mt-4">{activity.activity}</p>
              <motion.div
                animate={{ opacity: 0.8, scale: 1.0 }}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className="absolute right-0 pr-1 pt-1 cursor-pointer"
              >
                <FaEdit
                  className="text-lg"
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
              <div className="w-full">{/* <SaveButton /> */}</div>
            </div>
          </div>
        </motion.div>
      ))}
    </>
  );
}

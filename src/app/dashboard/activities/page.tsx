"use client";

import TaskBox from "@/components/task-box";
import { activityList } from "@/lib/dummy-data/activity-list";
import { AnimatePresence, motion } from "framer-motion";

export default function Activities() {
  return (
    <>
      <div className="flex flex-col h-full w-full text-lg">
        <div className="flex flex-wrap w-full justify-center">
          <TaskBox taskList={activityList} />
        </div>
        <div className="h-10 w-full"></div>
      </div>
    </>
  );
}

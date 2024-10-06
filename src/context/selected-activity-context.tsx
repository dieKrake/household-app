"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { ActivityItem } from "@/lib/dummy-data/activity-list";

interface ActivityContextProps {
  activity: ActivityItem | undefined;
  setActivity: (activity: ActivityItem | undefined) => void;
}

const ActivityContext = createContext<ActivityContextProps | undefined>(
  undefined
);

export const ActivityProvider = ({ children }: { children: ReactNode }) => {
  const [activity, setActivity] = useState<ActivityItem | undefined>(undefined);

  return (
    <ActivityContext.Provider value={{ activity, setActivity }}>
      {children}
    </ActivityContext.Provider>
  );
};

export const useActivityContext = () => {
  const context = useContext(ActivityContext);

  if (!context) {
    throw new Error(
      "useActivityContext must be used within an ActivityProvider"
    );
  }

  return context;
};

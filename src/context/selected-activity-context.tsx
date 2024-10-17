"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface ActivityItem {
  activity: string;
  id: string;
  reps: number;
  total_reps: number;
  user_id: string;
}

interface ActivityContextProps {
  selectedActivity: ActivityItem | undefined;
  setSelectedActivity: (activity: ActivityItem | undefined) => void;
}

const ActivityContext = createContext<ActivityContextProps | undefined>(
  undefined
);

export const ActivityProvider = ({ children }: { children: ReactNode }) => {
  const [selectedActivity, setSelectedActivity] = useState<
    ActivityItem | undefined
  >(undefined);

  return (
    <ActivityContext.Provider value={{ selectedActivity, setSelectedActivity }}>
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

"use client";

import { createContext, useContext, useState, useEffect } from "react";
import useAuthUser from "@/app/hooks/use-auth-user";
import { activityList, ActivityList } from "@/lib/dummy-data/activity-list";

const ActivityContext = createContext<any>(null);

export const ActivityProvider = ({ children }: any) => {
  const user = useAuthUser();
  const [activities, setActivities] = useState<ActivityList[]>([]);

  useEffect(() => {
    if (user) {
      //fetchActivitiesForUser(user.sub).then((data) => setActivities(data));
      // Testing, remove later
      setActivities(activityList);
    }
  }, [user]);

  // Noch exportieren in extra Komponente
  const fetchActivitiesForUser = async (userId: string) => {
    const response = await fetch(`/api/activities?userId=${userId}`);
    const data = await response.json();
    return data;
  };

  return (
    <ActivityContext.Provider value={{ activities, setActivities }}>
      {children}
    </ActivityContext.Provider>
  );
};

export const useActivityContext = () => {
  return useContext(ActivityContext);
};

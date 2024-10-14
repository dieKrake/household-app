"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { fetchUserActivities } from "@/api/activities/activities-get";
import { useUsersContext } from "./user-context";

const ActivitiesContext = createContext<any>(null);

export const ActivitiesProvider = ({ children }: any) => {
  const [activities, setActivities] = useState([]);
  const { user } = useUsersContext();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function fetchActivities() {
    if (user && user.username) {
      try {
        console.log("fetching for user: ", user);
        setIsLoading(true);
        const data = await fetchUserActivities(user.username);

        // Konvertiere numerische Felder explizit in Zahlen
        const normalizedData = data.map((activity: any) => ({
          ...activity,
          reps: Number(activity.reps),
          total_reps: Number(activity.total_reps),
        }));

        setActivities(normalizedData);
        setIsLoading(false);
        console.log(normalizedData);
      } catch (error) {
        console.error("Error fetching activities:", error);
        setIsLoading(false);
      }
    }
  }

  useEffect(() => {
    fetchActivities();
  }, [user]);

  return (
    <ActivitiesContext.Provider
      value={{ activities, setActivities, fetchActivities, isLoading }}
    >
      {children}
    </ActivitiesContext.Provider>
  );
};

export const useActivitiesContext = () => {
  return useContext(ActivitiesContext);
};

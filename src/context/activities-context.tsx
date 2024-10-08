"use client";

import { createContext, useContext, useState, useEffect } from "react";
import useAuthUser from "@/app/hooks/use-auth-user";

const ActivitiesContext = createContext<any>(null);

export const ActivitiesProvider = ({ children }: any) => {
  const user = useAuthUser();
  const [activities, setActivities] = useState([]);
  const userId = "user456";

  useEffect(() => {
    if (user && user.username) {
      const fetchActivities = async () => {
        try {
          const response = await fetch(
            `/dashboard/activities/${user.username}`
          );
          const data = await response.json();
          setActivities(data);
        } catch (error) {
          console.error("Error fetching activities:", error);
        }
      };

      fetchActivities();
    }
  }, [user]);

  return (
    <ActivitiesContext.Provider value={{ activities, setActivities }}>
      {children}
    </ActivitiesContext.Provider>
  );
};

export const useActivitiesContext = () => {
  return useContext(ActivitiesContext);
};

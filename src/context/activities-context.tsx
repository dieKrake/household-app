"use client";

import { createContext, useContext, useState, useEffect } from "react";
import useAuthUser from "@/app/hooks/use-auth-user";
import { fetchUserActivities } from "@/api/activities/activities-get";

const ActivitiesContext = createContext<any>(null);

export const ActivitiesProvider = ({ children }: any) => {
  const user = useAuthUser();
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchActivities = async () => {
      if (user && user.username) {
        try {
          const data = await fetchUserActivities(user.username);
          setActivities(data);
        } catch (error) {
          console.error("Error fetching activities:", error);
        }
      }
    };
    fetchActivities();
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

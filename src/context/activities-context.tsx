"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { fetchUserActivities } from "@/api/activities/activities-get";
import { useUsersContext } from "./user-context";

const ActivitiesContext = createContext<any>(null);

export const ActivitiesProvider = ({ children }: any) => {
  const [activities, setActivities] = useState([]);
  const { isLoggedIn, user } = useUsersContext();

  async function fetchActivities() {
    if (user && user.username) {
      try {
        console.log("i am fetching...");
        const data = await fetchUserActivities(user.username);
        setActivities(data);
      } catch (error) {
        console.error("Error fetching activities:", error);
      }
    }
  }

  useEffect(() => {
    if (isLoggedIn) {
      fetchActivities();
    }
  }, [isLoggedIn]);

  return (
    <ActivitiesContext.Provider
      value={{ activities, setActivities, fetchActivities }}
    >
      {children}
    </ActivitiesContext.Provider>
  );
};

export const useActivitiesContext = () => {
  return useContext(ActivitiesContext);
};

"use client";

import { createContext, useContext, useState, useEffect } from "react";
import useAuthUser from "@/app/hooks/use-auth-user";
import { fetchUserActivities } from "@/api/activities/activities-get";
import { useUsersContext } from "./user-context";

const ActivitiesContext = createContext<any>(null);

export const ActivitiesProvider = ({ children }: any) => {
  const user = useAuthUser();
  const [activities, setActivities] = useState([]);
  const { isLoggedIn } = useUsersContext();

  async function fetchActivities() {
    console.log("activity-context user: ", user);
    if (user && user.username) {
      try {
        const data = await fetchUserActivities(user.username);
        setActivities(data);
        console.log("Fetched activities for user:", user, "data: ", data);
      } catch (error) {
        console.error("Error fetching activities:", error);
      }
    }
  }

  useEffect(() => {
    if (isLoggedIn) {
      console.log("Logged in");
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

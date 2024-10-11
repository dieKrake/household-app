"use client";

import { createContext, useContext, useState, useEffect } from "react";
import useAuthUser from "@/app/hooks/use-auth-user";

const UserContext = createContext<any>(null);

export const UserProvider = ({ children }: any) => {
  const user = useAuthUser();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (!user) {
      setIsLoggedIn(false);
      console.log("if:userContext isLoggedIn: ", isLoggedIn);
    } else {
      setIsLoggedIn(true);
      console.log("else:userContext isLoggedIn: ", isLoggedIn);
      return;
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUsersContext = () => {
  return useContext(UserContext);
};

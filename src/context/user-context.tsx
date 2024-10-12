"use client";

import {
  fetchAuthSession,
  fetchUserAttributes,
  getCurrentUser,
} from "aws-amplify/auth";
import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext<any>(null);

export const UserProvider = ({ children }: any) => {
  const [user, setUser] = useState<any>();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  async function getUser() {
    try {
      if (isLoggedIn) {
        const session = await fetchAuthSession();
        if (!session.tokens) {
          return;
        }

        const amplifyUser = {
          ...(await getCurrentUser()),
          ...(await fetchUserAttributes()),
          isAdmin: false,
        };
        const groups = session.tokens.accessToken.payload["cognito:groups"];
        // @ts-ignore
        amplifyUser.isAdmin = Boolean(groups && groups.includes("Admins"));
        setUser(amplifyUser);
      }
    } catch (e) {
      console.log("Error in UserContext: ", e);
    }
  }

  useEffect(() => {
    getUser();
  }, [isLoggedIn]);

  return (
    <UserContext.Provider value={{ user, setUser, isLoggedIn, setIsLoggedIn }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUsersContext = () => {
  return useContext(UserContext);
};

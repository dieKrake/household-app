import { useUsersContext } from "@/context/user-context";
import {
  fetchAuthSession,
  fetchUserAttributes,
  getCurrentUser,
} from "aws-amplify/auth";
import { useEffect, useState } from "react";

export default function useAuthUser() {
  const [user, setUser] = useState<Record<string, any>>();
  //const { setIsLoggedIn } = useUsersContext();

  useEffect(() => {
    async function getUser() {
      const session = await fetchAuthSession();
      if (!session.tokens) {
        return;
      }
      const user = {
        ...(await getCurrentUser()),
        ...(await fetchUserAttributes()),
        isAdmin: false,
      };
      const groups = session.tokens.accessToken.payload["cognito:groups"];
      // @ts-ignore
      user.isAdmin = Boolean(groups && groups.includes("Admins"));
      setUser(user);
      console.log("set user logged in");
    }

    getUser();
  }, []);

  return user;
}

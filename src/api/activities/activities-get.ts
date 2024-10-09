import axios from "axios";

export const fetchUserActivities = async (userId: string) => {
  try {
    const res = await axios.get(
      `https://ple5mxynje.execute-api.eu-central-1.amazonaws.com/activities/user/${userId}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return res.data;
  } catch (error: any) {
    console.error("Error fetching user activities:", error.message);
    throw new Error(error.message);
  }
};

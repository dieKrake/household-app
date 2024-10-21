import axios from "axios";

export const deleteActivity = async (userId: string, activityId: string) => {
  try {
    const res = await axios.delete(
      `https://ple5mxynje.execute-api.eu-central-1.amazonaws.com/activities/user/${userId}/activity/${activityId}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res.data;
  } catch (error: any) {
    console.error("Error deleting activity:", error.message);
    throw new Error(error.message);
  }
};

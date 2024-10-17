import axios from "axios";

export const updateSelectedActivity = async (
  userId: string,
  activityId: string,
  activityName: string,
  progress: number,
  totalReps: number
) => {
  console.log(
    "upadte activity: ",
    userId,
    activityId,
    activityName,
    progress,
    totalReps
  );
  try {
    const res = await axios.put(
      `https://ple5mxynje.execute-api.eu-central-1.amazonaws.com/activities/user/${userId}/activity/${activityId}`,
      {
        activityName: activityName,
        progress: progress,
        totalReps: totalReps,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(res);
    return res.data;
  } catch (error: any) {
    console.error("Error updating activity:", error.message);
    throw new Error(error.message);
  }
};

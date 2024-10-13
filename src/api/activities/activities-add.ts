import axios from "axios";

export const addNewActivity = async (
  userId: string,
  activity: string,
  reps: number,
  totalReps: number
) => {
  try {
    const res = await axios.post(
      `https://ple5mxynje.execute-api.eu-central-1.amazonaws.com/activities/new`,
      {
        user_id: userId,
        activity: activity,
        reps: reps,
        total_reps: totalReps,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return res.data;
  } catch (error: any) {
    console.error("Error adding activities:", error.message);
    throw new Error(error.message);
  }
};

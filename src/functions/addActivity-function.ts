import { addNewActivity } from "@/api/activities/activities-add";

export async function addActivity(
  userId: string,
  activityName: string,
  progress: number,
  totalReps: number,
  refresh: () => void
) {
  try {
    await addNewActivity(userId, activityName, progress, totalReps);
    refresh();
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

import { updateSelectedActivity } from "@/api/activities/activities-update";

export async function editActivity(
  userId: string,
  activityId: string,
  activityName: string,
  progress: number,
  totalReps: number,
  refresh: () => void
) {
  try {
    await updateSelectedActivity(
      userId,
      activityId,
      activityName,
      progress,
      totalReps
    );
    refresh();
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

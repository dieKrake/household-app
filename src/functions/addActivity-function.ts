import { addNewActivity } from "@/api/activities/activities-add";

export async function addActivity(
  userId: string,
  activityName: string,
  progress: number,
  totalReps: number,
  refresh: () => void
) {
  await addNewActivity(userId, activityName, progress, totalReps);
  refresh();
}

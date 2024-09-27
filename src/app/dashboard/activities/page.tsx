"use client";

import ActivityBox from "@/components/activity-box";
import { useActivityContext } from "@/context/activity-context";

export default function Activities() {
  const { activities } = useActivityContext();
  const userId = "user-sub-123";
  const userActivityList =
    activities.find((user: any) => user.userId === userId)?.activities || [];

  return (
    <>
      <div className="flex flex-col h-full w-full text-lg">
        <div className="flex flex-wrap w-full justify-center">
          <ActivityBox activityList={userActivityList} />
        </div>
        <div className="h-10 w-full"></div>
      </div>
    </>
  );
}

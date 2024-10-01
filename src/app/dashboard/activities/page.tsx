"use client";

import ActivityBox from "@/components/activity-box";
// import { useActivityContext } from "@/context/activity-context";

export default function Activities() {
  // const { activities } = useActivityContext();
  // const userId = "user-sub-456";
  // const userActivityList =
  //   activities.find((user: any) => user.userId === userId)?.activities || [];

  return (
    <>
      <div className="flex flex-col h-full w-full text-lg mt-40 md:mt-0">
        <div className="flex flex-wrap w-full justify-center">
          <ActivityBox />
        </div>

        <div className="h-10 w-full"></div>
      </div>
    </>
  );
}

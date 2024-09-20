import TaskBox from "@/components/task-box";
import { activityList } from "@/lib/dummy-data/activity-list";

export default function Activities() {
  return (
    <div className="flex flex-wrap h-full w-full justify-around items-start text-lg">
      <TaskBox taskList={activityList} />
      <div className="h-10 w-full"></div>
    </div>
  );
}

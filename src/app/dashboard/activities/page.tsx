import { activityList } from "@/lib/dummy-data/activity-list";

export default function Activities() {
  return (
    <div className="bg-green-600 flex flex-wrap h-full w-full justify-around items-start">
      {activityList.map((activity) => (
        <div
          key={activity.id}
          className="w-64 h-60 sm:w-56 sm:h-56 md:w-48 md:h-48 mx-2 mb-5"
        >
          <div className="flex flex-col h-full justify-between bg-orange-600 p-2 gap-2">
            <div className="text-center bg-white">
              <p className="text-lg text-gray-700 bg-yellow-300">
                {activity.activityName}
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-2 bg-white p-2">
              {Array.from({ length: activity.totalReps }, (_, index) => (
                <div
                  key={index}
                  className={`w-6 h-6 rounded-full ${
                    index < activity.progress ? "bg-green-500" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <div className="w-full h-12 bg-red-600 flex items-center justify-center">
                done
              </div>
              <div className="w-full h-12 bg-red-200 flex items-center justify-center">
                undo
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

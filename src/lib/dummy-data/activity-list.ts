export interface ActivityItem {
  id: number;
  activityName: string;
  progress: number;
  totalReps: number;
}

export interface ActivityList {
  userId: string;
  activities: ActivityItem[];
}

export const activityList: ActivityList[] = [
  {
    userId: "user-sub-123",
    activities: [
      {
        id: 1,
        activityName: "Laufen",
        progress: 2,
        totalReps: 3,
      },
      {
        id: 2,
        activityName: "Radfahren",
        progress: 1,
        totalReps: 2,
      },
      {
        id: 3,
        activityName: "Schwimmen",
        progress: 1,
        totalReps: 2,
      },
      {
        id: 4,
        activityName: "Yoga",
        progress: 3,
        totalReps: 7,
      },
      {
        id: 5,
        activityName: "Krafttraining",
        progress: 2,
        totalReps: 4,
      },
    ],
  },
  {
    userId: "user-sub-456",
    activities: [
      {
        id: 6,
        activityName: "Joggen",
        progress: 1,
        totalReps: 5,
      },
      {
        id: 7,
        activityName: "Boxen",
        progress: 3,
        totalReps: 6,
      },
    ],
  },
];

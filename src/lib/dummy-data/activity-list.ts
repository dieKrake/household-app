interface Activity {
  id: number;
  activityName: string;
  progress: number;
  totalReps: number;
}

export const activityList: Activity[] = [
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
    totalReps: 7,
  },
  {
    id: 3,
    activityName: "Schwimmen",
    progress: 4,
    totalReps: 7,
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
    progress: 5,
    totalReps: 7,
  },
  {
    id: 6,
    activityName: "Pilates",
    progress: 2,
    totalReps: 5,
  },
  {
    id: 7,
    activityName: "Klettern",
    progress: 1,
    totalReps: 4,
  },
  {
    id: 8,
    activityName: "Skifahren",
    progress: 1,
    totalReps: 5,
  },
  {
    id: 9,
    activityName: "Surfen",
    progress: 0,
    totalReps: 6,
  },
  {
    id: 10,
    activityName: "Tanzen",
    progress: 3,
    totalReps: 7,
  },
  {
    id: 11,
    activityName: "Golf",
    progress: 2,
    totalReps: 4,
  },
  {
    id: 12,
    activityName: "Boxen",
    progress: 6,
    totalReps: 8,
  },
  {
    id: 13,
    activityName: "Rudern",
    progress: 4,
    totalReps: 6,
  },
  {
    id: 14,
    activityName: "Badminton",
    progress: 5,
    totalReps: 6,
  },
  {
    id: 15,
    activityName: "Wandern",
    progress: 2,
    totalReps: 5,
  },
];

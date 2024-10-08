"use client";

import { useAddingContext } from "@/context/adding-activity-context";
import { useEditingContext } from "@/context/edit-context";
import { ActivityItem } from "@/lib/dummy-data/activity-list";
import { useEffect, useState } from "react";

interface InputFormProps {
  activity: ActivityItem | undefined;
}

export default function InputForm({ activity }: InputFormProps) {
  const { isEditing, setIsEditing } = useEditingContext();
  const { isAdding, setIsAdding } = useAddingContext();
  const [formState, setFormState] = useState({
    activityName: activity?.activityName || "",
    progress: activity?.progress || 0,
    totalReps: activity?.totalReps || 0,
  });
  useEffect(() => {
    if (isAdding) {
      setFormState({ activityName: "", progress: 0, totalReps: 0 });
    }
  }, [isAdding]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.select();
  };

  return (
    <div
      className="fixed h-full w-full flex justify-center items-center bg-gray-500 dark:bg-gray-600 bg-opacity-60 dark:bg-opacity-60 z-50"
      onClick={() => {
        setIsEditing(false), setIsAdding(false);
      }}
    >
      <div
        className="flex flex-col bg-gray-50 dark:bg-gray-900 rounded-xl shadow-lg text-gray-950 dark:text-light relative p-10 items-center" //
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold mb-4">
          {isEditing && "Edit Activity"}
          {isAdding && "Add Activity"}
        </h2>

        <label className="block mb-2">Activity Name:</label>
        <input
          type="text"
          name="activityName"
          value={formState.activityName}
          onChange={handleInputChange}
          onFocus={handleFocus}
          className="text-center font-semibold dark:bg-light dark:text-dark border rounded p-2 mb-4 w-full  focus:outline-none focus:ring focus:ring-semiDark focus:border-semiDark"
        />

        <label className="block mb-2">Progress:</label>
        <input
          type="number"
          name="progress"
          value={formState.progress}
          onChange={handleInputChange}
          onFocus={handleFocus}
          className="text-center font-semibold dark:bg-light dark:text-dark border rounded p-2 mb-4 w-full  focus:outline-none focus:ring focus:ring-semiDark focus:border-semiDark"
        />

        <label className="block mb-2">Total Reps:</label>
        <input
          type="number"
          name="totalReps"
          value={formState.totalReps}
          onChange={handleInputChange}
          onFocus={handleFocus}
          className="text-center font-semibold dark:bg-light dark:text-dark border rounded p-2 mb-4 w-full  focus:outline-none focus:ring focus:ring-semiDark focus:border-semiDark"
        />

        <button
          className="bg-semiDark dark:bg-semiLight px-5 py-3 shadow-xl rounded-xl dark:text-gray-950 text-white cursor-pointer select-none z-50 text-center mt-2"
          onClick={() => console.log("Form submitted", formState)} // Hier kannst du die Submit-Logik hinzufügen
        >
          Save
        </button>
      </div>
    </div>
  );
}

"use client";

import { ActivitiesProvider } from "@/context/activities-context";
import { useAddingContext } from "@/context/adding-activity-context";
import { useEditingContext } from "@/context/edit-context";
import { useActivityContext } from "@/context/selected-activity-context";
import InputForm from "@/ui/dashboard/input-form";
import SideNav from "@/ui/dashboard/sidenav";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { isEditing } = useEditingContext();
  const { isAdding } = useAddingContext();
  const { selectedActivity } = useActivityContext();
  return (
    <ActivitiesProvider>
      <div className="flex h-screen flex-row md:flex-row md:overflow-hidden">
        {isEditing && <InputForm activity={selectedActivity} />}
        {isAdding && <InputForm activity={selectedActivity} />}
        <div className="w-full flex-none md:w-64 md:static fixed z-40">
          <SideNav />
        </div>
        <div className="flex-grow p-6 md:overflow-y-auto md:p-12">
          {children}
        </div>
      </div>
    </ActivitiesProvider>
  );
}

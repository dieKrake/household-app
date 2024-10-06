"use client";

import { useContext, useState, createContext } from "react";

interface EditingContextType {
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditingContext = createContext<EditingContextType | undefined>(undefined);

export const EditingProvider = ({ children }: any) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <EditingContext.Provider value={{ isEditing, setIsEditing }}>
      {children}
    </EditingContext.Provider>
  );
};

export const useEditingContext = () => {
  const context = useContext(EditingContext);

  if (!context) {
    throw new Error("useEditingContext must be used within an EditingProvider");
  }

  return context;
};

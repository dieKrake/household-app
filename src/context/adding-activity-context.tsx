"use client";

import { useContext, useState, createContext } from "react";

interface AddingContextType {
  isAdding: boolean;
  setIsAdding: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddingContext = createContext<AddingContextType | undefined>(undefined);

export const AddingProvider = ({ children }: any) => {
  const [isAdding, setIsAdding] = useState(false);

  return (
    <AddingContext.Provider value={{ isAdding, setIsAdding }}>
      {children}
    </AddingContext.Provider>
  );
};

export const useAddingContext = () => {
  const context = useContext(AddingContext);

  if (!context) {
    throw new Error("useAddingContext must be used within an AddingProvider");
  }

  return context;
};

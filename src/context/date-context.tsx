"use client";

import { useContext, useState, createContext, useEffect } from "react";
import { isMonday } from "@/functions/check-date-function";

interface DateContextType {
  isProgressZeroed: boolean;
  setIsProgressZeroed: React.Dispatch<React.SetStateAction<boolean>>;
}

const DateContext = createContext<DateContextType | undefined>(undefined);

export const DateProvider = ({ children }: any) => {
  const [isProgressZeroed, setIsProgressZeroed] = useState(false);

  useEffect(() => {
    const checkedMonday = isMonday();
    if (checkedMonday) {
      console.log("Delete Progress");
      return;
    } else {
      console.log("Do nothing");
      return;
    }
  }, []);

  return (
    <DateContext.Provider value={{ isProgressZeroed, setIsProgressZeroed }}>
      {children}
    </DateContext.Provider>
  );
};

export const useDateContext = () => {
  const context = useContext(DateContext);

  if (!context) {
    throw new Error("useDateContext must be used within an EditingProvider");
  }

  return context;
};

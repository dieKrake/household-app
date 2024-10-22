import { useState, useEffect } from "react";

export default function DateBox() {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    // Funktion zum Aktualisieren der Zeit
    const updateTime = () => {
      const now = new Date();
      const formattedTime = now.toLocaleTimeString("de-DE", {
        hour: "2-digit",
        minute: "2-digit",
      });
      const formattedDate = now.toLocaleDateString("de-DE", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
      });
      setCurrentTime(`${formattedTime}, ${formattedDate}`);
    };

    // Initiale Zeit setzen
    updateTime();

    // Aktualisieren der Zeit jede Minute
    const interval = setInterval(updateTime, 60000);

    // Cleanup des Intervalls bei unmount
    return () => clearInterval(interval);
  }, []);

  return <div className="text-lg font-semibold">{currentTime}</div>;
}

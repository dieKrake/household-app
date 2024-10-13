"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function LoadingCircle() {
  const smallScreenRadius = 23;
  const smallScreenDots = 25;
  const bigScreenRadius = 30;
  const bigScreenDots = 40;
  const [radius, setRadius] = useState(bigScreenRadius);
  const [numberOfDots, setDots] = useState(bigScreenDots);

  const calculateDots = (radius: number) => {
    return Array.from({ length: numberOfDots }, (_, index) => {
      const angle = (index / numberOfDots) * 2 * Math.PI;
      const x = radius * Math.cos(angle);
      const y = radius * Math.sin(angle);
      return { x, y };
    });
  };

  const dots = calculateDots(radius);

  // Hook zur Überwachung der Bildschirmgröße und Anpassung des Radius
  useEffect(() => {
    const updateRadius = () => {
      if (window.innerWidth < 768) {
        setRadius(smallScreenRadius);
        setDots(smallScreenDots);
      } else {
        setRadius(bigScreenRadius);
        setDots(bigScreenDots);
      }
    };

    updateRadius();
    window.addEventListener("resize", updateRadius);

    return () => window.removeEventListener("resize", updateRadius);
  }, []);

  return (
    <div className="flex w-full h-64 items-center justify-center md:mt-0 mt-28">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          duration: 0.65,
          ease: "linear",
        }}
        className="relative h-64 w-64 flex items-center justify-center"
      >
        {dots.map((dot, index) => (
          <div
            key={index}
            className="absolute shadow-2xl bg-gray-400 dark:bg-semiLight md:h-2 md:w-2 w-2 h-2  rounded-full"
            style={{
              transform: `translate(${dot.x}px, ${dot.y}px)`,
              opacity: index * (1 / 20),
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/ui/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        // Greenish colors
        oceanDark: "#003B46",
        oceanSemiDark: "#07575B",
        oceanSemiLight: "#66A5AD",
        oceanLight: "#C4DFE6",

        // Pinkish colors
        // oceanDark: "#805974",
        // oceanSemiDark: "#A57497",
        // oceanSemiLight: "#BF60A3",
        // oceanLight: "#E6CFDF",

        // Brown colors
        // oceanDark: "#807259",
        // oceanSemiDark: "#BF9E60",
        // oceanSemiLight: "#CCB68F",
        // oceanLight: "#E6DDCF",

        // Blue colors
        // oceanDark: "#00467F",
        // oceanSemiDark: "#0064B5",
        // oceanSemiLight: "#80C6FF",
        // oceanLight: "#BFE2FF",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
  darkMode: "class",
};
export default config;

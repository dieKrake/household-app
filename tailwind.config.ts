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
        dark: "#003B46",
        semiDark: "#07575B",
        semiLight: "#66A5AD",
        light: "#C4DFE6",

        // Pinkish colors
        // dark: "#805974",
        // semiDark: "#A57497",
        // semiLight: "#BF60A3",
        // light: "#E6CFDF",

        // Brown colors
        // dark: "#807259",
        // semiDark: "#BF9E60",
        // semiLight: "#CCB68F",
        // light: "#E6DDCF",

        // Blue colors
        // dark: "#00467F",
        // semiDark: "#0064B5",
        // semiLight: "#80C6FF",
        // light: "#BFE2FF",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
  darkMode: "class",
};
export default config;

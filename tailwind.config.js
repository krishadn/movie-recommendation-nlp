const {nextui} = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        pfbg: "#f9d500",
        primary: "#db7d2f",
        secondary: "#a10f0f",
      },
      fontFamily :{ 
        busorama: ["Busorama","serif"], 
        aachen: ["Aachen","serif"], 
        poppins: ["Poppins", "serif"],
      } 
    },
  },
  // darkMode: "class",
  plugins: [nextui(),],
};

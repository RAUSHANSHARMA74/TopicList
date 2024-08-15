/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Custom background images
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      // Example: Custom colors
      colors: {
        skyBlue: "#009CC6",
        sunsetOrange: "#FFA939",
        lightBeige: "#F9F3EE",
        lightBlue: "#70CDE5",
        darkBlue: "#28374D",
        red: "#E34949",
        grey: "#EEEEEE",
        lightGreen: "#35B8A0",
      },
    },
  },
  plugins: [],
};

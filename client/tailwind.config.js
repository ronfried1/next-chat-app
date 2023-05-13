/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  darkmode: "class",
  daisyui: {
    themes: ["dark", "cmyk"],
  },
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    container: {
      center: true,
    },
    fontFamily: {
      sans: ["Graphik", "sans-serif"],
      serif: ["Merriweather", "serif"],
    },
    extend: {
      // colors: {
      //   blue: "#1fb6ff",
      //   purple: "#7e5bef",
      //   pink: "#ff49db",
      //   orange: "#ff7849",
      //   green: "#13ce66",
      //   yellow: "#ffc82c",
      //   // "gray-dark": "#2c313d",
      //   // gray: "#8492a6",
      //   // "gray-light": "#d3dce6",
      // },
      // spacing: {
      //   128: "32rem",
      //   144: "36rem",
      // },
      // borderRadius: {
      //   "4xl": "2rem",
      // },
    },
  },
  plugins: [require("daisyui")],
};

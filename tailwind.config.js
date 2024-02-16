/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      height: {
        112: "28rem",
      },
      screens: {
        sm: "375px",

        md: "960px",

        lg: "1440px",
      },
    },
  },
  plugins: [],
};

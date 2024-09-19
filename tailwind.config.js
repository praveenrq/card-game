/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      scale: {
        175: "1.75",
        185: "1.85",
        190: "1.90",
        200: "2",
        225: "2.25",
        250: "2.5",
      },
    },
  },
  plugins: [],
};

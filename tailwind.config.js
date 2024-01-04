/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{tsx,ts}"],
  theme: {
    extend: {
      colors: {
        primary: "#f18121",
        secondary: "#1F2833",
        tertiary: "#C5C6C7",
        quaternary: "#66FCF1",
      },
      fontFamily: {
        sans: ["Roboto", "sans-serif"],
      },
      fontSize: {
        "2xs": "0.5rem",
      },
      spacing: {
        "1/2": "50%",
      },
      minHeight: {
        0: "0",
        "1/4": "25%",
        "1/2": "50%",
        "3/4": "75%",
      },
    },
  },
  plugins: [
  ],
}


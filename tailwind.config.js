/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{tsx,ts}"],
  theme: {
    extend: {
      colors: {
        "primary": "#4c657e", // Màu đỏ chủ đạo
        "primary-hover": "#fff", // Màu đỏ nhạt
        "header": "#4c657e",
        "header-text": "#ffffff",
        "header-button": "#5f7891",
        "navbar": "#e4e4e4",
        "navbar-text": "#000",
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
      container: {
        center: true,
        padding: {
          DEFAULT: "0.5rem",
          md: "1rem",
        },
        screens: {
          default: "100%",
          xl: "1300px",
        },

      },
    },
  },
  plugins: [
  ],
}


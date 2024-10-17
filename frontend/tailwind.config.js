/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#05b6d3",
        secondary: "ef863e"
      }
    },
    fontFamily: {
      display: ["Poppins", "sans-serif"]
    },
    backgroundImage: {
      "login-bg-img" : "url('./src/assets/images/bg-image.png')",
      "signup-bg-img" : "url('./src/assets/images/signup-bg-img.png')"
    }
  },
  plugins: [],
}
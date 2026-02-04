/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0f1b2d",
        slate: "#4b5b73",
        mist: "#f4f7fb",
        accent: "#3c7dff",
        accentSoft: "#dfe9ff"
      },
      boxShadow: {
        card: "0 18px 40px rgba(15, 27, 45, 0.08)",
        soft: "0 10px 24px rgba(15, 27, 45, 0.08)"
      },
      fontFamily: {
        sans: ["Noto Sans KR", "sans-serif"],
        display: ["Noto Sans KR", "sans-serif"],
        body: ["Noto Sans KR", "sans-serif"]
      },
      backgroundImage: {
        "hero-radial": "radial-gradient(circle at top left, #e7f0ff 0%, #ffffff 55%)",
        "section-grid": "linear-gradient(120deg, rgba(60, 125, 255, 0.08), transparent 65%)"
      }
    }
  },
  plugins: []
};

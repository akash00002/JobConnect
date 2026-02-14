/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  darkMode: "class", // ADD THIS LINE
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#135bec",
          secondary: "#4f46e5",
        },
        neutral: {
          200: "#e2e8f0",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
        },
        background: {
          light: "#f6f6f8",
          dark: "#101622",
        },
        surface: {
          light: "#ffffff",
          dark: "#1a2235",
        },
        error: "#ef4444",
      },
      fontFamily: {
        display: ["Inter", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.5rem",
        xl: "0.75rem",
        "2xl": "1rem",
        full: "9999px",
      },
      boxShadow: {
        soft: "0 4px 20px -2px rgba(0, 0, 0, 0.05)",
        glow: "0 0 15px rgba(19, 91, 236, 0.3)",
      },
    },
  },
  plugins: [],
};

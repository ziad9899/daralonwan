/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        sand: "#F7F3EA",
        ink: "#1F2933",
        "ink-soft": "#4B5563",
        gold: {
          DEFAULT: "#B68A35",
          deep: "#92701F",
          soft: "#E5C97A",
        },
        emerald: {
          brand: "#0F766E",
          deep: "#0B5A55",
        },
        line: "#E7E0CF",
      },
      fontFamily: {
        sans: ['"Tajawal"', '"Cairo"', "system-ui", "sans-serif"],
        display: ['"Cairo"', '"Tajawal"', "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 4px 20px rgba(31, 41, 51, 0.06)",
        card: "0 8px 30px rgba(31, 41, 51, 0.08)",
        gold: "0 6px 24px rgba(182, 138, 53, 0.25)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      maxWidth: {
        wrap: "1240px",
      },
    },
  },
  plugins: [],
};

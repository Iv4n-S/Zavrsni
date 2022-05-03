// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    fontSize: {
      xxs: ".65rem",
      lg: "1.125rem",
      xxxl: "1.875rem",
    },
    fontWeight: {
      semibold: 600,
    },
    extend: {
      animation: {},
      keyframes: {},
    },
    screens: {
      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "970px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }
    },
  },
  plugins: [],
};
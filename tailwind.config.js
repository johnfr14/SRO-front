module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: "media", // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#DAD6EF",
          200: "#ffd700",
          300: "#ffd700",
          400: "#211B49",
          500: "#0F0F13",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

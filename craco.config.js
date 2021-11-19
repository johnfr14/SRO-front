module.exports = {
  style: {
    postcss: {
      plugins: [require("tailwindcss"), require("autoprefixer"), require("@netlify/plugin-nextjs")],
    },
  },
};

const { colors: defaultColors } = require("tailwindcss/defaultTheme");

const colors = {
  ...defaultColors,
  ...{
    orange: {
      500: "#EF4A27",
    },
  },
};

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    colors: colors,
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

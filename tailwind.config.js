const { colors: defaultColors } = require("tailwindcss/defaultTheme");

const colors = {
  ...defaultColors,
  ...{
    orange: {
      500: "#EF4A27",
    },
    myPurple: {
      500: "#6F5CE0",
    },
    googleBlue: {
      500: "#1A0DAB",
    },
    googleRed: {
      500: "#EA4335"
    }
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

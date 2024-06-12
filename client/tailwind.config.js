const withMT = require("@material-tailwind/react/utils/withMT");

export default withMT({
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "golden-yellow": "#eeba2c",
        "custom-gray-50": "#1c1b1b",
        "custom-gray-100": "#121212",
      },
    },
  },
  plugins: [],
});

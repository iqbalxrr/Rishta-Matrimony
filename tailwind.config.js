import flowbite from 'flowbite/plugin';
import lightswind from 'lightswind/plugin';

export default {
  darkMode: 'media',
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/flowbite-react/**/*.js",
    "./node_modules/flowbite/**/*.js",
    "./node_modules/lightswind/**/*.js", // lightswind-এর জন্য extra line
  ],
  theme: {
    extend: {},
  },
  plugins: [
    flowbite,
    lightswind, // add this line
  ],
}

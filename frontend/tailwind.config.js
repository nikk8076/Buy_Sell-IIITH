/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors : {
        Blue : "#255855",
        Red : "#B82132",
        Brown : "#874F41",
        lightBlue : "#90AEAD",
        Gray : "#D3D9D4",
      }
    },
  },
  plugins: [],
}
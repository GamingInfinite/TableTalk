// tailwind.config.js
module.exports = {
  mode: "jit",
  content: ["./public/**/*.html", "./src/**/*.{js,jsx,ts,tsx,vue,svelte}"],
  plugins: [require("daisyui")],
  // specify other options here

  daisyui: {
    themes: ["dark"]
  }
};

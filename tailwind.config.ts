import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        landing: {
          primary: "hsl(177, 100%, 35%)",
          accent: "hsl(190, 95%, 42%)",
          "bg-light": "hsl(210, 20%, 98%)",
          "bg-dark": "hsl(220, 35%, 7%)",
          text: "hsl(220, 20%, 12%)",
        },
      },
      fontFamily: {
        yekan: ["Yekan", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 20px rgba(0, 181, 173, 0.3)",
      },
    },
  },
  plugins: [],
};

export default config;

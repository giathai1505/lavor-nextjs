import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        ast: ["var(--font-assistant)"],
      },
      colors: {
        primary: "#f47a20",
        secondaryBackground: "#000000e8",
        adminPrimary: "#0F172A",
        borderColor: "#E2E8EF",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
export default config;

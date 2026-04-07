import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      backdropBlur: {
        xs: "1px",
      },
    },
  },
  plugins: [],
};

export default config;

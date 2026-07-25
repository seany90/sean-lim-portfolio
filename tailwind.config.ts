import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryBg: '#050505',
        secondaryBg: '#111111',
        textMain: '#F8F8F8',
        textSecondary: '#BFBFBF',
        accent: '#71E7FF',
        secondaryAccent: '#7B61FF',
        success: '#65F3A4',
      },
      fontFamily: {
        heading: ['Talea', 'Canela', 'Neue Montreal', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        display: ['Funnel Display', 'sans-serif'],
      },
      backgroundImage: {
        'volumetric-gradient': 'radial-gradient(circle at 50% 50%, rgba(113, 231, 255, 0.1) 0%, rgba(5, 5, 5, 1) 70%)',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(113, 231, 255, 0.05)',
      }
    },
  },
  plugins: [],
};
export default config;

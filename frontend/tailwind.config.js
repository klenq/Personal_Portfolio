/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-primary': '#1a1a1a',
        'dark-secondary': '#242424',
        'dark-tertiary': '#2d2d2d',
        'cream': '#F4EFEA',
        'teal-accent': '#53DBC9',
        'blue-accent': '#6FC2FF',
        'blue-active': '#2BA5FF',
        'yellow-accent': '#FFDE00',
        'red-accent': '#FF7169',
      },
      fontFamily: {
        'mono': ['Courier New', 'monospace'],
        'inter': ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'geometric-sm': '-5px 5px 0px 0px #53DBC9',
        'geometric-md': '-8px 8px 0px 0px #53DBC9',
        'geometric-lg': '-12px 12px 0px 0px #53DBC9',
        'geometric-btn': '-6px 6px 0px 0px #F4EFEA',
        'geometric-btn-hover': '-8px 8px 0px 0px #F4EFEA',
      },
    },
  },
  plugins: [],
}

import type { Config } from 'tailwindcss'
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#adc6ff',
        'primary-container': '#4d8eff',
        'on-primary': '#002e6a',
        secondary: '#ffb690',
        'secondary-container': '#ec6a06',
        'on-secondary': '#552100',
        error: '#ffb4ab',
        'error-container': '#93000a',
        surface: '#0c1324',
        'surface-container': '#191f31',
        'surface-container-low': '#151b2d',
        'surface-container-high': '#23293c',
        'on-surface': '#dce1fb',
        background: '#0c1324',
      },
      fontFamily: {
        headline: ['Space Grotesk', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config

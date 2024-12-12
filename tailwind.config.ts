import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}', // Note the addition of the `app` directory.
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        customGradient: 'linear-gradient(180deg, backgroundColor 0%, primaryColor 100%)',
      },
      colors: {
        foreground: 'rgba(var(--foreground-color))',
        backgroundColor: 'rgba(var(--background-color))',
        primaryColor: 'rgba(var(--primary-color))',
        primaryDisabled: 'rgba(var(--primary-disabled-color))',
        inputBackgroundColor: 'rgba(var(--input-background-color))',
        placeholderColor: 'rgba(var(--placeholder-color))',
        borderColor: 'rgba(var(--border-color))',
        errorColor: 'rgba(var(--red-color))',
        successColor: 'rgba(var(--green-color))',
        warningColor: 'rgba(var(--orange-color))',
      },
      animation: {
        'spin-slow': 'spin-slow 10s linear infinite', // Yavaş dönen animasyon
        'custom-pulse': 'custom-pulse 3s infinite', // Pulse animasyonu
      },
      keyframes: {
        'spin-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'custom-pulse': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.2)' },
        },
      },
    },
  },
  plugins: [require('tailwindcss-animated')],
  darkMode: 'class',
};
export default config;

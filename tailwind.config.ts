import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  content: [
    './app/components/**/*.{vue,js,ts}',
    './app/layouts/**/*.vue',
    './app/pages/**/*.vue',
    './app/app.vue',
    './app/error.vue',
  ],
  theme: {
    extend: {
      colors: {
        // Fond sombre quasi-noir, utilisé pour les sections "night"
        ink: {
          DEFAULT: '#141414',
          soft: '#1c1c1c',
        },
        // Fond clair écru, utilisé pour les sections "day"
        paper: {
          DEFAULT: '#F7F6EB',
          soft: '#FAF9F5',
        },
        // Accents néon — un par parfum LUMÉA, à utiliser avec parcimonie
        accent: {
          pink: '#FF3EBA',
          lime: '#CEFF00',
          blue: '#4A60FF',
          green: '#31A362',
          amber: '#FFB43D',
        },
      },
      fontFamily: {
        display: ['Clash Display', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        xl2: '1.75rem',
        card: '0px',
      },
      maxWidth: {
        content: '1400px',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-14px)' },
        },
      },
      animation: {
        marquee: 'marquee 22s linear infinite',
        float: 'float 5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

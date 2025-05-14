/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      colors: {
        // border: 'rgb(229, 231, 235)', // 예시, 원하는 값으로 수정
        // ring: 'rgb(59, 130, 246)',
        // background: '#fff',
        // foreground: '#222',
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        border: 'var(--border)',
        input: 'var(--input)',
        ring: 'var(--ring)',
      },
    },
  },
  plugins: ['tw-animate-css', require('tailwindcss-animate')],
};

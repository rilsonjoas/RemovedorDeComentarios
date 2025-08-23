import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: { 
        'dark-bg': '#282c34',
        'container-bg': '#353a40',
        'input-bg': '#2c313a',
        'text-color': '#abb2bf',
        'text-color-light': '#dfe2e7',
        'accent-color': '#2976b6',
        'button-hover-bg': '#7bc6f8', 
        'border-color': '#21252b',
        'terminal-dots-red': '#ff5f57',
        'terminal-dots-yellow': '#febc2e',
        'terminal-dots-green': '#28c840',
        'placeholder-text': '#6c757d', 
      },
      fontFamily: { 
        primary: ['Roboto', 'sans-serif'],
        code: ['Fira Code', 'monospace'],
      },
    },
  },
  plugins: [],
}
export default config
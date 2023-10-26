/** @type {import('tailwindcss').Config} */
import { figmaTokensToStyleDictionary } from './scripts/designTokensGenerator/tokenConverter';
const {
  fontFamilies, colors,
} = figmaTokensToStyleDictionary();

module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './common/designSystem/**/*.{js,ts,jsx,tsx,mdx}',
    './common/components/**/*.{js,ts,jsx,tsx,mdx}',
    './common/theme/themeElements.ts',
  ],
  theme: {
    fill: {
      current: 'currentColor',
    },
    extend: {
      colors,
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        primary: fontFamilies.primary.var,
      },
      screens: {
        'mdsm': '680px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

// py classes on elements with border may differ from figma values because figma applies border inside element and browser applies it outside,
// so we need to compensate that difference by reducing horizontal padding
export const themeElements = {
  buttons: {
    solid: {
      style: `flex items-center justify-center bg-rose-200 text-black rounded enabled:hover:bg-rose-400
disabled:bg-grey-300 disabled:cursor-not-allowed`,
      size: {
        sm: 'px-4 py-2 font-semibold text-sm',
        md: 'px-4 py-2.5 font-semibold text-base',
        lg: 'px-4 py-3.5 font-semibold text-base',
      },
    },
    outlined: {
      style: `flex items-center justify-center bg-white border border-solid border-rose-300 text-rose-300 rounded enabled:hover:bg-rose-400
enabled:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed`,
      size: {
        sm: 'px-4 py-2 font-semibold text-sm',
        md: 'px-4 py-2.5 font-semibold text-base',
        lg: 'px-4 py-3.5 font-semibold text-base',
      },
    },
    circular: {
      style: `inline-flex items-center justify-center bg-rose-200 rounded-full text-white enabled:hover:bg-rose-400
disabled:opacity-50 disabled:cursor-not-allowed`,
      size: {
        sm: 'p-2',
        md: 'p-3',
        lg: 'p-4',
      },
    },
  },
  typography: {
    'heading-xs': 'text-lg',
    'heading-sm': 'text-xl',
    'heading-md': 'text-2xl',
    'heading-lg': 'text-3xl',
    'heading-xl': 'text-4xl',
    'heading-2xl': 'text-5xl',
    'body-xs': 'text-xs',
    'body-sm': 'text-sm',
    'body-md': 'text-base',
    'body-lg': 'text-lg',
    'body-xl': 'text-xl',
    'body-2xl': 'text-2xl',
    'body-3xl': 'text-3xl',
    'body-4xl': 'text-4xl',
    'body-5xl': 'text-5xl',
    'body-6xl': 'text-6xl',
    'body-7xl': 'text-7xl',
    'body-8xl': 'text-8xl',
    'body-9xl': 'text-9xl',
    'span-xs': 'text-xs',
    'span-sm': 'text-sm',
    'span-md': 'text-base',
  },
}

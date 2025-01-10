import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  mode: 'jit',
  theme: {
    colors: {
      white: 'var(--white)',
      black: 'var(--black)',
      red: 'var(--custom-red)',
      teal: 'var(--teal)',
      lightBlue: 'var(--light-blue)',
      green: 'var(--green)',
      darkGrey: 'var(--dark-grey)',
      mediumGrey: 'var(--medium-grey)',
      lightGrey: 'var(--light-grey)',
      error: 'var(--red)'
    },
    extend: {
      fontFamily: {
        Lato: ['Lato', 'sans-serif'],
        PTSerif: ['PTSerif', 'serif']
      },
      maxWidth: {
        'screen-3xl': '1920px',
        'screen-4xl': '2560px'
      },
      aspectRatio: {
        '21/9': '21 / 9',
        '32/9': '32 / 9'
      }
    }
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          ...require('daisyui/src/theming/themes')['fantasy'],
          primary: '#0b3c49',
          secondary: '#731963',
          neutral: '#3D4451',
          info: '#3ABFF8',
          success: '#6BB900',
          warning: '#FBBD23',
          error: '#F87272'
        }
      }
    ]
  },
  variants: {},
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [require('@tailwindcss/typography'), require('daisyui')]
} as Config;

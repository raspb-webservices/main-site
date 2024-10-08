import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
    colors: {
      white: '#FFFFFF',
      black: '#000000',
      successGreen: '#6BB900',
      error: '#B22222',
    },
    extend: {
      fontFamily: {
        Lato: ['Lato', 'sans-serif'],
        PTSerif: ['PTSerif', 'serif']
      }
    }
	},
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#F19405',
          secondary: '#000000',
          accent: '#37CDBE',
          neutral: '#3D4451',
          info: '#3ABFF8',
          success: '#6BB900',
          warning: '#FBBD23',
          error: '#F87272',
        }
      }
    ]
  },

	// eslint-disable-next-line @typescript-eslint/no-require-imports
	plugins: [require('@tailwindcss/typography'), require('daisyui')]
} as Config;

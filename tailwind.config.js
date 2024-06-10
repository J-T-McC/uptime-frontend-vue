module.exports = {
  purge: {
    preserveHtmlElements: false,
    content: [
      './index.html',
      './src/**/*.{vue,js,ts,jsx,tsx}',
    ],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {

      },
      animation: {
        'pulse-slow': 'pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'pulse-full-quick': 'pulse-full 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'ping-slow': 'ping 6s cubic-bezier(0, 0, 0.2, 1) infinite;',
        'gradient-x': 'gradient-x 15s ease infinite',
        'gradient-y': 'gradient-y 15s ease infinite',
        'gradient-xy': 'gradient-xy 15s ease infinite',
      },
      keyframes: {
        'pulse-full': {
          '0%, 100%': {
            'opacity': '1',
          },

          '50%': {
            'opacity': '.1',
          },
        },
        'gradient-xy': {
          '0%, 100%': {
            'background-size': '400% 400%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          }
        }
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}

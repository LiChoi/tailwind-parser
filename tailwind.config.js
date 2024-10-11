module.exports = {
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".section-base": {
          "@apply container": {}
        },
        ".section-display": {
          "@apply flex justify-center mx-auto": {}
        },
        ".section-heading": {
          "@apply text-3xl font-bold leading-tight tracking-tight text-gray-900 md:text-4xl": {}
        },
        ".btn": {
          "@apply inline-block w-full px-4 py-2 text-base font-medium leading-4 text-center border rounded-md shadow-sm focus:ring-2 focus:ring-opacity-50 md:text-lg": {}
        },
        ".btn-lg": {
          "@apply px-6 py-4": {}
        },
        ".btn-md": {
          "@apply px-4 py-2": {}
        },
        ".btn-sm": {
          "@apply px-2 py-1": {}
        },
        ".btn-primary": {
          "@apply bg-primary-500 border-primary-500 text-on-primary hover:bg-primary-600 focus:ring-primary-500": {}
        },
        ".btn-outline": {
          "@apply text-gray-800 bg-white border border-gray-400 hover:bg-gray-200 focus:ring-gray-200": {}
        }
      };
      addUtilities(newUtilities, ['responsive', 'hover']);
    }
  ]
}
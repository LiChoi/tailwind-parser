const Values = require("values.js");

const generateConfig = (theme = {}) => {
  const sectionPadding = theme.apply_default_padding
    ? "py-12 px-4 sm:px-6 lg:py-16 lg:px-8"
    : `px-[${theme.horizontal_padding_mobile}${theme.padding_unit_type}] sm:px-[${theme.horizontal_padding_desktop}${theme.padding_unit_type}] py-[${theme.vertical_padding_mobile}${theme.padding_unit_type}] sm:py-[${theme.vertical_padding_desktop}${theme.padding_unit_type}]`;
  const primaryColor = new Values(theme.color_primary || "#4263eb");
  const primaryShades = primaryColor.all(18).map((shade) => shade.hexString());

  return {
    theme: {
      extend: {
        colors: {
          primary: {
            DEFAULT: primaryShades[5],
            50: primaryShades[0],
            100: primaryShades[1],
            200: primaryShades[2],
            300: primaryShades[3],
            400: primaryShades[4],
            500: primaryShades[5],
            600: primaryShades[6],
            700: primaryShades[7],
            800: primaryShades[8],
            900: primaryShades[9]
          },
          on: {
            primary: theme.color_on_primary || "#FFFFFF"
          },
        },
      },
    },
    plugins: [
      require("@tailwindcss/forms"),
      function ({ addUtilities }) {
        const newUtilities = {
          ".section-base": {
            "@apply container": {}
          },
          ".section-padding": {
            [`@apply ${sectionPadding} flex justify-center mx-auto`]: {}
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
}

module.exports = generateConfig;
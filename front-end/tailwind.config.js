/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
			colors: {
				'primary': '#E32424',
				'secondary': '#E3E2E2'
			},
			fontFamily: {
				'poppins': ['/public/fonts/Poppins-Regular.ttf'],
			}
		},
  },
  plugins: [],
}


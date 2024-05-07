/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
			colors: {
				'primary': '#E32424',
				'secondary': '#F2F4F9'
			},
			fontFamily: {
				'poppins': ['/public/fonts/Poppins-Regular.ttf'],
				'poppinsBold': ['/public/fonts/Poppins-Bold.ttf'],
			}
		},
  },
  plugins: [],
}


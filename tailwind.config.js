/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    fontFamily:{
			Lato:"Lato, sans-serif",
		  Sans:"Open Sans, sans-serif",
			Young:"Young Serif, serif",
		},
    extend: {
      colors:{
        background_dark:"#1F1F1F",
        background_navbar:"#0F0F0F",
        background_navbar_item:"#1A1A1A",
        color_white:"#FFFFFF",
        text_navbar_color:"#BFBFBF",
        text_gray_color:"#999999",
        
      },
      height:{
        screen_full:"100dvh"
      },
    },
  },
  plugins: [],
}
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    
  ],
  theme: {
    extend: {
      backgroundColor: {
        Invent: '#E1C59C',
        
      },
      colors:{
        Chiqui:'rgba(0, 0, 0, 0.40)',
        Slet:'#6070FF' // Define el color personalizado y asigna un nombre
      },
      fontFamily:{
        Mont: ['Montserrat', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    
  ],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundColor: {
       
        Invent: '#E1C59C',
        DarkFondo:"#292929",
        DarkComponent:"#484848",
        Component:"#443E47",
        ChilComponn:"#282833",
        NavLinks:"#787878",
        
      },
      colors:{
        Chiqui:'rgba(0, 0, 0, 0.40)',
        Slet:'#6070FF', // Define el color personalizado y asigna un nombre
        Title:"#3b4fff",
      },
      fontFamily:{
        Mont: ['Montserrat', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
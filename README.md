# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

@tailwind base;
@tailwind components;
@tailwind utilities;

/_ CustomScrollbar.css _/
@media (min-width: 700px) {
/_ Estilos para tamaños de pantalla 'lg' o más grandes _/
.custom-scrollbar {
/_ Añade scroll-snap-type para controlar el comportamiento del scroll _/
scroll-snap-type: y proximity;
scroll-behavior: smooth; /_ Hace que el scroll sea suave _/
}

.custom-scrollbar::-webkit-scrollbar {
width: 10px; /_ Ancho del scrollbar en pantallas grandes _/
}

.custom-scrollbar::-webkit-scrollbar-thumb {
background-color: #888; /_ Color del thumb en pantallas grandes _/
border-radius: 5px; /_ Bordes redondeados para el thumb en pantallas grandes _/
}

.custom-scrollbar::-webkit-scrollbar-track {
background-color: #f1f1f1; /_ Color del fondo del scrollbar en pantallas grandes _/
border-radius: 5px; /_ Bordes redondeados para el fondo del scrollbar en pantallas grandes _/
}
}
.switch {
position: relative;
display: inline-block;
width: 50px;
height: 22px;
}

@media (min-width: 700px) {
/_ Estilos para tamaños de pantalla 'lg' o más grandes _/
.custom-scrollNav {
/_ Añade scroll-snap-type para controlar el comportamiento del scroll _/
scroll-snap-type: y proximity;
scroll-behavior: smooth; /_ Hace que el scroll sea suave _/
}

.custom-scrollNav::-webkit-scrollbar {
width: 1px; /_ Ancho del scrollbar en pantallas grandes _/
}

.custom-scrollNav::-webkit-scrollbar-thumb {
background-color: #888; /_ Color del thumb en pantallas grandes _/
border-radius: 5px; /_ Bordes redondeados para el thumb en pantallas grandes _/
}

.custom-scrollNav::-webkit-scrollbar-track {
background-color: #f1f1f1; /_ Color del fondo del scrollbar en pantallas grandes _/
border-radius: 5px; /_ Bordes redondeados para el fondo del scrollbar en pantallas grandes _/
}
}

/\*\*

-
-
- This CSS file contains custom styles for the Quill text editor in a React application.
-
- The styles include:
- - Removing the border from the toolbar and container
- - Setting the background color of the toolbar and container to white
- - Adding a border radius of 7px to the toolbar
- - Setting the background color of the formats button on hover to #aaaaaa
- - Adding a border radius of 3px to the formats button on hover
- - Setting the color of the formats button on hover to white
- - Adding a scrollbar to the editor with a width of 10px and a background color of #f1f1f1
- - Adding a thumb to the scrollbar with a background color of #888 and border radius of 5px
- - Adding a track to the scrollbar with a background color of #f1f1f1 and border radius of 5px
    _/
    /_ Custom Css Qrill to react \*/

.ql-toolbar {
background-color: white !important;
border-radius: 7px;
border: 1px solid gray !important;
}
.ql-container {
background-color: white !important;
margin-top: 12px !important;
border: none !important;
border-radius: 8px;
}
.ql-formats > button:hover {
background-color: #aaaaaa !important;
border-radius: 3px;
color: white;
transition: all ease-in 0.2s;
}

.ql-editor {
}
.ql-editor::-webkit-scrollbar {
width: 10px; /_ Ancho del scrollbar en pantallas grandes _/
}
.ql-editor::-webkit-scrollbar-thumb {
background-color: #888; /_ Color del thumb en pantallas grandes _/
border-radius: 5px; /_ Bordes redondeados para el thumb en pantallas grandes _/
}

.ql-editor::-webkit-scrollbar-track {
background-color: #f1f1f1; /_ Color del fondo del scrollbar en pantallas grandes _/
border-radius: 5px; /_ Bordes redondeados para el fondo del scrollbar en pantallas grandes _/
}

/_ Fin the custom Qrill to react _/

/_ Hide default HTML checkbox _/
.switch input {
opacity: 0;
width: 0;
height: 0;
}

/_ The slider _/
.slider {
position: absolute;
cursor: pointer;
top: 0;
left: 0;
right: 0;
bottom: 0;
background-color: #ccc;
-webkit-transition: 0.4s;
transition: 0.4s;
}

.slider:before {
position: absolute;
content: "";
height: 14px;
width: 14px;
left: 4px;
bottom: 4px;
background-color: white;
-webkit-transition: 0.4s;
transition: 0.4s;
}

input:checked + .slider {
background-color: #2196f3;
}

input:focus + .slider {
box-shadow: 0 0 1px #2196f3;
}

input:checked + .slider:before {
-webkit-transform: translateX(26px);
-ms-transform: translateX(26px);
transform: translateX(26px);
}

/_ Rounded sliders _/
.slider.round {
border-radius: 34px;
}

.slider.round:before {
border-radius: 50%;
}

.CustomScroll {
scroll-snap-type: y proximity;
scroll-behavior: smooth; /_ Hace que el scroll sea suave _/
}
.CustomScroll::-webkit-scrollbar {
width: 10px; /_ Ancho del scrollbar en pantallas grandes _/
}
.CustomScroll::-webkit-scrollbar-thumb {
background-color: #888; /_ Color del thumb en pantallas grandes _/
border-radius: 5px; /_ Bordes redondeados para el thumb en pantallas grandes _/
}

.CustomScroll::-webkit-scrollbar-track {
background-color: #f1f1f1; /_ Color del fondo del scrollbar en pantallas grandes _/
border-radius: 5px; /_ Bordes redondeados para el fondo del scrollbar en pantallas grandes _/
}
@import url('https://cdn-uicons.flaticon.com/uicons-regular-rounded/css/uicons-regular-rounded.css');
@import "~@flaticon/flaticon-uicons/css/all/all";
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&family=Open+Sans:wght@300;400;500;600&display=swap');

/_ Resto de tus estilos _/
body {
font-family: "Montserrat", system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
@layer components {
.form-input {
@apply w-full p-2 text-sm border-2 rounded-md outline-none focus:border-blue-500/40 dark:bg-DarkComponent dark:text-white/80 dark:border-DarkColor;
}
.AsideDots {
@apply border dark:border-white/20 dark:bg-[#262626] bg-white z-50 p-1.5 rounded-md shadow-md;
}
.control-input{
@apply px-2 text-sm py-2 rounded-md border w-full bg-white focus:border-black/30 text-black focus:border-blue-400 focus:border-spacing-0.5
dark:bg-black/10 dark:border-white/20 dark:focus:border-white/50 dark:text-white
}

}
textarea{
field-sizing: content;
max-width: 100%;
min-height: 100px;
max-height: 220px;
@apply px-2 text-sm py-2 rounded-md border w-full bg-white focus:border-black/30 text-black focus:border-blue-400 focus:border-spacing-0.5
dark:bg-black/10 dark:border-white/20 dark:focus:border-white/50 dark:text-white
}

/\*_ @type {import('tailwindcss').Config} _/

export default {
content: [
"./index.html",
"./src/**/\*.{js,ts,jsx,tsx}",
'./pages/**/_.{js,ts,jsx,tsx}',
'./components/\*\*/_.{js,ts,jsx,tsx}',

],
darkMode: 'class',
theme: {
extend: {
backgroundColor: {
DarkFondo:"#292929",
DarkComponent:"#484848",
Component:"#443E47",
ChilComponn:"#282833",
NavLinks:"#787878",
Chiqui:'rgba(0, 0, 0, 0.40)',
Slet:'#6070FF', // Define el color personalizado y asigna un nombre
Title:"#3b4fff",
},
colors:{
Chiqui:'rgba(0, 0, 0, 0.40)',
Slet:'#6070FF', // Define el color personalizado y asigna un nombre
Title:"#3b4fff",
},
fontFamily:{
Mont: ['Montserrat', 'sans-serif'],
},
borderColor:{
DarkColor:'#484848'
}
},
},
plugins: [require('daisyui'), require('@headlessui/tailwindcss')],
daisyui: {
themes: ["light"], // false: only light + dark | true: all themes | array: specific themes like this ["light", "dark", "cupcake"]
darkTheme: "dark", // name of one of the included themes for dark mode
base: true, // applies background color and foreground color for root element by default
styled: true, // include daisyUI colors and design decisions for all components
utils: true, // adds responsive and modifier utility classes
prefix: "", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
themeRoot: ":root", // The element that receives theme color CSS variables
},
}

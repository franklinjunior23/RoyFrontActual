import axios from "axios";


// eslint-disable-next-line no-undef
export const {VITE_API_DOMIN,VITE_TOKE_USER,VITE_API_VERSION,VITE_VERSION_APLICATION } = import.meta.env;


const axiosInstance = axios.create({
  baseURL: VITE_API_DOMIN+VITE_API_VERSION,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem(VITE_TOKE_USER); // Obtener el token almacenado en el localStorage
  if (token) {
    config.headers["Validation"] = token; // Agregar el token al encabezado de la solicitud
  }
  return config;
});


export default axiosInstance;
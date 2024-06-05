import {
  VITE_API_DOMIN,
  VITE_TOKE_USER,
} from "@/helpers/config/axios-instance";
import { useState } from "react";
import { createContext } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { io } from "socket.io-client";

const ProviderNotify = createContext();

export const UseDataSocketIO = () => {
  const context = useContext(ProviderNotify);
  return context;
};

export const ProviderNotification = ({ children }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    const socket = io(VITE_API_DOMIN, {
      auth: {
        token: localStorage.getItem(VITE_TOKE_USER),
      },
      transports: ["websocket"],
    });
    socket.on("connect", () => {
      socket.on("datosDesdeServidor", (datos) => {
        setData(datos);
        setTimeout(() => {
          setLoading(false);
        }, 5000);
      });
    });
  }, []);

  return (
    <ProviderNotify.Provider
      value={{
        notification: {
          data,
          loading,
          error,
        },
      }}
    >
      {children}
    </ProviderNotify.Provider>
  );
};

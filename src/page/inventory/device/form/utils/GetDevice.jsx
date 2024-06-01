import axiosInstance from "@/helpers/config/axios-instance";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

export function ActionGet(id) {
  return useQuery({
    queryKey: ["deviceGet"],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`Dispositivos/${id}`);
      return data;
    },
  });
}

export function SetValueDevice(data, setvalue) {
  try {
    const dataNew = FactoryDataDevice(data);
    const switchDevice = dataNew?.tipo;
    const deviceDetails = detailDevice[switchDevice] || [];
    deviceDetails.forEach(({ key, value }) => {
      const dataValue = dataNew?.[value];

      if (!dataValue || dataValue.length === 0) {
        setvalue(key, undefined);
      } else {
        setvalue(key, dataValue);
      }
    });
  } catch (error) {
    console.log(error);
  }
}

export function FactoryDataDevice(data) {
  // Hacemos una copia del objeto original para evitar modificarlo directamente
  // eslint-disable-next-line no-unused-vars
  const { DetalleDispositivo, historial, ...DataStorage } = data || [];

  return {
    ...DataStorage,
    ...(DetalleDispositivo && { ...DetalleDispositivo }), // Añadimos los detalles del dispositivo si existen
  };
}

const deviceConnectUser = [
  { key: "IdUser", value: "IdUser" },
  { key: "User", value: "User" },
  { key: "Area", value: "Areas" },
];

const detailDevice = {
  Pc: [
    { key: "nombre", value: "nombre" },
    { key: "Codigo", value: "codigo_dispositivo" },
    { key: "tipo", value: "tipo" },
    { key: "estado", value: "estado" },
    { key: "Marca", value: "marca" },
    { key: "tipo_Disp", value: "tipo_Disp" },
    { key: "marca", value: "marca" },
    { key: "modelo", value: "modelo" },
    //Red
    { key: "Config_ip", value: "Config_ip" },
    { key: "Config_mac", value: "Config_mac" },

    //Placa Madre
    { key: "Placa_modelo", value: "Placa_modelo" },
    { key: "Placa_detalle", value: "Placa_detalle" },
    { key: "Placa_slots", value: "Placa_slots" },

    // Procesador
    { key: "Procesador_marca", value: "Procesador_marca" },
    { key: "Procesador_modelo", value: "Procesador_modelo" },

    //Ram
    { key: "Ram_Modulos", value: "Ram_Modulos" },

    //Almacenamiento
    { key: "Almacenamiento_detalle", value: "Almacenamiento_detalle" },
    { key: "Tarjeta_Video", value: "Tarjeta_Video" },
    ...deviceConnectUser,
  ],
  Laptop: [
    { key: "nombre", value: "nombre" },
    { key: "Codigo", value: "codigo_dispositivo" },
    { key: "tipo", value: "tipo" },
    { key: "estado", value: "estado" },
    { key: "Marca", value: "marca" },
    { key: "tipo_Disp", value: "tipo_Disp" },
    { key: "marca", value: "marca" },
    { key: "modelo", value: "modelo" },
    //Red
    { key: "Config_ip", value: "Config_ip" },
    { key: "Config_mac", value: "Config_mac" },

    //Placa Madre
    { key: "Placa_modelo", value: "Placa_modelo" },
    { key: "Placa_detalle", value: "Placa_detalle" },
    { key: "Placa_slots", value: "Placa_slots" },

    // Procesador
    { key: "Procesador_marca", value: "Procesador_marca" },
    { key: "Procesador_modelo", value: "Procesador_modelo" },

    //Ram
    { key: "Ram_Modulos", value: "Ram_Modulos" },

    //Almacenamiento
    { key: "Almacenamiento_detalle", value: "Almacenamiento_detalle" },
    { key: "Tarjeta_Video", value: "Tarjeta_Video" },
    ...deviceConnectUser,
  ],
  Servidor: [
    { key: "nombre", value: "nombre" },
    { key: "Codigo", value: "codigo_dispositivo" },
    { key: "tipo", value: "tipo" },
    { key: "estado", value: "estado" },
    { key: "Marca", value: "marca" },
    { key: "tipo_Disp", value: "tipo_Disp" },
    { key: "marca", value: "marca" },
    { key: "modelo", value: "modelo" },
    //Red
    { key: "Config_ip", value: "Config_ip" },
    { key: "Config_mac", value: "Config_mac" },

    //Placa Madre
    { key: "Placa_modelo", value: "Placa_modelo" },
    { key: "Placa_detalle", value: "Placa_detalle" },
    { key: "Placa_slots", value: "Placa_slots" },

    // Procesador
    { key: "Procesador_marca", value: "Procesador_marca" },
    { key: "Procesador_modelo", value: "Procesador_modelo" },

    //Ram
    { key: "Ram_Modulos", value: "Ram_Modulos" },

    //Almacenamiento
    { key: "Almacenamiento_detalle", value: "Almacenamiento_detalle" },
    { key: "Tarjeta_Video", value: "Tarjeta_Video" },
    ...deviceConnectUser,
  ],
  Impresora: [
    { key: "nombre", value: "nombre" },
    { key: "Codigo", value: "codigo_dispositivo" },
    { key: "tipo", value: "tipo" },
    { key: "estado", value: "estado" },
    { key: "Marca", value: "marca" },
    { key: "tipo_Disp", value: "tipo_Disp" },
    { key: "marca", value: "marca" },
    { key: "modelo", value: "modelo" },
    { key: "tipo_con", value: "tipo_con" },
    { key: "Config_user", value: "Config_user" },
    { key: "Config_ip", value: "Config_ip" },
    { key: "Config_mac", value: "Config_mac" },
    {key:'Config_contra',value:'Config_contra'},
    ...deviceConnectUser,
  ],
};
// Incluir las mismas propiedades de Pc en Laptop
detailDevice.Laptop = [...detailDevice.Pc];

export function UpdateDevice() {
  const { idDisp } = useParams();
  const query = new QueryClient();
  return useMutation({
    mutationKey: ["UpdateDevice"],
    mutationFn: async (data) => {
      const { data: dataResponse } = await axiosInstance.put(
        `Dispositivos/${idDisp}`,
        data
      );
      return dataResponse;
    },
    onSuccess: () => {
      query.invalidateQueries("deviceGet");
      toast.success("Dispositivo Actualizado correctamente");
    },
    onError: (data) => {
      toast.error(data?.message ?? "Error al actualizar el dispositivo");
    },
  });
}

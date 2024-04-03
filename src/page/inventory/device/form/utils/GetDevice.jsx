import axiosInstance from "@/helpers/config/axios-instance";
import { useQuery } from "@tanstack/react-query";

function ActionGet(id) {
  return useQuery({
    queryKey: ["device"],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`Dispositivos/${id}`);
      return data;
    },
  });
}
export function GetDevice(id) {
  const { data, isLoading, isError } = ActionGet(id);

  return {
    isLoading,
    data,
    isError,
  };
}

export function SetValueDevice(data, setvalue) {
  try {
    const dataNew = addDetalleDevice(data?.data);
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

function addDetalleDevice(data) {
  const DataStorage = data;
  const detailsDevice = data?.DetalleDispositivo;
  delete DataStorage?.DetalleDispositivo;
  return {
    ...DataStorage,
    ...detailsDevice,
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
    ...deviceConnectUser,
  ],
  Laptop: [],
};
// Incluir las mismas propiedades de Pc en Laptop
detailDevice.Laptop = [...detailDevice.Pc];

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

export function SetValueDevice(data, setvalue, isError) {
  try {
    if (isError) console.log("Error al cargar los datos");
    const dataNew = addDetalleDevice(data.data);
    const switchDevice = dataNew?.tipo;

    if (switchDevice === "Pc") {
      detailsDevicePcOrLaptop.forEach((data) => {
        if (!dataNew[data.value]) return;
        setvalue(data.key, dataNew[data.value]);
      });
    }
    /**
     * if(switchDevice === "Laptop"){
        setvalue("tipo", "Laptop");
    }
     */
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

const detailsDevicePcOrLaptop = [
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
];

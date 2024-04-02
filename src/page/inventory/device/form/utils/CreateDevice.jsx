import axiosInstance from "@/helpers/config/axios-instance";
import { useMutation } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
export function CreateDevice() {
  const { nombreE, sucursalN } = useParams();
  return useMutation({
    mutationFn: async (datos) => {
      const { data } = await axiosInstance.post(
        `Dispositivos/${nombreE}/${sucursalN}`,
        datos
      );
      return data;
    },
  });
}

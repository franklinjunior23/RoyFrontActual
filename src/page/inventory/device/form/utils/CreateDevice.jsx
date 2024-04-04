import axiosInstance from "@/helpers/config/axios-instance";
import { useMutation } from "@tanstack/react-query";
import { useParams, useNavigate} from "react-router-dom";
import {toast } from "sonner";

export function CreateDevice() {
  const { nombreE, sucursalN } = useParams();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (datos) => {
      const { data } = await axiosInstance.post(
        `Dispositivos/${nombreE}/${sucursalN}`,
        datos
      );
      return data;
    },
    onSuccess: (data) => {
      if(data?.create){
        toast.success("Dispositivo creado correctamente");
        return navigate(-1)
      }
    },
  });
}

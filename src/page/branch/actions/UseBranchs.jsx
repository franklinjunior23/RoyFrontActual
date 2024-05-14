import axiosInstance from "@/helpers/config/axios-instance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

export function CreateBranch() {
  const { nombreE } = useParams();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (dats) => {
      const { data } = await axiosInstance.post("Sucursales", {
        empresa: nombreE,
        nombre: dats?.nombre,
      });
      return data;
    },
    onSuccess: (data) => {
      if (data?.error) {
        return toast.error(`Ha sucedido un error | ${data?.message}`);
      }
      queryClient.invalidateQueries("Empresas");
      toast.success("Empresa creada con exito");
    },
    onError: ({ error }) => {
      toast.error(`Ha sucedido un error | ${error?.message}`);
    },
  });
}

import axiosInstance from "@/helpers/config/axios-instance";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function DeleteFolderApi({funct}) {
  const client = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      const { data } = await axiosInstance.delete(
        `BaseConocimiento/folder/${id}`
      );
      return data;
    },
    onSuccess: (data) => {
      if (data.succes) {
        funct();
        toast.success(data?.message ?? "Carpeta eliminada con exito");
        return client.invalidateQueries("BaseConocimiento");
      }
    },
    onError: (error) => {
      
      toast.error(error.message ?? "Error al eliminar carpeta");
    },
  });
}

export function GetFoldersDelete(){
  return useQuery({
    queryFn: async () => {
      const { data } = await axiosInstance.get("BaseConocimiento/delete");
      return data;
    },
    queryKey: ["BaseConocimiento/delete"],
  });
}

export function RestaureFolder(){
  const client = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      const { data } = await axiosInstance.put(`BaseConocimiento/folder/${id}/restaure`);
      return data;
    },
    onSuccess: (data) => {
      if (data.succes) {
        toast.success(data?.message ?? "Carpeta restaurada con exito");
        return client.invalidateQueries("BaseConocimiento");
      }
    },
    onError: (error) => {
      toast.error(error.message ?? "Error al restaurar carpeta");
    },
  });
}

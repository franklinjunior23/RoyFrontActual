import axiosInstance from "@/helpers/config/axios-instance";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

export function GetBsID() {
  const { id } = useParams();
  return useQuery({
    queryFn: async () => {
      const { data } = await axiosInstance.get(`BaseConocimiento/${id}`);
      return data;
    },
    queryKey: ["BaseConocimientoById"],
  });
}

export function GetKnowledge() {
  return useQuery({
    queryFn: async () => {
      const { data } = await axiosInstance.get("BaseConocimiento");
      return data;
    },
    queryKey: ["BaseConocimiento"],
  });
}
export function CreateKnowledge() {
  const nav = useNavigate();
  const client = useQueryClient();
  return useMutation({
    mutationFn: async (datos) => {
      const { data } = await axiosInstance.post("BaseConocimiento", datos);
      return data;
    },
    onSuccess: ({ create, message }) => {
      if (create) {
        toast.success("Documento creado con exito");
      }
      return toast.error(`Error al crear documento | ${message}`);
    },
    onError: (error) => {
      toast.error(error.message ?? "Error al crear documento");
    },
  });
}
export function UseCreateFolder() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: async (datos) => {
      const { data } = await axiosInstance.post(
        "BaseConocimiento/folder",
        datos
      );
      return data;
    },
    onSuccess: ({ create, message }) => {
      if (create) {
        toast.success("Carpeta creada con exito");
        return client.invalidateQueries("BaseConocimiento");
      }
      return toast.error(`Error al crear carpeta | ${message}`);
    },
    onError: (error) => {
      toast.error(error.message ?? "Error al crear carpeta");
    },
  });
}

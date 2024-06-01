import axiosInstance from "@/helpers/config/axios-instance";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

export function UpdateUser() {
  const { idUsuario } = useParams();
  const navigater = useNavigate();
  return useMutation({
    mutationFn: async (datos) => {
      const { data } = await axiosInstance.put(`Users/${idUsuario}`, datos);
      return data;
    },
    onSuccess: (data) => {
      if (data?.search) {
        toast.success("Usuario Actualizado Correctamente");
        return navigater(-1);
      }
      return toast.error("Error Al Actualizar el usuario ");
    },
    onError: () => {
      return toast.error("Error Al Actualizar el usuario ");
    },
  });
}
export function CreateUser() {
  const { nombreE: company, sucursalN: Branch } = useParams();
  const navigater = useNavigate();
  return useMutation({
    mutationFn: async (dats) => {
      const { data } = await axiosInstance.post(
        `Users?Sucursal=${Branch}&Empresa=${company}`,
        dats
      );
      return data;
    },
    onSuccess: (data) => {
      if (data?.create) {
        navigater(-1);
        toast.success("Usuario creado");
        return;
      }
      return toast.error("Error al crear un usuario");
    },
    onError: () => {
      return toast.error("Error al crear un usuario");
    },
  });
}

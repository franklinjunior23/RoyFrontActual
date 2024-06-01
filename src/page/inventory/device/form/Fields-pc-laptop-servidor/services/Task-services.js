import axiosInstance from "@/helpers/config/axios-instance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

export function CreateTask() {
  const { idDisp } = useParams();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (datos) => {
      const { data } = await axiosInstance.post(`Dispositivos/${idDisp}/notes`, {
        notes: datos,
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries("deviceGet");
      return toast.success("Tarea creada correctamente");
    },
    onError: () => {
      return toast.error("Error al crear la tarea");
    },
  });
}

export function UpdateTask() {
  const { idDisp } = useParams();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (datos) => {
      const { data } = await axiosInstance.put(
        `Dispositivos/${idDisp}/notes/${datos?.title}`,
        {notes:datos}
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries("deviceGet");
      return toast.success("Tarea actualizada correctamente");
    },
    onError: () => {
      return toast.error("Error al actualizar la tarea");
    },
  });
}

export function DeleteTask() {
  const { idDisp } = useParams();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      const { data } = await axiosInstance.delete(`Dispositivos/${idDisp}/notes/${id}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries("deviceGet");
      return toast.success("Tarea eliminada correctamente");
    },
    onError: () => {
      return toast.error("Error al eliminar la tarea");
    },
  });
}

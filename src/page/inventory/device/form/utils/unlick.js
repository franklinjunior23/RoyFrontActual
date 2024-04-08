import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import axiosInstance from "@/helpers/config/axios-instance";
import { useParams } from "react-router-dom";

export function UnclikArea() {
  const QueryClient = useQueryClient();
  const { idDisp } = useParams();

  return useMutation({
    mutationKey: ["DeleteAreaTheDevice"],
    mutationFn: async (id) => {
      const { data } = await axiosInstance.delete(
        `Dispositivos/area/${idDisp}?area=${id}`
      );
      return data;
    },
    onSuccess: async ({ message }) => {
      toast.success(
        `${message ?? "Fue Removido el dispositivo de la sucursal"}`
      );
      QueryClient.invalidateQueries("deviceGet");
    },
  });
}

export function UnlickUser(){
  const QueryClient = useQueryClient();
  const { idDisp } = useParams();

  return useMutation({
    mutationKey: ["DeleteUserTheDevice"],
    mutationFn: async () => {
      const { data } = await axiosInstance.delete(
        `Dispositivos/unlick-user/${idDisp}`
      );
      return data;
    },
    onSuccess: async ({ message }) => {
      toast.success(
        `${message ?? "Fue Removido el dispositivo de la sucursal"}`
      );
      QueryClient.invalidateQueries("deviceGet");
    },
  });
}

export function GetForm() {}

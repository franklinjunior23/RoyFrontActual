import axiosInstance from "@/helpers/config/axios-instance";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

export function GetBranchsDelete() {
  const { nombreE } = useParams();
  return useQuery({
    queryFn: async () => {
      const { data } = await axiosInstance.get(
        "Sucursales/delete?company=" + nombreE
      );
      return data;
    },
    queryKey: ["BranchsGetsDelete"],
  });
}

export function RestaureBranch() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      const { data } = await axiosInstance.put(`Sucursales/restaure/${id}`);
      return data;
    },
    onSuccess: ({ error, message }) => {
      if (error) {
        return toast.error(
          "No se pudo restaurar la sucursal" + message ?? "Error"
        );
      }
      toast.success(message);
      queryClient.invalidateQueries("BranchsGetsDelete");
      queryClient.invalidateQueries("BranchsGets");
    },
  });
}

export function RemoveDefine() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      const { data } = await axiosInstance.delete(`Sucursales/destroy/${id}`);
      return data;
    },
    onSuccess: ({ error, message }) => {
      if (error) {
        return toast.error("No se pudo eliminar la sucursal");
      }
      toast.success(message);
      queryClient.invalidateQueries("BranchsGetsDelete");
      queryClient.invalidateQueries("BranchsGets");
    },
  });
}

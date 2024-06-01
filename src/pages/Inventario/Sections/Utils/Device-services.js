import axiosInstance from "@/helpers/config/axios-instance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function DeleteDevice(){
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id) => {
            const { data } = await axiosInstance.delete(`/Dispositivos/${id}`);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries("GetDisp");
            return toast.success("Dispositivo eliminado correctamente");
        },
        onError: () => {
            return toast.error("Error al eliminar el dispositivo");
        },
    })
}
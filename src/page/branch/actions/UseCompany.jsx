import axiosInstance from "@/helpers/config/axios-instance";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

export function GetCompany() {
  const { nombreE } = useParams();
  return useQuery({
    queryFn: async () => {
      const { data } = await axiosInstance.get("empresas/" + nombreE);
      return data;
    },
    queryKey: ["GetCompanyData"],
  });
}

export function UpdateCompany() {
  const { nombreE } = useParams();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data) => {
      const { data: response } = await axiosInstance.put(
        "empresas/" + nombreE,
        data
      );
      console.log(response);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries("GetCompanyData");
    },
    onError: (error) => {
      toast.error(
        "No se pudo actualizar la empresa" + error?.message ?? "Error"
      );
    },
  });
}

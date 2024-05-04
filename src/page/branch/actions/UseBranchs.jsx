import axiosInstance from "@/helpers/config/axios-instance";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export function GetBranchsDelete() {
  const { nombreE, sucursalN } = useParams();
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

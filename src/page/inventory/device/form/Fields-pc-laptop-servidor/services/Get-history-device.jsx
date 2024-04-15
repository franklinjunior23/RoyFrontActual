import axiosInstance from "@/helpers/config/axios-instance";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export function GetHistory() {
  const { idDisp } = useParams();
  return useQuery({
    queryKey: ["history", idDisp],
    queryFn: async () => {
      const response = await axiosInstance(`history-device/${idDisp}`);
      return response.data?.data;
    },
  });
}

import axiosInstance from "@/helpers/config/axios-instance";
import { useQuery } from "@tanstack/react-query";

async function getProfile() {
  const { data } = await axiosInstance.get("/auth/profile");
  return data;
}

export function UseGetUser() {
  return useQuery({
    queryFn: getProfile,
  });
}

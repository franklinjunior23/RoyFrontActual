import { UsecontextAuth } from "@/context/provider-auth";
import axiosInstance from "@/helpers/config/axios-instance";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

async function signInAuth(data) {
  return ({ data } = await axiosInstance.post("auth/login", data));
}

export function useSignIn() {
  const { AddToken } = UsecontextAuth();
  const navi = useNavigate();
 

  return useMutation({
    mutationFn: signInAuth,
    onSuccess: ({data}) => {

      if (data.loged) {
        AddToken(data.token_user, data.user);
        navi("/dashboard");
        return toast.success(`Bienvenido ${data.user.nombre}`);
      }
      return toast.error("Coloque sus datos correctos");
    },
  });
}

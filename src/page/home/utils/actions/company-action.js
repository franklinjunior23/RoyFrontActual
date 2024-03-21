import { CreateEmpresa } from "@/services/ApiGets";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {toast} from "sonner";
export function PostCompany() {
  const queryCliente = useQueryClient();
  return useMutation({
    mutationFn: CreateEmpresa,
    onSuccess: () => {
      queryCliente.invalidateQueries("Empresas");
      toast.success('Empresa creada correctamente')
    },
    onError: (error) => toast.error(error),
  });
}

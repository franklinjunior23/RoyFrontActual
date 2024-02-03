import { DeleteEmpresa } from "@/services/ApiGets";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function DeleteCompany() {
  const querycliente = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn:DeleteEmpresa,
    onSuccess: () => {
      querycliente.invalidateQueries("Empresas");
      return toast.success("Empresa eliminada con exito");
    },
    onError: (err) => {
      return toast.error("Sucedio un error" + err?.message);
    },
  });
  return {
    mutate,
    isLoading,
  };
}

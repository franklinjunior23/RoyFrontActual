import axiosInstance from "@/helpers/config/axios-instance";
import { toast } from "sonner";


export async function UpdateUser(datos, Navigator, UsuarioId) {
  const { data } = await axiosInstance.put(`Users/${UsuarioId}`, datos);
  if (data?.search) {
    toast.success("Usuario Actualizado Correctamente");
    return Navigator(-1);
  }
  return toast.error("Error Al Actualizar el usuario ");
}
export async function CreateUser(dats, Navigator, EmpresaName, SucursalName) {
  const { data } = await axiosInstance.post(
    `Users?Sucursal=${SucursalName}&Empresa=${EmpresaName}`,
    dats
  );
  if (data?.create) {
    toast.success("Usuario creado ");
    return Navigator(-1);
  }
  return toast.error("Error al crear un usuario");
}

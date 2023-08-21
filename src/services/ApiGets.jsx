
import axiosInstance from "./ConfigApi";

export const GetEmpresas = async () => {
  const resp = await axiosInstance.get("Empresas");
  return resp.data;
};
export const CreateEmpresa = async (datos) => {
  const resp = await axiosInstance.post("Empresas", datos);
  return resp.data;
};
export const DeleteEmpresa = async (id) => {
  const resp = await axiosInstance.delete(`Empresas/${id}`);
  return resp.data;
};
export const GetSucursalesbyEmpresa = async (empressa) => {
  const resp = await axiosInstance.get(`sucursales/${empressa}`);
  return resp.data;
};
export const CreateSucursalByEmpresa = async (data) => {
  const resp = await axiosInstance.post("sucursales", data);
  return resp.data;
};
export const GetUserByEmpresaAndSucursal = async (empresa, sucursal) => {
  const resp = await axiosInstance.get(`Users/${empresa}/${sucursal}`);
  return resp.data;
};
export const CreateUserByempresaAndSucursal = async (empresa,sucursal,datos) => {
    console.log(datos)
  const resp = await axiosInstance.post(`Users/${empresa}/${sucursal}`, datos);
    console.log(resp)
  return resp.data;
};
export const GetUserById =async(id)=>{
  const resp = await axiosInstance.get(`Users/${id}`)
  return resp.data
}
export const UpdateUserById=async(id)=>{
  const resp = await axiosInstance.put(`Users/${id}`)
  return resp.data
}
export const GetDispUser = async()=>{
  const resp = await axiosInstance.get('Dispositivos/PCLAP');
  return resp.data
}

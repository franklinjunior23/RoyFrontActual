import axiosInstance from "@/helpers/config/axios-instance";


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
export const CreateUserByempresaAndSucursal = async (
  empresa,
  sucursal,
  datos
) => {
  const resp = await axiosInstance.post(`Users/${empresa}/${sucursal}`, datos);
  return resp.data;
};
export const GetUserById = async (id) => {
  const { data } = await axiosInstance.get(`Users/${id}`);
  return data;
};
export const UpdateUserById = async (id, dat) => {
  const resp = await axiosInstance.put(`Users/${id}`, dat);
  return resp.data;
};
export const DeleteUserById = async (id) => {
  console.log(id);
  const resp = await axiosInstance.delete(`Users/${id}`);
  return resp.data;
};

export const GetDispUser = async () => {
  const resp = await axiosInstance.get("Dispositivos/PCLAP");
  return resp.data;
};

export const CreateDispR = async (data, empresa, sucursal) => {
  const resp = await axiosInstance.post(
    `Dispositivos/${empresa}/${sucursal}`,
    data
  );
  return resp.data;
};

export const GetDispositos = async (data) => {
  const resp = await axiosInstance.get("Dispositivos/", data);
  return resp.data;
};
export const DeleteDisposito = async (id) => {
  const resp = await axiosInstance.delete(`Dispositivos/${id}`);
  return resp.data;
};

export const GetUserNullDispositivo = async ({ empresa, sucursal }) => {
  console.log(empresa, sucursal);
  const { data } = await axiosInstance.get(
    `Users/Disp?empresa=${empresa}&sucursal=${sucursal}`
  );
  return data;
};

export const GetsTicketsInfo = async () => {
  const { data } = await axiosInstance.get("Tickets");
  return data;
};

export const GetsBaseConocimiento = async () => {
  const { data } = await axiosInstance.get("BaseConocimiento");
  return data;
};

export const GetsInfoDash = async () => {
  const { data } = await axiosInstance.get("informes/Home");
  return data;
};

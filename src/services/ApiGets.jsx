import axiosInstance from "./ConfigApi"

export const GetEmpresas = async()=>{
    const resp = await axiosInstance.get('Empresas')
    return resp.data 
}
export const CreateEmpresa=async(datos)=>{
    const resp = await axiosInstance.post('Empresas',datos)
    return resp.data
}
export const DeleteEmpresa=async(id)=>{
    const resp = await axiosInstance.delete(`Empresas/${id}`)
    return resp.data
}
export const GetSucursalesbyEmpresa = async(empressa)=>{
    const resp = await axiosInstance.get(`sucursales/${empressa}`);
    return resp.data
}
export const CreateSucursalByEmpresa=async(data)=>{
    const resp = await axiosInstance.post('sucursales',data)
    return resp.data
}
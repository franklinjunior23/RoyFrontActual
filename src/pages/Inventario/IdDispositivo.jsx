import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom"
import axiosInstance from "../../services/ConfigApi";

function IdDispositivo() {
    const {idDisp}=useParams();
   const {data }=useQuery({
    queryFn:async()=>{
    
       const resp= await axiosInstance.get(`Dispositivos/${idDisp}`)
       return resp.data
    },
    queryKey:['DispositivoByID']
   })
   console.log(data)
  return (
    <div>IdDispositivo</div>
  )
}
export default IdDispositivo
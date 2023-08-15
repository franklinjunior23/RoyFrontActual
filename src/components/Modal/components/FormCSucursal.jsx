import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { CreateSucursalByEmpresa } from "../../../services/ApiGets"
import { useParams } from "react-router-dom"


function FormCSucursal({handle}) {
    const {handleSubmit ,register} =useForm()
    const {nombreE} = useParams()
    const queryClient = useQueryClient()
    const QueryConsulta = queryClient.getQueryData(['Empresas'])?.filter(item => item.nombre ==nombreE)
    const filteredIds = QueryConsulta[0]?.id
    const MutateCreate = useMutation({
        mutationFn:CreateSucursalByEmpresa,
        onSuccess:()=>{
            queryClient.invalidateQueries('Sucursales')
        }
    })
    function handleCloe(){
        handle()
        
    }
    function handleSubm(dat){
        MutateCreate.mutate({...dat,empresa:filteredIds });
        handle()
    }
  return (
    <section>
        <form onSubmit={handleSubmit(handleSubm)} className="text-white">
            <h3 className="text-center py-3">Creacion de sucursal</h3>
            <div className="flex flex-col px-2">
                <label className="text-base mb-1">Nombre </label>
                <input type="text" className="indent-2 bg-transparent focus:outline-none py-2 border rounded-lg border-white " {...register('nombre')} />
            </div>
            <div className="grid grid-cols-2 gap-3 mt-6">
                <button type="submit" className="border border-white py-2 rounded-lg">Crear</button>
                <button type="button" className="border border-white py-2 rounded-lg" onClick={handleCloe}>Cerrar</button>
            </div>
        </form>
    </section>
  )
}
export default FormCSucursal

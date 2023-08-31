import {
  IconAccessPoint,
  IconDeviceLaptop,
  IconDevicesPc,
  IconDotsVertical,
  IconPrinter,
} from "@tabler/icons-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from "react-router-dom";
import { DeleteDisposito } from "../../../services/ApiGets";
import { toast } from "sonner";

const SwitchIconDisp = ({ data, size }) => {
  switch (data) {
    case "Pc":
      return <IconDevicesPc width={size} height={size} />;
    case "Laptop":
      return <IconDeviceLaptop width={size} height={size} />;
    case "Servidores":
      return <IconDevicesPc width={size} height={size} />;
    case "Red":
      return <IconAccessPoint width={size} height={size} />;
    case "Impresora":
      return <IconPrinter width={size} height={size} />;
  }
};

function ItemDisp({ value }) {
  const [ActiveModalOptions, setActiveModalOptions] = useState(false);
  const handleActive = () => {
    setActiveModalOptions(!ActiveModalOptions);
  };
  const queryClient = useQueryClient()
  const {mutate:DeleteDisp} = useMutation({
    mutationFn:DeleteDisposito,
    onSuccess:(data)=>{
        if(data.search) {
            toast.success('Dispositivo Eliminado')
            return queryClient.invalidateQueries({queryKey:['GetDisp']})
        } 
         toast.error('Hubo un error , intentelo nuevamente')
        
    }
  })
  return (
    <section
      key={value.id}
      className="border rounded-lg shadow-md flex justify-between px-5 py-4  lg:py-6 flex-col md:flex-row relative "
    >
      <div>
        <h2 className="text-sm font-medium mb-4 truncate lg:w-20">
          {value?.nombre}
        </h2>
        <hr />
        <span className="pt-2">{value?.marca}</span>
      </div>
      <div className="m-auto md:m-0 mb-3">
        <Link to={value.nombre}>
          <SwitchIconDisp data={value?.tipo} size={70} />
        </Link>
        <h4
          className={`bg-green-400 text-sm px-3 text-white font-semibold my-1 rounded-md capitalize `}
        >
          activo
        </h4>
      </div>

      <aside
        className="absolute bottom-2 right-2 lg:top-2 cursor-pointer"
        onClick={handleActive}
      >
        <IconDotsVertical height={25} width={25} />
      </aside>

      {
        ActiveModalOptions && (
            <aside className="absolute bottom-3 right-10 bg-white shadow-lg rounded-md">
                <ul className="flex flex-col">
                    <button className="px-4 py-1 text-sm">Editar</button>
                    <button className="px-4 py-1 text-sm">Actualizar</button>
                    <button className="px-4 py-1 text-sm" onClick={()=>DeleteDisp(value.id)}>Eliminar</button>

                </ul>
            </aside>
        )
      }
    </section>
  );
}
export default ItemDisp;

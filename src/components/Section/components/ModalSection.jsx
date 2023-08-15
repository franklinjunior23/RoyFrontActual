import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DeleteEmpresa } from "../../../services/ApiGets";

function ModalSection({ datos }) {
  const { id } = datos;
  const querycliente = useQueryClient();
  const {mutate,isLoading} = useMutation({
    mutationFn: DeleteEmpresa,
    onSuccess: () => {
      querycliente.invalidateQueries('Empresas')
    },
  });

  const EditEmpresa = (id) => {
    console.log(id);
  };

  const borrar = (id) => {
    console.log(id);
  };

  if(isLoading) return <p>cargando ..</p>
  return (
    <div className="absolute w-[70%]  bottom-20 bg-white right-6 shadow-lg rounded-md">
     
      <li className="py-3 text-center" onClick={() => EditEmpresa(id)}>
        Editar
      </li>
      <li className="py-3 text-center" onClick={() => mutate(id)}>
        Eliminar
      </li>
    </div>
  );
}
export default ModalSection;

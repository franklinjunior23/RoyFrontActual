import { IconDotsVertical, IconUser } from "@tabler/icons-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DeleteUserById } from "../../../services/ApiGets";
import { toast } from "sonner";

// eslint-disable-next-line react/prop-types
function ItemUsers({ dato }) {
  const { nombre, apellido, id, cargo, estado } = dato;
  const [ActiveOption, setActiveOption] = useState(false);
  const HandleEditarUser = () => {
    setActiveOption(!ActiveOption);
  };
  const navi = useNavigate();
  const QueryCli = useQueryClient();
  const { isLoading, mutate: UpdateUser } = useMutation({
    mutationFn: DeleteUserById,
    onSuccess: (dat) => {
      setActiveOption(false);
      QueryCli.invalidateQueries("UsersSucur");
      return toast.success("Usuario Eliminado Correctamente");
    },
    onError: () => {
      setActiveOption(false);
      return toast.error("Hubo un Problema");
    },
  });

  const DeleteUser = () => {
    UpdateUser(id);
  };
  const EditModal = () => {
    return (
      <aside className="absolute -bottom-10 z-20 right-10 py-2 bg-white shadow-md rounded-md">
        <ul className="flex flex-col gap-2">
          <Link to={id} className="px-5">
            Editar
          </Link>
          <li className="px-5" onClick={DeleteUser}>
            {isLoading ? "Borrando ..." : "Eliminar"}
          </li>
        </ul>
      </aside>
    );
  };
  return (
    <section className="border rounded-md px-5 relative shadow-md">
      <div className="flex justify-between items-center">
        <Link to={`${id}`} className="flex items-center py-6 gap-2">
          <IconUser size={40} strokeWidth={2.5} color="black" />
          <div>
            <div>
              <h3 className="capitalize font-semibold text-base lg:text-xl">
                {nombre} {apellido}
              </h3>
              <span className="capitalize text-sm">
                {!cargo ? "No tiene Cargo" : cargo}
              </span>
            </div>
            <div className="mt-2">
              <span
                className={`${
                  estado === "Retirado" ? "bg-red-600" : "bg-black "
                } py-0.5 rounded-lg px-2 text-white text-xs font-bold`}
              >
                {estado}
              </span>
            </div>
          </div>
        </Link>
        <div className=" cursor-pointer" onClick={HandleEditarUser}>
          <IconDotsVertical strokeWidth={3} size={30} color="BLACK" />
        </div>
      </div>
      {ActiveOption && <EditModal />}
    </section>
  );
}
export default ItemUsers;

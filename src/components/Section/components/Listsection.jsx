import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { IconBuilding } from "@tabler/icons-react";
import { IconDotsVertical } from "@tabler/icons-react";
import ButtomDots from "@Components/Buttons/Buttom/ButtomDots";
import { toast } from "sonner";
import { DeleteCompany } from "@/pages/empresa/actions/Mutates";
import { UsecontextAuth } from "@/context/provider-auth";

// eslint-disable-next-line react/prop-types
function Listsection({ datos, color, LinkDate }) {
  const { RoleUser } = UsecontextAuth();
  const { nombre, id } = datos;
  const { mutate: Delete, isLoading: LoadingDelete } = DeleteCompany();
  const ListSoportIt = [
    {
      label: "Editar",
      Function: () =>
        toast.success(`Editar el id la empresa ${nombre} | id:${id}`),
    },
  ];
  const ListAdministrador = [
    {
      label: "Editar",
      Function: () =>
        toast.success(`Editar el id la empresa ${nombre} | id:${id}`),
    },
    {
      label: "Eliminar",
      Function: () => Delete(id),
      IsLoading: LoadingDelete,
    },
  ];
  // color defaultbg-[#6d6d6d]
  return (
    <article
      className={`px-7 border dark:border-none py-9 h-[250px] w-[280px] rounded-3xl relative shadow-md my-3 dark:bg-white/20 `}
      // style={{ background:color }}
    >
      <Link to={LinkDate ? `/Dashboard/Home/${nombre}` : nombre}>
        <span>
          <IconBuilding className="text-base" size={50} />
        </span>
        <h4 className="mt-4 text-black dark:text-white font-extrabold text-xl">{nombre}</h4>
      </Link>
      <div className="absolute right-1 top-7  px-4 cursor-pointer">
        {RoleUser === "Soporte" && (
          <ButtomDots
            Title={"Acciones"}
            Options={ListSoportIt}
            Icon={<IconDotsVertical className="text-base" size={30} strokeWidth={3} />}
          />
        )}
        {RoleUser === "Administrador" && (
          <ButtomDots
            Title={"Acciones"}
            Options={ListAdministrador}
            Icon={<IconDotsVertical color="white" size={30} strokeWidth={3} />}
          />
        )}
      </div>
      {/* {IsActiveMod && <ModalSection datos={datos} />} */}
    </article>
  );
}

export default Listsection;

Listsection.propTypes = {
  datos: PropTypes.shape({
    nombre: PropTypes.string,
    id: PropTypes.number,
    // add any other required props here
  }).isRequired,
  color: PropTypes.string.isRequired,
  LinkDate: PropTypes.bool,
};

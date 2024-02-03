import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { IconBuilding } from "@tabler/icons-react";
import { IconDotsVertical } from "@tabler/icons-react";
import ButtomDots from "@Components/Buttons/Buttom/ButtomDots";
import { toast } from "sonner";
import { UseContextLoged } from "@/context/AuhtLoged";
import { DeleteCompany } from "@/pages/empresa/actions/Mutates";

// eslint-disable-next-line react/prop-types
function Listsection({ datos, color, LinkDate }) {
  const { RoleUser } = UseContextLoged();
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
  return (
    <article
      className={`px-7 py-9 h-[250px] w-[280px] rounded-3xl relative bg-[#6d6d6d]`}
      // style={{ background:color }}
    >
      <Link to={LinkDate ? `/Dashboard/Home/${nombre}` : nombre}>
        <span>
          <IconBuilding color="white" size={50} />
        </span>
        <h4 className="mt-4 text-white font-extrabold text-xl">{nombre}</h4>
      </Link>
      <div className="absolute right-1 top-7  px-4 cursor-pointer">
        {RoleUser === "Soporte" && (
          <ButtomDots
            Title={"Acciones"}
            Options={ListSoportIt}
            Icon={<IconDotsVertical color="white" size={30} strokeWidth={3} />}
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

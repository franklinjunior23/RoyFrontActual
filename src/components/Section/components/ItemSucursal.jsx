import { Link } from "react-router-dom";
import ItemInput from "@Components/Input/InputCopy/ItemInput";
import TruncateText from "@Helpers/TruncateTeaxt";
import PropTypes from "prop-types";
import ButtomDots from "@Components/Buttons/Buttom/ButtomDots";
import { UseContextLoged } from "@/context/AuhtLoged";
// ...

function ItemSucursal({ value }) {
  const { nombre, id, Token } = value;
  const { RoleUser } = UseContextLoged();
  const OptionsSoporte = [
    { label: "Editar", Function: () => console.log(`Estais Editando ${id}`) },
  ];
  const OptionsAdministrador = [
    { label: "Editar", Function: () => console.log(`Estais Editando ${id}`) },
    {
      label: "Eliminar",
      Function: () => console.log(`Estais Eliminando ${id}`),
    },
  ];

  return (
    <section className="relative h-[170px]  shadow-md border border-black/5 dark:border-none rounded-lg text-white dark:bg-DarkComponent pt-10 pb-5 px-3 text-center">
      <div className="grid  h-full">
        <Link to={`${nombre}/Usuarios`} className="capitalize h-full">
          <h3 className="md:text-xl text-base font-semibold dark:text-white text-black">
            <TruncateText
              text={nombre}
              maxLength={14}
              ComponentNext={() => {
                <></>;
              }}
            />
          </h3>
        </Link>
        <ItemInput Value={Token} Message={`Token Copeado`} className={"mt-5"} />
      </div>
      <aside className="absolute top-3 right-3 ">
        {RoleUser === "Soporte" && (
          <ButtomDots Title="Acciones" Options={OptionsSoporte} />
        )}
        {RoleUser === "Administrador" && (
          <ButtomDots Title="Acciones" Options={OptionsAdministrador} />
        )}
      </aside>
    </section>
  );
}

export default ItemSucursal;

ItemSucursal.propTypes = {
  value: PropTypes.shape({
    nombre: PropTypes.string,
    id: PropTypes.number,
    Token: PropTypes.string,
  }),
};

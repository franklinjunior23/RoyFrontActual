import { IconUser } from "@tabler/icons-react";
import PropTypes from "prop-types";
import Button from "@Components/Input/Button";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { pathnameNav } from "@/helpers/utils/link-pathname";
import { UnlickUser } from "../form/utils/unlick";

function LinkUser({ dataUser }) {
  const { pathname } = useLocation();
  const { mutate, isLoading, isError } = UnlickUser();
  return (
    <section className=" p-2 mt-4 bg-white rounded-lg text-sm text-black">
      <IconUser className="mx-auto my-3" size={40} />
      <h3 className="capitalize">
        <span className="font-bold"> Nombre: </span> {dataUser?.nombre}
        {dataUser?.apellido}
      </h3>
      <h3 className="capitalize">
        <span className="font-bold">Cargo:</span>
        {String(dataUser?.cargo).toLowerCase()}
      </h3>
      <h3>
        <span className="font-bold">Usuario:</span> {dataUser?.usuario}
      </h3>
      <h3>
        <span className="font-bold">Contraseña:</span>
        {dataUser?.contraseña !== ""
          ? dataUser?.contraseña
          : "No tiene contraseña"}
      </h3>

      <footer className="mt-4 grid grid-cols-2 gap-2">
        <Button
          onClick={mutate}
          type="button"
          variant="danger"
          disabled={isLoading}
        >
          Desvincular
        </Button>
        <Button variant="second">
          <Link
            to={pathnameNav({
              path: pathname,
              newPath: `/Usuarios/${dataUser?.id}`,
              quantity: 2,
            })}
          >
            Ver
          </Link>
        </Button>
      </footer>
    </section>
  );
}

export default LinkUser;

LinkUser.propTypes = {
  dataUser: PropTypes.object,
};

import { Link, useParams } from "react-router-dom";
import { DataCategory } from "../../../assets/DataDefault";

function ListCategoy() {
  const { idUsuario } = useParams();
  return (
    !idUsuario && (
      <article className="grid grid-cols-2 lg:px-6 gap-3 md:gap-6">
        {DataCategory.map((dato, index) => (
          <header
            key={index}
            className="bg-black/95 dark:bg-Component rounded-md md:rounded-xl text-white py-7 grid place-content-center"
          >
            <Link to={dato.name} className="flex gap-2 text-xl font-semibold">
              {dato.name}
              {dato.icon}
            </Link>
          </header>
        ))}
      </article>
    )
  );
}
export default ListCategoy;

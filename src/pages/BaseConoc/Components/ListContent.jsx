import { useQuery } from "@tanstack/react-query";
import { GetsBaseConocimiento } from "../../../services/ApiGets";
import Page404 from "../../../components/Error/Page404";
import { useEffect } from "react";
import { SearchUser } from "../../../store/SearchUser";
import PropTypes from "prop-types";

import { formatDateToPeruvian } from "../../../utils/FechaConvert";
import { NavLink } from "react-router-dom";

function ListContent() {
  // traer la funcion para agregar los articulos a la base de conocimiento storage
  const AddBase = SearchUser((state) => state.AddBaseConocimiento);

  // traer los datos de la base de conocimiento con react query
  const { data, isLoading, isError } = useQuery({
    queryFn: GetsBaseConocimiento,
    queryKey: ["BaseConocimiento"],
  });

  // agregar los articulos a la base de conocimiento  si es que existe
  useEffect(() => {
    if (data) {
      AddBase(data.data);
    }
  }, [data, AddBase]);

  if (isLoading) return <LoadingPage />;
  if (isError) return <Page404 />;

  console.log(data);
  return (
    <main className="mt-8">
      <section className="flex gap-3 dark:text-white font-semibold">
        <span className="dark:bg-DarkComponent px-3 py-1 rounded-md">
          Total : {data.details.cantidad}{" "}
        </span>
        <span className="dark:bg-DarkComponent px-3 py-1 rounded-md ">
          Creados hoy : {data.details.create}
        </span>
      </section>
      <section className="grid grid-cols-2 grid-rows-none md:flex md:flex-wrap gap-5 md:gap-x-4  md:gap-y-6 justify-center lg:justify-normal py-5">
        {data.data.map((item, index) => (
          <Item {...item} key={index} />
        ))}
      </section>
    </main>
  );
}

export default ListContent;

// Componente para mostrar el loading de la pagina En general
const LoadingPage = () => {
  return (
    <div>
      <h1>Cargando...</h1>
    </div>
  );
};

const Item = ({ Titulo, Categoria, createdAt, id }) => {
  return (
    <div className="">
      <NavLink
      to={id}
        className={
          "md:w-[300px] md:h-[135px] dark:bg-DarkComponent rounded-xl overflow-hidden md:flex shadow-[2px_2px_10px_-5px]"
        }
      >
        <div className="w-full  p-4 flex flex-col justify-between capitalize">
          <h2 className="  md:hyphens-auto md:text-clip  font-bold  dark:text-white    ">
            {Titulo}
          </h2>
          <div className="w-full grid gap-1">
            <span className="truncate dark:text-white text-xs">
              {formatDateToPeruvian(createdAt)}
            </span>
            <span className="bg-Slet/70 font-medium text-center text-white break-all rounded-md truncate">
              {Categoria}
            </span>
          </div>
        </div>
        <div className="md:w-[50%] ">
          <img
            src="/Images/BoockBaseCon.png"
            className="w-full h-full object-cover"
            alt=""
          />
        </div>
      </NavLink>
    </div>
  );
};
Item.prototype = {
  Titulo: PropTypes.string.isRequired,
  Categoria: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

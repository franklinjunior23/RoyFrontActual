import { useQuery } from "@tanstack/react-query";
import { GetsBaseConocimiento } from "../../../services/ApiGets";
import Page404 from "../../../components/Error/Page404";
import { useEffect } from "react";
import { SearchUser } from "../../../store/SearchUser";
import PropTypes from "prop-types";

import { formatDateToPeruvian } from "../../../helpers/utils/FechaConvert";
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

  return (
    <main className="mt-8">
      <section className="flex gap-3 dark:text-white mb-4">
        <span className="bg-DarkComponent px-3 py-1 rounded-md text-white">
          Total : {data.details.cantidad}{" "}
        </span>
        {/* <span className="bg-DarkComponent text-white px-3 py-1 rounded-md ">
          Creados hoy : {data.details.create}
        </span> */}
      </section>
      <section
        className="flex w-full  overflow-y-auto custom custom-scrollbar  gap-x-3 gap-y-4 flex-wrap h-[500px]"
      >
     
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

export const Item = ({ Titulo, Categoria, createdAt, id }) => {
  return (
    <div className="">
      <NavLink
        to={{ pathname: `/Dashboard/BaseConocimiento/${id}` }}
        className="md:w-[300px] md:h-[135px] dark:bg-DarkComponent rounded-xl overflow-hidden md:flex shadow-[1px_3px_10px_-6px] grid cursor-pointer"
      >
        <div className="w-full p-4 flex flex-col justify-between capitalize pointer-events-none min-w-0">
          <h2 className="break-all md:hyphens-auto md:text-clip font-semibold dark:text-white">
            {Titulo}
          </h2>
          <div className="w-full grid gap-1">
            <span className="dark:text-white text-sm">
              {formatDateToPeruvian(createdAt)}
            </span>
            <span className="bg-Slet/70 px-2 font-medium text-center text-white break-all rounded-md truncate">
              {Categoria}
            </span>
          </div>
        </div>
        <div className="md:w-[54%] bg-slate-500">
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

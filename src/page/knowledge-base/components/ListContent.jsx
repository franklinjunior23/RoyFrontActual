import { useQuery } from "@tanstack/react-query";

import { useEffect } from "react";
import { SearchUser } from "../../../store/SearchUser";
import Page404 from "@/page/Not-found";
import Cardknowledge from "./Card-knowledge";
import { GetsBaseConocimiento } from "@/services/ApiGets";

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
        <span className="bg-DarkComponent px-3 py-1 rounded-md text-white text-sm">
          Total : {data.details.cantidad}
        </span>
         
      </section>
      <section
        className="overflow-y-auto custom custom-scrollbar py-4 flex flex-wrap gap-x-8 gap-y-5"
      >
     
         {data.data.map((item, index) => (
           <Cardknowledge {...item} key={index} />
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

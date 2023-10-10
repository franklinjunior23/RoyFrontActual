import { useQuery } from "@tanstack/react-query";
import { GetsBaseConocimiento } from "../../../services/ApiGets";
import Page404 from "../../../components/Error/Page404";
import { useEffect } from "react";
import { SearchUser } from "../../../store/SearchUser";

import { IconBook2 } from "@tabler/icons-react";
import { formatDateToPeruvian } from "../../../utils/FechaConvert";

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
      <section className="grid grid-cols-2 grid-rows-none md:flex md:flex-wrap gap-5 md:gap-x-4  md:gap-y-6 justify-center py-5">
        {data.data.map((item, index) => (
          <div
            className="md:w-[300px] md:h-[135px] dark:bg-DarkComponent rounded-xl overflow-hidden md:flex shadow-[2px_2px_10px_-5px]"
            key={index}
          >
            <div className="w-full  p-3 flex flex-col justify-between capitalize">
              <h2 className="  md:hyphens-auto md:text-clip  font-bold  dark:text-white    ">
                {item.Titulo}
              </h2>
              <div className="w-full grid gap-1">
                <span className="text-end truncate dark:text-white font-bold">{formatDateToPeruvian(item.createdAt)}</span>
                <span className="bg-Slet/70 font-medium text-center text-white break-all px-2 rounded-md truncate">
                  {item.Categoria}
                </span>
              </div>
            </div>
            <div className="md:w-[48%] grid items-center bg-center bg-cover  " style={{ backgroundImage:'url(/Images/BoockBaseCon.png)' }}>
              <IconBook2
                size={30}
                className="w-full h-full -rotate-12 dark:text-white "
                strokeWidth={1.2}
              />
              
            </div>
            
          </div>
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

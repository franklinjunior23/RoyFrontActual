import { useState } from "react";
import Header from "./Components/Header";
import ListBC from "./Components/ListBC";
import { Outlet } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { GetsBaseConocimiento } from "../../services/ApiGets";
import { SearchUser } from "../../store/SearchUser";
import { useEffect } from "react";


function PageBC() {
  const [search, setSearch] = useState("");
  const { data, isLoading, isError } = useQuery({
    queryFn: GetsBaseConocimiento,
    queryKey: ["BaseConocimiento"],
  });
  const AddBase = SearchUser((state) => state.AddBaseConocimiento);

  useEffect(() => {
    if (data) {
      AddBase(data.data);
    }
  }, [data, AddBase]);

 
  return (
    <main>
      <Header setValue={setSearch} Value={search} />

      {isLoading && <div>Cargando...</div>}
      {isError && <div>Error</div>}

      <div className="flex w-full flex-col md:flex-none md:grid md:grid-cols-[280px_1fr] md:grid-row-2 gap-2 mt-5 md:h-[600px]">
        <ListBC List={data?.data} search={search} />
        <section className="w-full px-2  md:mt-0 order-[2] md:row-span-2">
          <Outlet />
        </section>
        <div className="md:mt-10 order-3">
          <section className="rounded-md px-3 py-4 mt-5 md:mt-0 dark:bg-DarkComponent border dark:border-none  text-center dark:text-white">
            <h4
              className="text-xl dark:text-white  text-black font-semibold mb-3"
              data-te-toggle="tooltip"
              data-te-ripple-color="light"
              title="Cantidad de docs..."
            >
              Cantidad
            </h4>
            <span className="text-xl font-semibold ">
              {data?.details.cantidad}
            </span>
          </section>
        </div>
      </div>
    </main>
  );
}

export default PageBC;

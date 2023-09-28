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

      <div className="flex w-full flex-col md:flex-none md:grid md:grid-cols-[280px_1fr] gap-2 mt-5 md:h-[400px]">
        <ListBC List={data?.data} search={search} />
        <section className="w-full px-2 mt-5 md:mt-0 ">
          <Outlet />
        </section>
      </div>

      <div className="md:mt-10 grid grid-cols-2">
        <section className="rounded-md px-3 py-4 mt-5 md:mt-0 bg-DarkComponent text-white text-center">
          <h4
            className="text-xl font-semibold mb-3"
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
    </main>
  );
}

export default PageBC;
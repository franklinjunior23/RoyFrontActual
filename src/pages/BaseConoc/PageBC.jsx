import { useState } from "react";
import Header from "./Components/Header";
import ListBC from "./Components/ListBC";
import { Outlet, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { GetsBaseConocimiento } from "../../services/ApiGets";
import ReactQuill from "react-quill";
import { SearchUser } from "../../store/SearchUser";
import { useEffect } from "react";

function PageBC() {
  const [Search, setSearch] = useState("");

  const { data, isLoading, isError } = useQuery({
    queryFn: GetsBaseConocimiento,
    queryKey: ["BaseConocimiento"],
  });
  const AddBase = SearchUser((state) => state.AddBaseConocimiento);
  const { id } = useParams();
  if (isLoading) return <div>Cargando...</div>;
  if (isError) return <div>Error</div>;
  const { cantidad } = data?.details;
  if (data) AddBase(data.data);

  console.log(data);
  return (
    <main>
      <Header setValue={setSearch} Value={Search} />
      <article className="flex w-full flex-col md:flex-none md:grid md:grid-cols-[280px_1fr]  gap-2 mt-5 md:h-[400px]">
        <ListBC List={data.data} />
        <section className=" w-full px-2 mt-5 md:mt-0 ">
          <Outlet />
        </section>
      </article>
      <article className="md:mt-5 grid grid-cols-2">
        <section className="  rounded-md px-3 py-4 mt-5 md:mt-0 bg-DarkComponent text-white text-center">
          <h4
            className="text-xl font-semibold mb-3"
            data-te-toggle="tooltip"
            data-te-ripple-color="light"
            title="Cantidad de docs..."
          >
            Cantidad
          </h4>
          <span className="text-xl font-semibold ">{cantidad}</span>
        </section>
      </article>
    </main>
  );
}
export default PageBC;

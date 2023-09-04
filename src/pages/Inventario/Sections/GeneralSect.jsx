import { useQuery } from "@tanstack/react-query";

import { GetDispositos } from "../../../services/ApiGets";
import ItemDisp from "./ItemDisp";
import { Outlet, useParams } from "react-router-dom";

function GeneralSect() {
 const {idDisp}
 = useParams();

  const { data, isLoading, isError } = useQuery(["GetDisp"], GetDispositos);
  if (isLoading) return <h2>Cargando ....</h2>;
  if (isError) return <h2>Hubo un error , recargue la pagina ....</h2>;
if(data.length==0) return <h2 className="mt-10 text-center">No hay Dispositos. crea uno</h2>
if(idDisp)return <Outlet/>
  return (
    <main className="mt-5">
      <section className="grid grid-cols-2 md:grid-cols-3  gap-5 ">
        {data?.map((value) => (
          <ItemDisp value={value} key={value.id} />
        ))}
      </section>
      <Outlet/>
    </main>
  );
}

export default GeneralSect;

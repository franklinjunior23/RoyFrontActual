import { useQuery } from "@tanstack/react-query";

import ItemDisp from "./ItemDisp";
import { Outlet, useParams } from "react-router-dom";
import HeadCategory from "../../../components/Section/components/HeadCategory";
import axiosInstance from "../../../services/ConfigApi";

function GeneralSect() {
  const { nombreE, sucursalN, idDisp } = useParams();
  const queryKey = ["GetDisp"];

  const { data, isLoading, isError } = useQuery(queryKey, async () => {
    const { data } = await axiosInstance.get(
      `Dispositivos/?empresa=${nombreE}&sucursal=${sucursalN}`
    );
    return data;
  });
  if (isLoading) return <h2>Cargando ....</h2>;
  if (isError) return <h2>Hubo un error , recargue la pagina ....</h2>;
  if (data.length == 0)
    return (
      <>
        {idDisp === "create" ? (
          <Outlet />
        ) : (
          <>
            <HeadCategory data={"Dispositivo"} />
            <h2 className="mt-10 text-center">No hay Dispositos. crea uno</h2>
          </>
        )}
      </>
    );
  if (idDisp) return <Outlet />;
  return (
    <>
      <HeadCategory data={"Dispositivo"} />

      <main className="mt-5">
        <section className="grid grid-cols-2 md:grid-cols-3  gap-5 ">
          {data?.map((value) => (
            <ItemDisp value={value} key={value.id} />
          ))}
        </section>
        <Outlet />
      </main>
    </>
  );
}

export default GeneralSect;

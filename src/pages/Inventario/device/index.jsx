import { Outlet, useParams } from "react-router-dom";
import DeviceImage from "/Figures/DevicePage.svg";
import GeneralSect from "../Sections/GeneralSect";
import { useQuery } from "@tanstack/react-query";
import HeadCategory from "@Components/Section/components/HeadCategory";
import axiosInstance from "@/helpers/config/axios-instance";

export default function DevicePage() {
  const { nombreE, sucursalN, idDisp } = useParams();
  const queryKey = ["GetDisp"];
  const { data, isLoading, isError } = useQuery(queryKey, async () => {
    const { data } = await axiosInstance.get(
      `Dispositivos/?empresa=${nombreE}&sucursal=${sucursalN}`
    );
    return data;
  });

  if (idDisp) return <Outlet />;

  return (
    <main className=" pb-5 md:grid md:grid-cols-[1fr_320px] gap-5 ">
      <section>
        {isLoading && <div>Cargando...</div>}
        {isError && <div>Error al cargar los dispositivos</div>}
        {!isLoading && !isError && (
          <>
            <GeneralSect data={data} />
            {data?.length === 0 && (
              <>
                {idDisp === "create" ? (
                  <Outlet />
                ) : (
                  <>
                    <HeadCategory data={"Dispositivo"} />
                    <h2 className="mt-10 text-center">
                      No hay Dispositivos. Crea uno.
                    </h2>
                  </>
                )}
              </>
            )}
          </>
        )}
      </section>
      <section className="bg-black/30 dark:bg-black/20 px-4 rounded-xl">
        <h2 className="text-center text-lg my-4 text-white">Dispositivos</h2>
        <main className="mt-4 grid grid-cols-2 gap-3">
          <CountDevices
            count={data?.filter((item) => item?.tipo === "Pc")?.length}
            title={"Pc"}
          />
          <CountDevices
            count={data?.filter((item) => item?.tipo === "Laptop")?.length}
            title={"Laptop"}
          />
          <CountDevices
            count={data?.filter((item) => item?.tipo === "Red")?.length}
            title={"Red"}
          />
          <CountDevices
            count={data?.filter((item) => item?.tipo === "Camara")?.length}
            title={"Camara"}
          />
        </main>
        <ContentInfo />
      </section>
    </main>
  );
}
function CountDevices({ title, count }) {
  return (
    <section className="bg-black/60 p-3 rounded-lg text-white  ">
      <span className="text-center block text-[45px] font-bold">{count}</span>
      <h3 className="text-center text-lg mt-4">{title}</h3>
    </section>
  );
}

function ContentInfo() {
  return (
    <section className="bg-black/60 mt-10 p-4 py-7 rounded-xl">
      <img
        src={DeviceImage}
        className="p-6"
        alt="Register Users on the branch"
      />
      <span className="block text-center font-bold text-white mt-2 text-lg">
        Register Devices
      </span>
    </section>
  );
}

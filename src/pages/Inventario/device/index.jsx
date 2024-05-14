import { Outlet, useParams } from "react-router-dom";
import DeviceImage from "/Figures/DevicePage.svg";
import GeneralSect from "../Sections/GeneralSect";
import { useQuery } from "@tanstack/react-query";
import HeadCategory from "@Components/Section/components/HeadCategory";
import axiosInstance from "@/helpers/config/axios-instance";
import { clsx } from "clsx";

export default function DevicePage() {
  const { nombreE, sucursalN, idDisp } = useParams();
  const queryKey = ["GetDisp"];
  const { data, isLoading, isError } = useQuery(queryKey, async () => {
    const { data } = await axiosInstance.get(
      `Dispositivos/?empresa=${nombreE}&sucursal=${sucursalN}`
    );
    return data;
  });
  {
    isLoading && <div>Cargando...</div>;
  }
  if (idDisp) return <Outlet />;

  return (
    <main className=" pb-5  gap-5 ">
      <header className="flex gap-3 flex-wrap ">
        <ItemCount count={data?.length} label={"Total"} />
        <ItemCount
          count={data?.filter((item) => item?.tipo === "Pc")?.length}
          label={"Pc"}
        />
        <ItemCount
          label={"Laptop"}
          count={data?.filter((item) => item?.tipo === "Laptop")?.length}
        />
        <ItemCount label={'Impresora'} count={data?.filter((item) => item?.tipo === "Impresora")?.length} />
        <ItemCount label={'Activos'} count={data?.filter((item) => item?.estado === "Activo")?.length} />
      </header>
      <section>
        {isLoading && <div>Cargando...</div>}
        {isError && <div>Error al cargar los dispositivos</div>}
        {!isLoading && !isError && (
          <>
            <GeneralSect data={data} />
            
          </>
        )}
      </section>
    </main>
  );
}
function ItemCount({ icon, label, count, color, hover }) {
  const colors = {
    green: "text-green-500",
    red: "text-red-500",
    blue: "text-blue-400",
  };
  return (
    <article
      className={clsx(
        "border flex-1 px-5 py-2 max-h-[200px] h-[60px] rounded-lg border-green",
        color
      )}
    >
      <div className="flex justify-between">
        <div className="flex gap-2 items-center ">
          <span className="text-xl font-bold">{label}</span>
          <span> {icon && icon}</span>
        </div>
        <span className={clsx("text-3xl font-bold ", colors[color])}>
          {count}
        </span>
      </div>
    </article>
  );
}

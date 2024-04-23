import { Outlet, useParams } from "react-router-dom";
import RetrocederItem from "@Components/Navlinks/components/RetrocederItem";
import { ColorConteners, IconEmpresa } from "@Data/DataDefault";

import ListSucursales from "@Components/Section/components/ListSucursales";

import HeadSucur from "@Components/Section/components/HeadSucur";

function BranchsPage() {
  const { nombreE, sucursalN } = useParams();
  const aleatorio = Math.floor(Math.random() * ColorConteners.length);
  return (
    <main>
      <RetrocederItem />
      {sucursalN ? (
        <Outlet />
      ) : (
        <>
          <section className="mt-6">
            <div
              className="flex items-center justify-center w-full gap-4 px-4 py-4 text-2xl font-bold text-white rounded-lg"
              style={{ background: ColorConteners[aleatorio]?.name }}
            >
              {nombreE} <IconEmpresa />
            </div>
          </section>
          <section className="">
            <HeadSucur />
          </section>
          <section>
            <ListSucursales  />
          </section>
        </>
      )}
    </main>
  );
}
export default BranchsPage;

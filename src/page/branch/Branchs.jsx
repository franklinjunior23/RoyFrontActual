import { Outlet, useParams } from "react-router-dom";
import RetrocederItem from "@Components/Navlinks/components/RetrocederItem";
import { ColorConteners, IconEmpresa } from "@Data/DataDefault";

import ListSucursales from "@Components/Section/components/ListSucursales";

import HeadSucur from "@Components/Section/components/HeadSucur";
import { Tab } from "@headlessui/react";
import Setting from "./section/Setting";

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
          <main className="mt-5">
            <Tab.Group>
              <header className="flex justify-between">
                <Tab.List className={"flex gap-4 mt-2"}>
                  <Tab className="border-black dark:border-white ui-selected:border-b focus:outline-none">
                    Sucursales
                  </Tab>
                  <Tab className="border-black dark:border-white ui-selected:border-b focus:outline-none">
                    Configuracion
                  </Tab>
                  <Tab>Tab 3</Tab>
                </Tab.List>
                <HeadSucur />
              </header>

              <Tab.Panels className={"mt-8"}>
                <Tab.Panel>
                  <ListSucursales />
                </Tab.Panel>
                <Tab.Panel><Setting/></Tab.Panel>
                <Tab.Panel>Content 3</Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </main>
        </>
      )}
    </main>
  );
}
export default BranchsPage;

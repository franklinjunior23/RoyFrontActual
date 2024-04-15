import { Outlet } from "react-router-dom";
import Navbar from "@Components/Navbar/Navbar";

import { IconLogout } from "@tabler/icons-react";
import ViewVersion from "../pages/Layaots/dashboard/components/ViewVersion";
import NavLinks from "@Components/Navlinks/NavLinks";
import { UsecontextAuth } from "@/context/provider-auth";

function DashboardPage() {
  const { RoleUser, LogedAuth, LogautUser } = UsecontextAuth();
  return (
    <main className="  dark:bg-DarkFondo bg-white/80  md:p-3 px-5 min-h-[100dvh] md:h-[100dvh] dark:text-white">
      <div className="md:hidden">
        <Navbar />
      </div>
      <article className="md:grid grid-cols-[260px_1fr] h-full gap-10 w-full relative">
        <section className="hidden text-white  lg:grid bg-black/95 py-6   rounded-[25px] md:grid ">
          <header className="">
            <section className="px-4 custom-scrollNav">
              <NavLinks Rol={RoleUser} />
            </section>
          </header>

          <footer className="self-end h-auto mx-4 ">
            <ViewVersion />

            <header className="grid bg-DarkFondo rounded-lg grid-cols-[46px_1fr_25px] justify-between items-center p-1.5">
              <img
                src="https://img.freepik.com/psd-gratis/3d-ilustracion-persona-gafas-sol_23-2149436188.jpg?w=826&t=st=1691383252~exp=1691383852~hmac=614a2ba0e9acb94285c13bc9901478344128a4e04bb3e634fcd57264a95d9fe5"
                className="block rounded-lg md:justify-between"
                alt=""
              />
              <div className="pl-3">
                <h2 className="text-sm font-semibold text-white ">
                  {LogedAuth?.nombre}
                </h2>
                <span className="self-end text-[10px] white text-">{RoleUser}</span>
              </div>
              <div>
                <div className=" tooltip" data-tip="Cerrar Seccion">
                  <IconLogout
                    className="text-white cursor-pointer tooltip"
                    data-tip="Cerrar Seccion"
                    onClick={LogautUser}
                  />
                </div>
              </div>
            </header>
          </footer>
        </section>
        <section className="relative w-full h-full py-2 overflow-y-auto md:pr-1 custom-scrollbar">
          <Outlet />
        </section>
      </article>

      {/* Icon Hover Info Aplication Web*/}
      {/* <InfoComponent /> */}
    </main>
  );
}

export default DashboardPage;

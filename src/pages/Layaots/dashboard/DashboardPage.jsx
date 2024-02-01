import { Outlet } from "react-router-dom";
import Navbar from "@Components/Navbar/Navbar";
import { UseContextLoged } from "@Contexts/AuhtLoged";

import InfoComponent from "./InfoComponent";
import { IconLogout } from "@tabler/icons-react";

function DashboardPage({ NavUser }) {
  const { RoleUser, LogedAuth } = UseContextLoged();
  return (
    <main className="  dark:bg-DarkFondo px-5 min-h-[100dvh] md:h-[100dvh]">
      <article className="md:grid grid-cols-[280px_1fr] h-full p-4 gap-10 w-full relative">
        <section className="hidden text-white  px-10 lg:grid bg-black/90  dark:bg-DarkComponent rounded-3xl md:grid justify-between">
          <header className="  my-auto overflow-hidden">
            {/* <section className="relative mt-10  ">
              <img
                src="https://img.freepik.com/psd-gratis/3d-ilustracion-persona-gafas-sol_23-2149436188.jpg?w=826&t=st=1691383252~exp=1691383852~hmac=614a2ba0e9acb94285c13bc9901478344128a4e04bb3e634fcd57264a95d9fe5"
                className="block rounded-full w-[130px] m-auto "
                alt=""
              />
              <header className=" w-full absolute  m-auto bottom-0 grid place-content-center">
                <h6 className=" bg-white py-1 px-3 rounded-md shadow-md">
                  {RoleUser}
                </h6>
              </header>
            </section> */}
            {/* <section className="text-center">
              <h4 className=" mt-4 text-xl capitalize text-Slet font-bold">
                {LogedAuth.nombre} {LogedAuth?.apellido}
              </h4>
            </section> */}
            <section className="overflow-y-auto h-[500px] custom-scrollNav">
              <NavUser />
            </section>
          </header>
          <footer>
            <header className="grid bg-DarkFondo grid-cols-[50px_1fr_30px]">
              <img
                src="https://img.freepik.com/psd-gratis/3d-ilustracion-persona-gafas-sol_23-2149436188.jpg?w=826&t=st=1691383252~exp=1691383852~hmac=614a2ba0e9acb94285c13bc9901478344128a4e04bb3e634fcd57264a95d9fe5"
                className="w-10"
                alt=""
              />
              <div>
                <h2 className="text-xl text-white font-semibold">{LogedAuth.nombre}</h2>
                <span className="text-sm text-white">{RoleUser}</span>
              </div>
              <div>
                <IconLogout className="text-white"/>
              </div>
            </header>
          </footer>
        </section>
        <section className=" lg:ml-10 w-full lg:w-3/4 lg:h-[700px] xl:h-[735px]  lg:pr-10 lg:overflow-y-auto  lg:overflow-x-visible custom-scrollbar relative">
          <Outlet />
        </section>
      </article>

      {/* Icon Hover Info Aplication Web*/}
      <InfoComponent />
    </main>
  );
}

export default DashboardPage;

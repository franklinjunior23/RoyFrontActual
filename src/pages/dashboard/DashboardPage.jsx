import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import { UseContextLoged } from "../../context/AuhtLoged";
import Navlinks from "../../components/Navlinks/Navlinks";

function DashboardPage() {
  const { RoleUser, LogedAuth } = UseContextLoged();
  return (
    <main className=" bg-white dark:bg-DarkFondo px-5 min-h-screen">
      <Navbar />
      <article className=" lg:mt-2 lg:flex gap-10 max-w-[1400px] m-auto">
        <section className="hidden max-w-[26vw]   px-10 lg:grid  dark:bg-DarkComponent rounded-[35px] bg-gray-500/10  ">
          <header className="">
            
            <div className="relative mt-20 ">
              <img
                src="https://img.freepik.com/psd-gratis/3d-ilustracion-persona-gafas-sol_23-2149436188.jpg?w=826&t=st=1691383252~exp=1691383852~hmac=614a2ba0e9acb94285c13bc9901478344128a4e04bb3e634fcd57264a95d9fe5"
                className="block rounded-full w-[130px] m-auto "
                alt=""
              />
              <div className=" w-full absolute  m-auto bottom-0 grid place-content-center">
                <h6 className=" bg-white py-1 px-3 rounded-md shadow-md">{RoleUser}</h6>
              </div>
            </div>
            <div className="text-center">
              <h4 className=" mt-4 text-xl capitalize text-Slet font-bold">
                {LogedAuth.nombre} {LogedAuth?.apellido}
              </h4>
            </div>
            <div>
              <Navlinks />
            </div>
          </header>
        </section>
        <section className=" lg:ml-10 w-full lg:w-3/4 lg:h-[700px] xl:h-[720px]  lg:pr-10 lg:overflow-y-auto  lg:overflow-x-visible custom-scrollbar">
          <Outlet />
        </section>
        
      </article>
    </main>
  );
}

export default DashboardPage;

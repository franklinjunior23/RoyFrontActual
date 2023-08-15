import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import { UseContextLoged } from "../../context/AuhtLoged";
import Navlinks from "../../components/Navlinks/Navlinks";

function DashboardPage() {
  const { RoleUser, LogedAuth } = UseContextLoged();
  return (
    <main className="">
      <Navbar />
      <article className="px-6  my-3 lg:flex gap-10 max-w-[1350px]  m-auto">
        <section className="hidden lg:block max-w-[26vw] border-r-4 pr-12 ">
          <header className="">
            <div className="relative mt-20">
              <img
                src="https://img.freepik.com/psd-gratis/3d-ilustracion-persona-gafas-sol_23-2149436188.jpg?w=826&t=st=1691383252~exp=1691383852~hmac=614a2ba0e9acb94285c13bc9901478344128a4e04bb3e634fcd57264a95d9fe5"
                className="block rounded-full w-[130px] m-auto "
                alt=""
              />
              <div className=" absolute  m-auto bottom-0 left-[38%] ">
                <h6 className=" bg-white py-1 px-3 rounded-md  ">{RoleUser}</h6>
              </div>
            </div>
            <div className="text-center">
              <h4 className=" mt-6 text-xl text-Slet font-bold">
                {LogedAuth.nombre} {LogedAuth?.apellido}
              </h4>
              <span className="mt-2">Correogmail@instiscorp.com</span>
            </div>
            <div>
              <Navlinks />
            </div>
          </header>
        </section>
        <section className=" w-full lg:w-3/4">
          <Outlet />
        </section>
      </article>
    </main>
  );
}

export default DashboardPage;

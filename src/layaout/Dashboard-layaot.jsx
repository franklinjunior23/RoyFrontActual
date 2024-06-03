import { Outlet } from "react-router-dom";
import Sidebar from "@Components/Sidebar/Sidebar";

function DashboardPage() {
  return (
    <main className="relative items-start md:flex justify-between gap-5 ">
      {/* <div className="md:hidden">
        <Navbar />
      </div> */}
      <nav className="">
        <Sidebar />
      </nav>
      <section className="w-full md:pl-[260px] p-5 md:px-10  overflow-y-hidden ">
        <Outlet />
      </section>
    </main>
  );
}

export default DashboardPage;

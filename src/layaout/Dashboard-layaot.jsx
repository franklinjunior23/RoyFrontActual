import { Outlet } from "react-router-dom";
import Sidebar from "@Components/Sidebar/Sidebar";

function DashboardPage() {
  return (
    <main className="dark:bg-DarkFondo  ">
      <nav className="">
        <Sidebar />
      </nav>
      <section className="w-full md:pl-[270px] p-5 min-h-screen md:px-10  overflow-y-hidden ">
        <Outlet />
      </section>
    </main>
  );
}

export default DashboardPage;

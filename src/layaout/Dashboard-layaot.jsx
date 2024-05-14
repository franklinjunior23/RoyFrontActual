import { Link, Outlet } from "react-router-dom";
import Navbar from "@Components/Navbar/Navbar";
import {
  IconDotsVertical,
} from "@tabler/icons-react";
import ViewVersion from "../pages/Layaots/dashboard/components/ViewVersion";
import NavLinks from "@Components/Navlinks/NavLinks";
import { UsecontextAuth } from "@/context/provider-auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/componentUI/ui/dropdown-menu";
import { Bolt, LogOut, User } from "lucide-react";
import { Badge } from "@/componentUI/ui/badge";

function DashboardPage() {
  const { RoleUser, LogedAuth, LogautUser } = UsecontextAuth();
  return (
    <main className="dark:bg-DarkFondo bg-white/80  md:p-3 px-5 min-h-[100dvh] md:h-[100dvh] dark:text-white">
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
                <Badge
                  variant="default"
                  className="self-end bg-white text-[8px] text-black"
                >
                  {RoleUser}
                </Badge>

               
              </div>
              <div>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <IconDotsVertical className="text-white cursor-pointer tooltip" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <User className="mr-2 w-4 h-4" />
                      <Link to={"Configuracion"}>Perfil</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>Billing</DropdownMenuItem>
                    <DropdownMenuItem>
                      <Bolt className="mr-2 w-4 h-4" />
                      <Link to={"Configuracion"}>Configuración</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <LogOut className="mr-2 w-4 h-4" />
                      <span onClick={LogautUser}>Cerrar Sesion</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
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

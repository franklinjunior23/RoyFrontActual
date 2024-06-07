import { Link, Outlet } from "react-router-dom";

function Layaout() {
  return (
    <main className="md:px-5 py-2 ">
      <h2 className="text-2xl text-gray-600 font-semibold">Configuración</h2>
      <main className="flex flex-col md:flex-row  gap-10 md:gap-20 mt-10">
        <nav className="">
          <ul className=" gap-2  flex flex-col text-muted-foreground text-sm">
            <Link to={'profile'} className="font-semibold text-primary">Perfil</Link>
            <Link to={'security'} className="">Seguridad</Link>
            <Link className="">Notificaciones</Link>
          </ul>
        </nav>

        <Outlet />
      </main>

      {/**<HeaderRoutes/> */}
    </main>
  );
}

export default Layaout;

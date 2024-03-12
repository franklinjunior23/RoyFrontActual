import { Navigate, Route, Routes } from "react-router-dom";
import DashboardPage from "@Pages/Layaots/dashboard/DashboardPage";
import PageTickets from "@Pages/Tickets/PageTickets";
import {
  PageDetalle,
  PageIdBC,
  PageBaseConocimiento,
} from "../pages/BaseConoc";
import PageCreate from "@Pages/BaseConoc/PageCreate";

import PageUser from "@Pages/Users/PageUser";
import RouteHome from "./home/route-home";
import EmpresaPage from "@/pages/empresa/EmpresaPage";

function AdminRoutes() {
  return (
    <Routes>
      {/*<Route path="*" element={<Navigate to={-1} />} />*/}
      <Route element={<DashboardPage  />}>
        <Route index path="/" element={<Navigate to={"Home"} />} />
        <Route path="/Home/*" element={<RouteHome />} />
        <Route path="Empresas" element={<EmpresaPage />}/>

        <Route path="Usuarios" element={<h1>Create User</h1>} />
        <Route path="Inventario" element={<h1>inventario</h1>} />
        <Route path="Reportes" element={<h1>Reportes</h1>} />
        <Route path="Ticket" element={<PageTickets />} />
        <Route path="Ticket/:id" element={<h1>Ticket por Id</h1>} />
        <Route path="BaseConocimiento" element={<PageBaseConocimiento />} />
        <Route path="BaseConocimiento/create" element={<PageCreate />} />
        <Route path="BaseConocimiento/:id" element={<PageIdBC />} />
        <Route path="BaseConocimiento/:id/detalle" element={<PageDetalle />} />
 
       
        <Route path="Users" element={<PageUser />} />
        <Route path="Dispositivos" element={<h1>jpña</h1>} />
        <Route path="Configuracion" element={<h1>Configuracion</h1>} />
      </Route>
    </Routes>
  );
}

export default AdminRoutes;

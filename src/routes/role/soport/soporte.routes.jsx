import { Navigate, Route, Routes } from "react-router-dom";
import EmpresaPage from "@Pages/empresa/EmpresaPage";
import PageTickets from "@Pages/Tickets/PageTickets";

import RouteHome from "../../home/route-home";
import DashboardPage from "@/layaout/Dashboard-layaot";
import RouteKnowledge from "@/routes/knowledge-base/route-knowledge";
import RouteConfigure from "@/routes/configure/route-configure";
import RoutesHome from "@/routes/home/RouteHome";
import Routecmdb from "@/routes/cmdb/route-cmdb";

//Page User the Inventario of Empresa and Sucursal

function SoporteRoutes() {
  return (
    <Routes>
      <Route element={<DashboardPage />}>
        <Route index path="/" element={<Navigate to={"Home"} />} />
        <Route path="Home/*" element={<RouteHome />} />
        <Route path="Empresas" element={<EmpresaPage />} />
        <Route path="Usuarios" element={<h1>usersss</h1>} />
        <Route path="Inventario" element={<h1>inventario</h1>} />
        <Route path="Reportes" element={<h1>Reportes</h1>} />
        <Route path="Ticket" element={<PageTickets />} />
        <Route path="Ticket/:id" element={<h1>Ticket por Id</h1>} />
        <Route path="base-conocimiento/*" element={<RouteKnowledge />} />
        <Route path="Cmdb/*" element={<Routecmdb />} />
        <Route path="/Configuracion/*" element={<RouteConfigure />} />
      </Route>
    </Routes>
  );
}

export default SoporteRoutes;

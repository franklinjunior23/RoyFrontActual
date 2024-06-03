import { Navigate, Route, Routes } from "react-router-dom";

// routes shared by all users
import RouteKnowledge from "../../knowledge-base/route-knowledge";
import RouteHome from "../../home/route-home";

import PageTickets from "@Pages/Tickets/PageTickets";

import PageUser from "@Pages/Users/PageUser";

import EmpresaPage from "@/pages/empresa/EmpresaPage";
import DashboardPage from "@/layaout/Dashboard-layaot";
import RouteConfigure from "@/routes/configure/route-configure";
import Routecmdb from "@/routes/cmdb/route-cmdb";


function AdminRoutes() {
  return (
    <Routes>
      {/*<Route path="*" element={<Navigate to={-1} />} />*/}
      <Route element={<DashboardPage  />}>
        <Route index path="/" element={<Navigate to={"Home"} />} />
        <Route path="Home/*" element={<RouteHome />} />
        <Route path="Empresas" element={<EmpresaPage />}/>

        <Route path="Usuarios" element={<h1>Create User</h1>} />
        <Route path="Inventario" element={<h1>inventario</h1>} />
        <Route path="Reportes" element={<h1>Reportes</h1>} />
        <Route path="Ticket" element={<PageTickets />} />
        <Route path="Ticket/:id" element={<h1>Ticket por Id</h1>} />
        <Route path="base-conocimiento/*" element={<RouteKnowledge />} />
        <Route path="Cmdb/*" element={<Routecmdb />} />
 
       
        <Route path="Users" element={<PageUser />} />
        <Route path="Dispositivos" element={<h1>jpña</h1>} />
        <Route path="Configuracion/*" element={<RouteConfigure />} />
      </Route>
    </Routes>
  );
}

export default AdminRoutes;

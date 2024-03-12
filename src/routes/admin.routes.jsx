import { Navigate, Route, Routes } from "react-router-dom";

// routes shared by all users
import RouteKnowledge from "./knowledge-base/route-knowledge";
import RouteHome from "./home/route-home";
//
import DashboardPage from "@Pages/Layaots/dashboard/DashboardPage";
import PageTickets from "@Pages/Tickets/PageTickets";

import PageUser from "@Pages/Users/PageUser";

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
        <Route path="/BaseConocimiento/*" element={<RouteKnowledge />} />
 
       
        <Route path="Users" element={<PageUser />} />
        <Route path="Dispositivos" element={<h1>jpña</h1>} />
        <Route path="Configuracion" element={<h1>Configuracion</h1>} />
      </Route>
    </Routes>
  );
}

export default AdminRoutes;

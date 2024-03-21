import { Navigate, Route, Routes } from "react-router-dom";
import EmpresaPage from "@Pages/empresa/EmpresaPage";
import PageTickets from "@Pages/Tickets/PageTickets";

import SettingPage from "@Pages/Setting/SettingPage";
import RouteHome from "../../home/route-home";
import DashboardPage from "@/layaout/Dashboard-layaot";
import RouteKnowledge from "@/routes/knowledge-base/route-knowledge";

//Page User the Inventario of Empresa and Sucursal

function SoporteRoutes() {
  return (
    <Routes>
      <Route element={<DashboardPage />}>
        {/**Navigate to index page = dashboard */}
        <Route index path="/" element={<Navigate to={"Home"} />} />
        {/**Navigate to index end*/}

        <Route path="/Home/*" element={<RouteHome />} />
        <Route path="Empresas" element={<EmpresaPage />} />

        <Route path="Usuarios" element={<h1>usersss</h1>} />
        <Route path="Inventario" element={<h1>inventario</h1>} />
        <Route path="Reportes" element={<h1>Reportes</h1>} />
        <Route path="Ticket" element={<PageTickets />} />
        <Route path="Ticket/:id" element={<h1>Ticket por Id</h1>} />
        <Route path="/BaseConocimiento/*" element={<RouteKnowledge />} />

        <Route path="Configuracion" element={<SettingPage />} />
      </Route>
    </Routes>
  );
}

export default SoporteRoutes;

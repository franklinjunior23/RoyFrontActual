import { Navigate, Route, Routes } from "react-router-dom";
import DashboardPage from "@Pages/Layaots/dashboard/DashboardPage";
import EmpresaPage from "@Pages/empresa/EmpresaPage";
import PageTickets from "@Pages/Tickets/PageTickets";

import SettingPage from "@Pages/Setting/SettingPage";
import RouteHome from "./home/route-home";

//Page User the Inventario of Empresa and Sucursal

function SoporteRoutes() {
  return (
    <Routes>
      <Route element={<DashboardPage />}>
        <Route index path="/" element={<Navigate to={"Home"} />} />
        <Route path="/Home/*" element={<RouteHome />} />
        <Route path="Empresas" element={<EmpresaPage />}/>

          
        <Route path="Usuarios" element={<h1>usersss</h1>} />
        <Route path="Inventario" element={<h1>inventario</h1>} />
        <Route path="Reportes" element={<h1>Reportes</h1>} />
        <Route path="Ticket" element={<PageTickets />} />
        <Route path="Ticket/:id" element={<h1>Ticket por Id</h1>} />
        <Route path="/BaseConocimiento/*" element={<RouteHome />} />

        <Route path="Configuracion" element={<SettingPage />} />
      </Route>
    </Routes>
  );
}

export default SoporteRoutes;

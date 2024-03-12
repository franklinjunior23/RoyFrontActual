import { Navigate, Route, Routes } from "react-router-dom";
import DashboardPage from "@Pages/Layaots/dashboard/DashboardPage";

import EmpresaDet from "@Pages/empresa/EmpresaDet";
import UserPage from "@/pages/Inventario/Users/Users";

import CreateDisp from "@Pages/Inventario/Forms/CreateDisp";

import CategoryS from "@Pages/empresa/CategoryS";
import UserForm from "@Components/User/components/UserForm";

import GeneralSect from "@Pages/Inventario/Sections/GeneralSect";
import EmpresaPage from "@Pages/empresa/EmpresaPage";
import PageTickets from "@Pages/Tickets/PageTickets";
import { PageDetalle, PageIdBC, PageBaseConocimiento } from "@Pages/BaseConoc";
import PageCreate from "@Pages/BaseConoc/PageCreate";
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
        <Route path="BaseConocimiento" element={<PageBaseConocimiento />} />
        <Route path="BaseConocimiento/create" element={<PageCreate />} />
        <Route path="BaseConocimiento/:id" element={<PageIdBC />} />
        <Route path="BaseConocimiento/:id/detalle" element={<PageDetalle />} />

        <Route path="Configuracion" element={<SettingPage />} />
      </Route>
    </Routes>
  );
}

export default SoporteRoutes;

import { Navigate, Route, Routes } from "react-router-dom";
import DashboardPage from "@Pages/Layaots/dashboard/DashboardPage";
import Home from "@Pages/Home/Home";
import EmpresaDet from "@Pages/empresa/EmpresaDet";
import CategoryS from "@Pages/empresa/CategoryS";
import UserPage from "@Components/Section/UserPage";
import UserForm from "@Components/User/components/UserForm";
import CreateDisp from "@Pages/Inventario/Forms/CreateDisp";
import GeneralSect from "@Pages/Inventario/Sections/GeneralSect";
import EmpresaPage from "@Pages/empresa/EmpresaPage";
import PageTickets from "@Pages/Tickets/PageTickets";
import {
  PageDetalle,
  PageIdBC,
  PageBaseConocimiento,
} from "../pages/BaseConoc";
import PageCreate from "@Pages/BaseConoc/PageCreate";
import NavLinksAdmin from "@Components/Navlinks/NavLinksAdmin";
import PageUser from "@Pages/Users/PageUser";

function AdminRoutes() {
  return (
    <Routes>
      {/*<Route path="*" element={<Navigate to={-1} />} />*/}
      <Route element={<DashboardPage NavUser={NavLinksAdmin} />}>
        <Route index path="/" element={<Navigate to={"Home"} />} />
        <Route path="Home" element={<Home />}>
          <Route path=":nombreE" element={<EmpresaDet />}>
            <Route path=":sucursalN" element={<CategoryS />}>
              <Route path="Usuarios" element={<UserPage />} />
              <Route path="Usuarios/create" element={<UserForm />} />
              <Route path="Usuarios/:idUsuario" element={<UserForm />} />
              <Route path="Inventario" element={<GeneralSect />}>
                <Route path=":idDisp" element={<CreateDisp />} />
              </Route>
            </Route>
          </Route>
        </Route>
        <Route path="Empresas" element={<EmpresaPage />}>
          <Route path=":nombreE" element={<EmpresaDet />}>
            <Route path=":sucursalN" element={<CategoryS />}>
              <Route path="Usuarios" element={<UserPage />} />
              <Route path="Usuarios/create" element={<UserForm />} />
              <Route path="Usuarios/:idUsuario" element={<UserForm />} />
              <Route path="Inventario" element={<GeneralSect />}>
                <Route path=":idDisp" element={<CreateDisp />} />
              </Route>
            </Route>
          </Route>
        </Route>
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

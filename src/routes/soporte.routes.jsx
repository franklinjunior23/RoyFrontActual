import { Navigate, Route, Routes } from "react-router-dom";
import DashboardPage from "@Pages/Layaots/dashboard/DashboardPage";
import Home from "@Pages/Home/Home";
import EmpresaDet from "@Pages/empresa/EmpresaDet";
import CategoryS from "@Pages/empresa/CategoryS";

import UserForm from "@Components/User/components/UserForm";
import CreateDisp from "@Pages/Inventario/Forms/CreateDisp";
import GeneralSect from "@Pages/Inventario/Sections/GeneralSect";
import EmpresaPage from "@Pages/empresa/EmpresaPage";
import PageTickets from "@Pages/Tickets/PageTickets";
import { PageDetalle, PageIdBC, PageBaseConocimiento } from "@Pages/BaseConoc";
import PageCreate from "@Pages/BaseConoc/PageCreate";
import SettingPage from "@Pages/Setting/SettingPage";

import PageCreateArea from "@Pages/Inventario/Area/PageCreate";

//Page User the Inventario of Empresa and Sucursal
import PageUser from "@Pages/Inventario/Users";
import LayaotInventory from "@/pages/Inventario/LayaotInventory";
import UserPage from "@/pages/Inventario/Users/Users";
import DevicePage from "@/pages/Inventario/device";

function SoporteRoutes() {
  return (
    <Routes>
      <Route element={<DashboardPage />}>
        <Route index path="/" element={<Navigate to={"Home"} />} />
        <Route path="Home" element={<Home />}>
          <Route path=":nombreE" element={<EmpresaDet />}>
            <Route path=":sucursalN" element={<LayaotInventory />}>
              <Route path="Usuarios" element={<UserPage/>} />
              <Route path="Usuarios/create" element={<PageUser />} />
              <Route path="Usuarios/:idUsuario" element={<PageUser />} />
              <Route path="Usuarios/create-area" element={<PageCreateArea />} />

              <Route path="Inventario" element={<DevicePage />}/>
              <Route path="Inventario/:idDisp" element={<CreateDisp />} />
              <Route path="Inventario/:idDisp/historial" element={<>h22</>} />
              <Route
                path="Inventario/create-area"
                element={<PageCreateArea />}
              />
              {/*<Route path="*" element={<Navigate to={-1} />} />*/}
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
              {/*<Route path="*" element={<Navigate to={-1} />} />*/}
            </Route>
          </Route>
        </Route>
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

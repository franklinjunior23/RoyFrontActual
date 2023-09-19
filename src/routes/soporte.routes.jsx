import { Navigate, Route, Routes } from "react-router-dom";
import DashboardPage from "../pages/dashboard/DashboardPage";
import Home from "../pages/Home/Home";
import EmpresaDet from "../pages/empresa/EmpresaDet";
import CategoryS from "../pages/empresa/CategoryS";
import UserPage from "../components/Section/UserPage";
import PageUsusuario from "../components/User/PageUsusuario";
import PageInventario from "../pages/Inventario/PageInventario";
import CategoryInvent from "../pages/Inventario/Sections/CategoryInvent";
import ItemSection from "../components/Section/ItemSection";
import UserForm from "../components/User/components/UserForm";
import IdDispositivo from "../pages/Inventario/IdDispositivo";
import CreateDisp from "../pages/Inventario/Forms/CreateDisp";
import GeneralSect from "../pages/Inventario/Sections/GeneralSect";
import EmpresaPage from "../pages/empresa/EmpresaPage";

function SoporteRoutes() {
  return (
    <Routes>
      <Route element={<DashboardPage />}>
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

        <Route path="Configuracion" element={<h1>Configuracion</h1>} />
      </Route>
    </Routes>
  );
}

export default SoporteRoutes;

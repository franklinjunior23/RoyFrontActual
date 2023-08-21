import { Route, Routes } from "react-router-dom";
import DashboardPage from "../pages/dashboard/DashboardPage";
import Home from "../pages/Home/Home";
import EmpresaDet from "../pages/empresa/EmpresaDet";
import CategoryS from "../pages/empresa/CategoryS";
import UserPage from "../components/Section/UserPage";
import PageUsusuario from "../components/User/PageUsusuario";
import PageInventario from "../pages/Inventario/PageInventario";
import CategoryInvent from "../pages/Inventario/Sections/CategoryInvent";


function SoporteRoutes() {
  return (
    <Routes>
      <Route element={<DashboardPage />}>
        <Route index path="/" element={<Home />} />
        <Route path=":nombreE" element={<EmpresaDet />}>
          <Route path=":sucursalN" element={<CategoryS />}>
            <Route path="Usuarios" element={<UserPage />} />
            <Route path="Usuarios/:idUsuario" element={<PageUsusuario />} />
            <Route path="Inventario" element={<PageInventario />}>
              <Route path=":CategoryInventario" element={<CategoryInvent/>} />
            </Route>
          </Route>
        </Route>
        <Route  path="Empresas" element={<>hola </>} />
        <Route path="Usuarios" element={<h1>usersss</h1>} />
        <Route path="Inventario" element={<h1>inventario</h1>} />
        <Route path="Reportes" element={<h1>Reportes</h1>} />

        <Route path="Configuracion" element={<h1>Configuracion</h1>} />
        
      </Route>
    </Routes>
  );
}

export default SoporteRoutes;

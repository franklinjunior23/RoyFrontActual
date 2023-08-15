import { Route, Routes } from "react-router-dom";
import DashboardPage from "../pages/dashboard/DashboardPage";
import Home from "../pages/Home/Home";
import EmpresaDet from "../pages/empresa/EmpresaDet";
import CategoryS from "../pages/empresa/CategoryS";

function SoporteRoutes() {
  return (
    <Routes>
      <Route element={<DashboardPage />}>
        <Route index path="/" element={<Home />} />
        <Route path=":nombreE" element={<EmpresaDet />}>
          <Route path=":sucursalN" element={<CategoryS/>}>
            <Route path="Usuarios" element={<h2>Users</h2>} />
            <Route path="Inventario" element={<h2>Inventario</h2>} />

          </Route>
        </Route>
        <Route index path="Empresas" element={<>hola </>} />
        <Route path="Configuracion" element={<h1>Configuracion</h1>} />
        <Route path="Usuarios" element={<h1>usersss</h1>} />
      </Route>
    </Routes>
  );
}

export default SoporteRoutes;

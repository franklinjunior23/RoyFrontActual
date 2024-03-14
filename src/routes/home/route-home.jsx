
import UserPage from "@/pages/Inventario/Users/Users";
import LayaotInventory from "@/pages/Inventario/LayaotInventory";
import PageUser from "@Pages/Inventario/Users";
import PageCreateArea from "@Pages/Inventario/Area/PageCreate";
import DevicePage from "@/pages/Inventario/device";
import CreateDisp from "@Pages/Inventario/Forms/CreateDisp";

import { Route, Routes } from "react-router-dom";
import BranchsPage from "@/page/Branchs";
import Home from "@/page/home/Home";

function RouteHome() {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route path=":nombreE" element={<BranchsPage />}>
          <Route path=":sucursalN" element={<LayaotInventory />}>
            <Route path="Usuarios" element={<UserPage />} />
            <Route path="Usuarios/create" element={<PageUser />} />
            <Route path="Usuarios/:idUsuario" element={<PageUser />} />
            <Route path="Usuarios/create-area" element={<PageCreateArea />} />

            <Route path="Inventario" element={<DevicePage />} />
            <Route path="Inventario/:idDisp" element={<CreateDisp />} />
            <Route path="Inventario/:idDisp/historial" element={<>h22</>} />
            <Route path="Inventario/create-area" element={<PageCreateArea />} />
            {/*<Route path="*" element={<Navigate to={-1} />} />*/}
          </Route>
        </Route>
      </Route>
      {/**
         * <Route path="/:nombreE" element={<EmpresaDet />}/>
      <Route path="/:sucursalN" element={<LayaotInventory />}/>
         * 
         */}
    </Routes>
  );
}
export default RouteHome;

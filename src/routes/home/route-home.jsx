import UserPage from "@/pages/Inventario/Users/Users";
import LayaotInventory from "@/pages/Inventario/LayaotInventory";
import PageUser from "@Pages/Inventario/Users";
import PageCreateArea from "@Pages/Inventario/Area/PageCreate";
import DevicePage from "@/pages/Inventario/device";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import Home from "@/page/home/Home";
import PageCreateDevice from "@/page/inventory/device/create-device";
import { DataFieldsBandle } from "@/page/inventory/device/form/const/Fields-brangdle";
import Headerfields from "@/page/inventory/device/form/components/Header-fields";
import BranchsPage from "@/page/branch/Branchs";




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
            <Route path="Inventario/create" element={<PageCreateDevice />} />

            <Route
              path="Inventario/:idDisp"
              element={
                <>
                  <Headerfields fields={DataFieldsBandle} />
                </>
              }
            >
              <Route path="" element={<Navigate to={"summary"} />} />
              {DataFieldsBandle.map((value) => {
                if(value.pageContent === null) return;
                return (
                  <Route
                  key={value.label}
                  path={value.value}
                  element={<>{value?.pageContent}</> }
                />
                )
              })}
              <Route path="edit" element={<PageCreateDevice/> } />
            </Route>
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}
export default RouteHome;

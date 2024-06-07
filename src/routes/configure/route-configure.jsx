import PageConfig from "@/page/config/Config";
import Layaout from "@/page/config/Layaout";
import { Route, Routes } from "react-router-dom";

function RouteConfigure() {
  return (
    <Routes>
      <Route path="/" element={<Layaout />}>
        <Route path="profile" element={<PageConfig />} />
      </Route>
    </Routes>
  );
}

export default RouteConfigure;

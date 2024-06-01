import PageConfig from "@/page/config/Config";
import { Route, Routes } from "react-router-dom";

function RouteConfigure() {
  return (
    <Routes>
        <Route path="/" element={<PageConfig/>} />
    </Routes>
  )
}

export default RouteConfigure
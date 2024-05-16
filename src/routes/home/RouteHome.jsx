import BranchsPage from "@/page/branch/Branchs";
import Home from "@/page/home/Home";
import PageUser from "@/pages/Inventario/Users";
import UserPage from "@/pages/Inventario/Users/Users";
import { Route, Routes } from "react-router-dom";

export default function RoutesHome() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path=":nombreE" element={<BranchsPage />} />

      <Route path=":nombreE/:sucursalN/usuarios" element={<UserPage />} />
      <Route path=":nombreE/:sucursalN/usuarios/create" element={<PageUser />} />
    </Routes>
  );
}

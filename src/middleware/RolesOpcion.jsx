import { Navigate } from "react-router-dom";

import AdminRoutes from "../routes/admin.routes";
import ClienteRoutes from "../routes/cliente.routes";
import SoporteRoutes from "../routes/soporte.routes";
import { UsecontextAuth } from "@/context/provider-auth";

function RolesOpcion() {
  const { RoleUser } = UsecontextAuth();
  if (!RoleUser ) {
    return <Navigate to={"/"} />;
  }
  switch (RoleUser) {
    case "Administrador":
      return <AdminRoutes />;
    case "Cliente":
      return <ClienteRoutes />;
    case "Soporte":
      return <SoporteRoutes />;
  }
}

export default RolesOpcion;

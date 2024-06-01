import { Navigate } from "react-router-dom";

import AdminRoutes from "../routes/role/admin/admin.routes";
import ClienteRoutes from "../routes/role/client/cliente.routes";
import SoporteRoutes from "../routes/role/soport/soporte.routes";
import { UsecontextAuth } from "@/context/provider-auth";

function RoleMiddleware() {
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

export default RoleMiddleware;

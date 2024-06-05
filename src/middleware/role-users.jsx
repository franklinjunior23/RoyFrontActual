import { Navigate } from "react-router-dom";

import AdminRoutes from "../routes/role/admin/admin.routes";
import ClienteRoutes from "../routes/role/client/cliente.routes";
import SoporteRoutes from "../routes/role/soport/soporte.routes";
import { UsecontextAuth } from "@/context/provider-auth";
import { ProviderNotification } from "@/context/Provider-SocketIo";

function RoleMiddleware() {
  const { RoleUser } = UsecontextAuth();
  if (!RoleUser) {
    return <Navigate to={"/"} />;
  }

  switch (RoleUser) {
    case "Administrador":
      return (
        <ProviderNotification>
          <AdminRoutes />
        </ProviderNotification>
      );
    case "Cliente":
      return (
        <ProviderNotification>
          <ClienteRoutes />
        </ProviderNotification>
      );
    case "Soporte":
      return (
        <ProviderNotification>
          <SoporteRoutes />
        </ProviderNotification>
      );
  }
}

export default RoleMiddleware;

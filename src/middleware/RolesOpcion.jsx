import { Navigate } from "react-router-dom";
import { UseContextLoged } from "../context/AuhtLoged";
import AdminRoutes from "../routes/admin.routes";
import ClienteRoutes from "../routes/cliente.routes";
import SoporteRoutes from "../routes/soporte.routes";

function RolesOpcion() {
  const { RoleUser } = UseContextLoged();
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

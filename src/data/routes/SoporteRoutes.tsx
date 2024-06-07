import { Book, LayoutPanelLeft, MonitorSmartphone, Notebook, Store, Users } from "lucide-react";
type RouteType = {
  groupName: string;
  items: {
    label: string;
    path: string;
    Icon: any;
  }[];
};

export const PublicRoutes: RouteType[] = [
  {
    groupName: "Inicio",
    items: [
      {
        label: "Home",
        path: "Home",
        Icon: LayoutPanelLeft,
      },
      {
        label: "Empresas",
        path: "Empresas",
        Icon: Store,
      },
    ],
  },
  {
    groupName: "Base de Conocimiento",
    items: [
      {
        label: "Inicio",
        path: "base-conocimiento",
        Icon: Book,
      },
    ],
  },
  {
    groupName: "Tareas",
    items: [
      {
        label: "Tablero",
        path: "Tasks",
        Icon: Notebook,
      },
    ],
  },
];

export const SoporteRoutes: RouteType[] = [...PublicRoutes];

export const AdministradorRoutes: RouteType[] = [...PublicRoutes,
  {
    groupName: "Administracion",
    items: [
      {
        label: "Usuarios",
        path: "Users",
        Icon: Users,
      },
      {
        label: "Dispositivos",
        path: "Dispositivos",
        Icon: MonitorSmartphone,
      }
    ],
  }
];

export const ClienteRoutes: RouteType[] = [...PublicRoutes];

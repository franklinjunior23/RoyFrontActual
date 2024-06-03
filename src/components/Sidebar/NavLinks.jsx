import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/componentUI/ui/command";
import { UsecontextAuth } from "@/context/provider-auth";
import { AdministradorRoutes, SoporteRoutes } from "@/data/routes/SoporteRoutes";
import { Download } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

function NavLinks() {
  const { RoleUser } = UsecontextAuth();
  const { pathname } = useLocation();
  const pathnames = pathname.split("/").pop();

  const TypesNav = [
    { name: "Soporte", data: SoporteRoutes },
    { name: "Administrador", data: AdministradorRoutes },
    // { name: "Visitante", data: LinksAdministratorData },
  ];
  const ifExistUser = TypesNav.find((nav) => nav.name === RoleUser);
  if (!ifExistUser) {
    return <h1>NO loged</h1>;
  }

  return (
    <div className="grow">
      <Command
        style={{
          overflow: "visible",
        }}
      >
        <CommandList
          style={{
            overflow: "visible",
          }}
        >
          {ifExistUser.data.map((dat, index) => (
            <CommandGroup key={index} heading={dat.groupName}>
              {dat.items.map((route, index) => (
                <CommandItem
                  key={index}
                  aria-selected={pathnames === route.path}
                  className="  flex gap-3 cursor-pointer tracking-wide"
                  asChild
                >
                  <Link to={route.path}>
                    <route.Icon className="w-5 h-5" /> {route.label}
                  </Link>
                </CommandItem>
              ))}
            </CommandGroup>
          ))}
          <CommandSeparator />
          <CommandGroup heading="Agente">
            <CommandItem className="tracking-wide">
              <a
                href="https://drive.google.com/drive/u/1/folders/1zU_lZRimfLAkyaiPc-gsfhxVHNA_8MCb"
                target="_blank"
                className="flex gap-3"
                rel="noreferrer"
              >
                <Download className="w-5 h-5 " /> Descargar
              </a>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  );
}

export default NavLinks;

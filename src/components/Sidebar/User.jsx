import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/componentUI/ui/dropdown-menu";
import { Bolt, LogOut, Settings, User } from "lucide-react";

import { Link } from "react-router-dom";
import { UsecontextAuth } from "@/context/provider-auth";
import ViewVersion from "@/pages/Layaots/dashboard/components/ViewVersion";
import { Avatar, AvatarFallback } from "@/componentUI/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import TruncateText from "@/helpers/utils/truncate-text";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/componentUI/ui/tooltip";
import { MyAvatar } from "@/helpers/utils/avatar-ui";
function UserHead() {

  const { RoleUser, LogedAuth, LogautUser } = UsecontextAuth();

  return (
    <footer className="">
      <ViewVersion />

      <header className="flex justify-between items-center">
        <Link to={"configuracion/profile"} className="flex items-center gap-2">
          <Settings className="w-5 h-5" />
          <span className="text-[12px]">Ajustes</span>
        </Link>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="cursor-pointer">
              <AvatarImage
                src={MyAvatar()}
                alt="User"
              />
              <AvatarFallback>{LogedAuth?.nombre}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <TruncateText
                      maxLength={13}
                      text={`${LogedAuth?.nombre} ${LogedAuth?.apellido}`}
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    {`${LogedAuth?.nombre} ${LogedAuth?.apellido}`}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 w-4 h-4" />
              <Link to={"configuracion/profile"}>Mi Perfil</Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={LogautUser}>
              <LogOut className="mr-2 w-4 h-4" />
             Cerrar Sesion
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>
    </footer>
  );
}

export default UserHead;

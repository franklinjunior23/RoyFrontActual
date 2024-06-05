import { Button, buttonVariants } from "@/componentUI/ui/button";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/componentUI/ui/command";
import { Input } from "@/componentUI/ui/input";
import Buttom from "@Components/Buttons/Buttom/Buttom";

import { IconBell, IconSearch } from "@tabler/icons-react";
import { Bell, Search } from "lucide-react";
import { useState } from "react";
import Notifications from "./Notifications";

function Header() {
  const [OpenComman, setOpenComman] = useState(false);
  const today = new Date();
  const Format = formatDate(today);

  return (
    <header className="flex justify-between">
      <section>
        <h4 className="text-blue-600 text-3xl font-bold capitalize">
          Dashboard
        </h4>
        <p className="text-Chiqui capitalize dark:text-white pb-2 mt-1 text-sm  ">
          {Format}
        </p>
      </section>
      <section className="  hidden md:flex gap-3 ">
        <label
          onClick={() => setOpenComman(true)}
          className={buttonVariants({ variant: "outline" })}
        >
          <Search className="w-5 h-5 mr-3" />
          <span className="text-xs text-gray-500">
            Buscar en la documentación ...
          </span>
        </label>
        <CommandDialog open={OpenComman} onOpenChange={setOpenComman}>
          <Command>
            <CommandInput
              className="md:w-[200px]"
              placeholder="Escriba palabra clave..."
            />

            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Suggestions">
                <CommandItem>Calendar</CommandItem>
                <CommandItem>Search Emoji</CommandItem>
                <CommandItem>Calculator</CommandItem>
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="Settings">
                <CommandItem>Profile</CommandItem>
                <CommandItem>Billing</CommandItem>
                <CommandItem>Settings</CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </CommandDialog>

        <Notifications>
          <Button size="icon" className="relative" variant="outline">
            <Bell className="w-6 h-5" />
            <div className="bg-green-500 absolute w-3 h-3  rounded-full -top-1 -right-1" />
          </Button>
        </Notifications>
      </section>
    </header>
  );
}

export default Header;
function formatDate(date) {
  const options = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  return date.toLocaleDateString("es-PE", options);
}

//   <div className="self-end">
//       <ItSection dato={true} />
//     </div>

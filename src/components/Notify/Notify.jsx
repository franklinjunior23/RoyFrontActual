import { IconBell } from "@tabler/icons-react";
import { useState } from "react";
import ItemNotify from "./components/ItemNotify";

function Notify() {
  const [ActiveNotifyView, setActiveNotifyView] = useState(false);

  function HandleNotifyView() {
    setActiveNotifyView(!ActiveNotifyView);
  }
  return (
    <>
      <IconBell
        width={25}
        height={30}
        strokeWidth={1.5}
        onClick={HandleNotifyView}
      />
      {ActiveNotifyView && (
        <header className="absolute top-16 right-0 z-50 py-5 px-5 rounded-xl bg-white w-[375px] h-[500px]">
          <section className="h-full overflow-y-auto custom-scrollbar pr-2">
            <h3 className="text-black/50 font-bold ">Hoy</h3>

            <ItemNotify Description={'User create to database in empresa to sucursal the bolicvian and create user '} />
            <ItemNotify Description={'User create to database in empresa to sucursal the bolicvian and create user dawa ad a wda wd awd aw dadadaw da wd a daw d awdaw daw dawdawdadaw '} />
          </section>
        </header>
      )}
    </>
  );
}

export default Notify;

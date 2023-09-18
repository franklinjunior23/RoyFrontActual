import { useState } from "react";
import ListMenu from "./ListMenu";
import { IconAlignLeft, IconX } from "@tabler/icons-react";

function Menu() {
  const [ActiveMenu, setActiveMenu] = useState(false);
  const handleActive = () => {
    setActiveMenu(!ActiveMenu);
  };
  return (
    <>
      <section
        className="lg:hidden cursor-pointer relative dark:text-white"
        onClick={handleActive}
      >
        {ActiveMenu ? (
          <IconX width={35} height={35} strokeWidth={1.5} />
        ) : (
          <IconAlignLeft width={35} height={35} strokeWidth={1.5} />
        )}
      </section>
      {ActiveMenu && <ListMenu handle={setActiveMenu} />}
    </>
  );
}

export default Menu;

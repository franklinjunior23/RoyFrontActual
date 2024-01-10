import {
  IconFileText,
  IconInfoCircle,
  IconLayoutDashboard,
  IconUser,
} from "@tabler/icons-react";
import { useParams } from "react-router-dom";
import ItemNav from "./ItemNav";

function Navbar() {
  const { id } = useParams();
  return (
    <header className=" rounded-lg fixed w-screen grid bottom-3 md:bottom-10  right-0">
      <footer className="bg-DarkComponent mx-auto rounded-xl py-2 grid grid-cols-4  px-2  w-[90%] md:w-[460px]">
        <ItemNav
          Icon={<IconLayoutDashboard size={30} color="white" />}
          label={"Home"}
          path={`/Dispositivo/${id}`}
        />
        <ItemNav Icon={<IconUser  size={30} color="white"/>} label={"Usuario"} path={`Usuario`} />
        <ItemNav Icon={<IconFileText size={30} color="white" />} label={"Informes"} path={`Informes`} />
        <ItemNav Icon={<IconInfoCircle  size={30} color="white"/>} label={"Detalle"} path={`Detalle`} />
      </footer>
    </header>
  );
}

export default Navbar;

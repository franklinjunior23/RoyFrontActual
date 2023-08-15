import { UseContextLoged } from "../../context/AuhtLoged";
import LogoNav from "./components/LogoNav";
import Menu from "./components/Menu";
import MenuUser from "./components/MenuUser";

function Navbar() {
  const { LogedAuth } = UseContextLoged();
  return (
    <nav className="max-w-screen-xl m-auto py-4 lg:py-2 px-6 flex justify-between items-center">
      <LogoNav/>
      
       <Menu/>
      
      <MenuUser User={LogedAuth} />
    </nav>
  );
}

export default Navbar;


import { UsecontextAuth } from "@/context/provider-auth";
import LogoNav from "./components/LogoNav";
import Menu from "./components/Menu";
import MenuUser from "./components/MenuUser";

function Navbar() {
  const { LogedAuth } = UsecontextAuth();
  return (
    <nav className="max-w-[1400px] py-6 m-auto  lg:py-2  flex justify-between items-center">
      <LogoNav/>
      
       <Menu/>
      
      <MenuUser User={LogedAuth} />
    </nav>
  );
}

export default Navbar;

import { useState } from "react";
import ListMenu from "./ListMenu";

function Menu() {
    const [ActiveMenu, setActiveMenu] = useState(false);
    const handleActive=()=>{
        setActiveMenu(!ActiveMenu)
    }
  return (
   <>
     <section className="lg:hidden cursor-pointer relative" onClick={handleActive}>
       <i className="fi fi-rr-apps text-2xl " />
     </section>
     {
         ActiveMenu && ( <ListMenu/>)
     }
    
   </>
  );
}

export default Menu;

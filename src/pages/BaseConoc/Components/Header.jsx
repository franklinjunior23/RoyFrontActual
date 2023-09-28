import { IconClipboardText, IconSearch, IconX } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

function Header({ setValue, Value }) {
  const navi = useNavigate()
  return (
    <header className="grid ">
      <div>
        <h2 className="dark:text-white text-xl pb-2 border-b mb-5">
          Base de Conocimiento /
        </h2>
      </div>
      <nav className="md:justify-self-end md:flex md:gap-2 flex-col md:flex-row md:mt-2">
        <div className="flex bg-DarkComponent py-2 px-2 rounded-md gap-2 justify-between">
          <input
            type="text"
            className="bg-transparent indent-0.5 border-none focus:outline-none text-base text-white"
            placeholder="Busqueda de Conocimiento"
            value={Value}
            onChange={(e) => setValue(e.target.value)}
          />
         <div className="flex items-center gap-1 text-white">
           {Value !== "" && <IconX  strokeWidth={2} size={20} onClick={()=>setValue('')} className="cursor-pointer" />}
           <IconSearch color="white" />
         </div>
        </div>
        <button onClick={()=>navi(`${-1,'Create'}`)} className="bg-black mt-4 md:mt-0 px-2  py-2 lg:py-0  text-white rounded-md flex items-center gap-1">
          Crear <IconClipboardText />
        </button>
      </nav>
    </header>
  );
}
export default Header;

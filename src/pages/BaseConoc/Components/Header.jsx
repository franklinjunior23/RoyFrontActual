import { IconClipboardText, IconSearch } from "@tabler/icons-react";

function Header({setValue,Value}) {
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
            placeholder="Busqueda del Id ..."
            value={Value}
            onChange={(e)=>setValue(e.target.value)}
          />
          <IconSearch color="white" />
        </div>
        <button className="bg-black mt-4 md:mt-0 px-2  py-2 lg:py-0  text-white rounded-md flex items-center gap-1">
          Crear <IconClipboardText/>
        </button>
      </nav>
    </header>
  );
}
export default Header;

import { IconSearch } from "@tabler/icons-react";

function Header({ Name, setName }) {
  return (
    <header className="w-full mt-5 md:mt-0">
      <nav className="flex justify-end gap-3 items-end">
        <div className="dark:bg-DarkComponent border dark:border-none gap-1 md:gap-3 rounded-lg px-2 md:py-1 flex items-center dark:text-white">
          <input
            type="text"
            value={Name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Busqueda del Ticket"
            className="indent-2 text-base py-1 outline-none  bg-transparent"
          />
          <IconSearch  />
        </div>
        <div>  <button className="dark:text-white bg-black py-2 rounded-md px-3 ">Crear Ticket</button></div>
      </nav>
      
    </header>
  );
}
export default Header;

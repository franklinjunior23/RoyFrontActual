import { IconSearch, IconTicket } from "@tabler/icons-react";
import { DateTime } from "luxon";
import { useNavigate } from "react-router-dom";

function Header({ Name, setName }) {
const navi = useNavigate()
const fechaHoraLima = DateTime.now().setZone('America/Lima');
const fechaFormateada = fechaHoraLima.toFormat('dd/MM/yyyy');
  return (
    <>
      <h2 className="dark:text-white text-xl pb-2 border-b mb-5">Ticket /</h2>
      <header className="w-full mt-5 md:mt-0">
        <nav className="flex flex-col md:flex-row  md:justify-end gap-2 md:items-end">
          <div className="dark:bg-DarkComponent border dark:border-none gap-1 md:gap-3 rounded-lg px-2 md:py-2 flex justify-between items-center dark:text-white">
            <input
              type="text"
              value={Name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Busqueda del Ticket"
              className="indent-2 text-base py-2 md:py-0 w-[90%]  outline-none  bg-transparent"
            />
            <IconSearch />
          </div>
          <div>
            <button className=" text-white mt-2 flex gap-2 bg-black md:py-2 py-2 rounded-lg  px-3 " onClick={()=>{navi("create") }} >
              Crear <IconTicket />
            </button>
          </div>
        </nav>
      </header>
      <div className="flex justify-end mt-4">
        <h4 className=" text-black dark:text-white black px-4 border dark:border rounded-md  tracking-wider">{fechaFormateada}</h4>
      </div>
      
    </>
  );
}
export default Header;

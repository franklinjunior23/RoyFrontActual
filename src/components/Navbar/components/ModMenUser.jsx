import { Link, useNavigate } from "react-router-dom";
import { UsecontextAuth } from "@/context/provider-auth";

function ModMenUser() {
const {LogautUser}=UsecontextAuth();
const navi = useNavigate()
const handleLogaut = ()=>{
    LogautUser()
    return navi('/')
}
  return (
    <aside className="absolute z-10  -bottom-20 cursor-pointer right-0 shadow-md bg-white rounded-lg overflow-hidden">
      <ul className="flex flex-col text-sm">
        <li className=" py-2 px-4  hover:bg-slate-300">
            <Link to={'Configuracion'}>Configuracion</Link>
        </li>
        <li className="py-2 px-4  hover:bg-slate-300" onClick={handleLogaut}>
            <span>Cerrar Sesion</span>
        </li>
      </ul>
    </aside>
  );
}

export default ModMenUser;

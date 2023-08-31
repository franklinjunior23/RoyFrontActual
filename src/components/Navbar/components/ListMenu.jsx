import { Link } from "react-router-dom";
import { NavData } from "../../../assets/DataDefault";

function ListMenu({handle}) {
  return (
    <>
      <aside className="fixed lg:hidden z-50 left-5 rounded-lg top-14 w-[45%] md:w-[20%]  bg-white shadow-md">
        <ul>
          {NavData.map((dat, index) => (
            <li key={index} className="text-center py-2 hover:bg-slate-200">
              <Link to={dat.url} onClick={()=>handle(false)}>{dat.name}</Link>
            </li>
          ))}
        </ul>
      </aside>
    </>
  );
}

export default ListMenu;

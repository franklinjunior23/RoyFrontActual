import { IconDotsVertical, IconUser } from "@tabler/icons-react";
import { useState } from "react";
import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
function ItemUsers({ dato }) {
  const { nombre, apellido,id } = dato;
  const [ActiveOption, setActiveOption] = useState(false);
  const HandleEditarUser = ()=>{
    setActiveOption(!ActiveOption)
  }
  const EditModal = ()=>{
    return(
      <aside className="absolute -bottom-10 z-20 right-10 py-2 bg-white shadow-md rounded-md">
          <ul className="flex flex-col gap-2">
            <Link to={nombre} className="px-5">Editar</Link>
            <li className="px-5" onClick={()=>console.log(id)}>Borrar</li>
          </ul>
      </aside>
    )
  }
  return (
    <section className="bg-[#F3794E] rounded-md px-5 relative">
      <div className="flex justify-between items-center">
        <Link to={`${id}`} className="flex py-6 gap-2">
          <IconUser size={30} strokeWidth={2.5} color="white" />
          <h3 className="text-white font-semibold text-base lg:text-xl">{nombre} {apellido}</h3>
        </Link>
        <div className=" cursor-pointer" onClick={HandleEditarUser}>
           
        <IconDotsVertical strokeWidth={3} size={30} color="white" />
        </div>
      </div>
      {
        ActiveOption && (<EditModal/>)
      }
    </section>
  );
}
export default ItemUsers;

import { Link } from "react-router-dom";
import { useState } from "react";
import { IconDotsVertical } from "@tabler/icons-react";

// eslint-disable-next-line react/prop-types
function ItemSucursal({ value }) {
  const { nombre,id } = value;
  const [ActiveEdit, setActiveEdit] = useState(false)
  const handleActiveEdit = ()=>{
    setActiveEdit(!ActiveEdit)
  }

  


  return (
    <section className="relative bg-slate-800 rounded-md text-white py-10 px-6 text-center">
      <Link to={nombre} className="capitalize">
        {nombre}
      </Link>
      <aside className="absolute top-3 right-3  cursor-pointer" onClick={handleActiveEdit}><IconDotsVertical size={27} strokeWidth={2} /></aside>
      {
        ActiveEdit&&
        <aside className="absolute bg-white rounded-md shadow-md -bottom-2 right-4 text-black grid">
          <button className="px-3 py-1" onClick={()=>{console.log(id)}}>Editar</button>     
          <button className="px-3 py-1">Eliminar</button>     
        </aside>
      }
      
    </section>
  );
}

export default ItemSucursal;

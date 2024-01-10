import { Link } from "react-router-dom";
import { useState } from "react";
import { IconDotsVertical } from "@tabler/icons-react";
import ItemInput from "@Components/InputCopy/ItemInput";
import TruncateText from "@Helpers/TruncateTeaxt";

// ...

function ItemSucursal({ value }) {
  const { nombre, id, Token } = value;

  const [ActiveEdit, setActiveEdit] = useState(false);
  const handleActiveEdit = () => {
    setActiveEdit(!ActiveEdit);
  };

  return (
    <section className="relative flex  shadow-md border border-black/5 dark:border-none rounded-lg text-white dark:bg-DarkComponent pt-10 pb-5 px-3 text-center">
      <div className="">
        <Link to={nombre} className="capitalize h-full">
          <h3 className="md:text-xl text-base font-semibold dark:text-white text-black">
            <TruncateText
              text={nombre}
              maxLength={8}
              ComponentNext={() => {
                <></>;
              }}
            />
          </h3>
        </Link>
        <ItemInput   Value={Token} Message={`Token Copeado`} className={"mt-5"} />
      </div>
      <aside
        className="absolute top-3 right-3  cursor-pointer"
        onClick={handleActiveEdit}
      >
        <IconDotsVertical size={27} strokeWidth={2} className="dark:text-white text-black" />
      </aside>
      {ActiveEdit && (
        <aside className="absolute bg-white rounded-md shadow-md -bottom-2 right-4 text-black grid">
          <button
            className="px-3 py-1"
            onClick={() => {
              console.log(id);
            }}
          >
            Editar
          </button>
          <button className="px-3 py-1">Eliminar</button>
        </aside>
      )}
    </section>
  );
}

export default ItemSucursal;

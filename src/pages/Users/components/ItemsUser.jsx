import { IconUser } from "@tabler/icons-react";
import TruncateText from "../../../utils/TruncateTeaxt";
import { formatDateToPeruvian } from "../../../utils/FechaConvert";

function ItemsUser({
  nombre,
  apellido,
  Role: { nombre: Rol },
  correo,
  createdAt,
  estado,
  usuario,
}) {
  return (
    <article className="w-[350px] dark:bg-DarkComponent   shadow-md py-5 px-2 rounded-xl my-1 flex h-[160px]">
      <header className="rounded-full my-auto  p-1 px-2">
        <IconUser size={50} className="dark:text-white" />
      </header>
      <header className="w-full pr-3">
        <ul className="flex justify-between">
          <li className="dark:text-white text-lg font-bold">
            {nombre}
            {apellido ?? ""}
          </li>
          <li className="dark:text-white text-xs font-semibold">
            {formatDateToPeruvian(createdAt)}
          </li>
        </ul>
        <p className="dark:text-white text-sm"><span className="font-semibold">User: </span>{usuario}</p>
        <p className="dark:text-white text-sm ">
          <TruncateText
            text={correo ?? 'No tiene Registrado un correo'}
            maxLength={40}
            ComponentNext={() => <h1></h1>}
          />
        </p>
        <footer className=" w-full flex justify-between gap-5 mt-7">
          <span className="bg-black text-white rounded-md px-3 text-sm self-start font-semibold">
            {Rol}
          </span>
          <select
            defaultValue={estado}
            className={` ${
              estado === false ? "bg-red-400" : "bg-green-500"
            } text-white px-3 rounded-md text-sm font-bold  focus:outline-none`}
          >
            <option value={true} key="1">
              Activo
            </option>
            <option value={false} key="2">
              Inactivo
            </option>
          </select>
        </footer>
      </header>
    </article>
  );
}

export default ItemsUser;

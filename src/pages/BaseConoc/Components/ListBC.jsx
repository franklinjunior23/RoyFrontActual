import { NavLink } from "react-router-dom";
import { formatDateToPeruvian } from "../../../utils/FechaConvert";

function ListItem({ id, Titulo, Autor ,createdAt }) {
  const fecha = formatDateToPeruvian(createdAt);
  return (
    <NavLink
      to={id}
      className={({ isActive }) =>
        `${
          isActive &&
          "bg-Component ml-3 font-semibold text-white dark:text-black transition-all delay-100 ease-in-out dark:bg-slate-500"
        } py-4 rounded-md px-2 dark:border-none dark:bg-white text-black border`
      }
    >
      <h3 className="mb-3">{Titulo}</h3>
      <div className="flex justify-between">
        <span className="bg-black rounded-md text-blue-500 font-bold text-xs py-1 px-3  capitalize" >{Autor}</span>
        <span className="text-xs font-bold">{fecha}</span>
      </div>
    </NavLink>
  );
}

function ListBC({ List, search }) {
  return (
    <section className="px-1 md:h-full overflow-y-scroll custom-scrollbar h-[300px] pr-2 pb-5">
      <main className="grid gap-2">
        {List && search === ""
          ? List.map((value) => <ListItem key={value.id} {...value} />)
          : List?.filter((data) =>
              data.Titulo.toLowerCase().includes(search.toLowerCase())
            ).map((filteredData) => (
              <ListItem key={filteredData.id} {...filteredData} />
            ))}
      </main>
    </section>
  );
}

export default ListBC;

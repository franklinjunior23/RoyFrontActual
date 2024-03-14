
import { FormateDayD } from "@/helpers/utils/conver-day-ddmmyy";
import { NavLink } from "react-router-dom";


function ListItem({ id, Titulo, Autor, createdAt, Categoria }) {
  if(id === undefined ||  id === '' ||id==null) return <h2>No se encontraron resultados.</h2>
  const fecha = FormateDayD(createdAt);
  return (
    <NavLink
      to={id}
      className={({ isActive }) =>
        `${
          isActive &&
          "bg-Component ml-3 font-semibold text-white dark:text-black transition-all delay-100 ease-in-out dark:bg-slate-500/60"
        } py-4 rounded-md px-2 dark:border-none dark:bg-DarkComponent text-black border`
      }
    >
      <h3 className="mb-3 dark:text-white">{Titulo}</h3>
      <div className="flex justify-between items-end">
        <div className="flex items-end gap-1">
          <span className="bg-black rounded-md text-blue-500 font-bold text-xs py-1 px-3  capitalize">
            {Autor}
          </span>
          <span className="text-xs px-3 py-1 text-white rounded-md bg-orange-500">{Categoria}</span>
        </div>
        <span className="text-xs font-bold dark:text-white">{fecha}</span>
      </div>
    </NavLink>
  );
}

function ListBC({ List, search }) {
  return (
    <section className="px-1 md:h-full order-1 overflow-y-scroll custom-scrollbar h-[300px] pr-2 pb-5">
      <main className="grid gap-2">
        {List && List?.length > 0 ? (
          search === "" ? (
            List?.map((value) => <ListItem key={value.id} {...value} />)
          ) : (
            List?.filter((data) => {
              const tituloEnMinusculas = data.Titulo.toLowerCase();
              const categoriaEnMinusculas = data.Categoria.toLowerCase();
              const searchEnMinusculas = search.toLowerCase();

              // Filtra los objetos que cumplan con ambos criterios
              return (
                tituloEnMinusculas.includes(searchEnMinusculas) ||
                categoriaEnMinusculas.includes(searchEnMinusculas)
              );
            }).map((filteredData) => (
              <ListItem key={filteredData.id} {...filteredData} />
            ))
          )
        ) : (
          <div>No se encontraron resultados.</div>
        )}
      </main>
    </section>
  );
}

export default ListBC;

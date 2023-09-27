import { NavLink } from "react-router-dom";

function ListBC({ List }) {
  return (
    <section className=" px-1 h-full overflow-y-scroll custom-scrollbar  pr-2  pb-5">
      <main className="grid gap-2">
        {List.map((value) => (
          <NavLink
            to={value.id}
            key={value.id}
            className={({ isActive }) => {
              return ` ${
                isActive && " bg-Component  dark:bg-slate-500 ml-3 font-semibold  text-white transition-all delay-150 ease-in-out"
              }   py-4 rounded-md px-2  dark:border-none dark:bg-white text-black border `;
            }}
          >
            <h3>{value?.Titulo}</h3>
           <div className="flex">
             <span className="">{value?.Autor}</span>
           </div>
          </NavLink>
        ))}
      </main>
    </section>
  );
}
export default ListBC;

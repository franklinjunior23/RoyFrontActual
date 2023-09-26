import ItemTicket from "./ItemTicket";

function ListTickets({ data }) {
  return (
    <main className="rounded-md px-4 pb-3   w-full  ">
      <h1 className="dark:text-white font-semibold text-xl">
        Lista de Tickets
      </h1>
      <section className="h-[400px]  mt-2 md:h-[260px] overflow-x-hidden lg:pr-5 overflow-y-auto  w-full  p-2 custom-scrollbar">
        {
          // eslint-disable-next-line react/prop-types
          data?.length == 0 ?( <span className="">No hay nada</span>) : 
          data?.map((ticket) => (
            <ItemTicket key={ticket.id} ticket={ticket} />
          ))
          // eslint-disable-next-line react/prop-types
          
        }
      </section>
    </main>
  );
}
export default ListTickets;

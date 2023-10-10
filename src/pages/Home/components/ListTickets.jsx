import {
  ColorConteners,
  DecideColorEstatusTicket,
} from "../../../assets/DataDefault";

function ListTickets({ TicketsData }) {
  const DataTicket = TicketsData?.TicketData;
  return (
    <main className="w-[270px] md:w-full">
      <div className="w-[270px] md:w-full overflow-hidden ">
        <h4 className="text-Slet text-2xl font-bold capitalize flex justify-between pr-5 items-end">
          Lista de Tickets
          <span className="text-end">{TicketsData?.TicketCount}</span>
        </h4>
        <button className="bg-black/80 text-white py-2 px-3 rounded-md font mt-5">
          Crear Nuevo Ticket
        </button>
      </div>
      <section className="md:h-[280px] h-[340px] overflow-y-auto custom-scrollbar py-3 md:pr-3 gap-3  mt-2  grid">
        {DataTicket?.length === 0 ? (
          <h2 className="dark:text-white text-center py-5">Ticks no disponibles</h2>
        ) : (
          DataTicket?.map((ticket, index) => (
            <div
              key={ticket.id}
              className="w-full bg-white dark:bg-DarkComponent shadow-xl dark:text-white h-[120px] py-3 px-5 rounded-xl relative"
            >
              <section>
                <h3 className="font-medium text-xl py-1 break-words">
                  {ticket.Titulo ?? "Ticket sin nombre"}
                </h3>
                <div className="flex items-end justify-between">
                    <span className="text-md">{ticket.Hora}</span>
                  <span
                    className={` px-2 text-md  font-semibold ${DecideColorEstatusTicket(
                      ticket.Estado
                    )}`}
                  >
                    {ticket.Estado}
                  </span>
                </div>
              </section>
              <div className="absolute h-full w-3  left-0 top-0 flex items-center">
                <div
                  className={`bg-orange-300 rounded-md w-2 h-[80%] block`}
                  style={{
                    backgroundColor:
                      ColorConteners[index % ColorConteners.length].name,
                  }}
                />
              </div>
            </div>
          ))
        )}
      </section>
    </main>
  );
}
export default ListTickets;

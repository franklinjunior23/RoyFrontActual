import {
  ColorConteners,
  DecideColorEstatusTicket,
} from "../../../assets/DataDefault";
import TicketItem from "./TicketItem";
import { useNavigate } from "react-router-dom";

function ListTickets({ TicketsData }) {
  const DataTicket = TicketsData?.TicketData;
  const Navigate = useNavigate();
  const navi = () => {
    window.location.href = "ticket";
  };
  return (
    <main className=" md:w-full">
      <div className="w-[270px] md:w-full overflow-hidden ">
        <h4 className="text-Slet text-2xl font-bold capitalize flex justify-between pr-5 items-end">
          Lista de Tickets
          <span className="text-end">{TicketsData?.TicketCount}</span>
        </h4>
        <button
          className="bg-black/80 text-white py-2 px-3 rounded-md font mt-1"
          onClick={() => Navigate(-1, "Ticket")}
        >
          Crear Nuevo Ticket
        </button>
      </div>
      <section className="md:h-[280px] h-[340px] w-[100%] overflow-y-auto custom-scrollbar py-3 md:pr-3 gap-3  mt-2  grid">
        {DataTicket?.length === 0 ? (
          <h2 className="dark:text-white text-center py-5">
            Ticks no disponibles
          </h2>
        ) : (
          DataTicket?.map((ticket, index) => (
            <TicketItem {...ticket} index={index} key={ticket.id} />
          ))
        )}
      </section>
    </main>
  );
}
export default ListTickets;

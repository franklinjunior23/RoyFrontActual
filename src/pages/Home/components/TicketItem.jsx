import { IconClock } from "@tabler/icons-react";
import {
  ColorConteners,
  DecideColorEstatusTicket,
} from "../../../assets/DataDefault";

function TicketItem({ Titulo, Estado, Hora, index }) {
  return (
    <article className="w-full bg-white dark:bg-DarkComponent shadow-lg dark:text-white md:h-[120px] py-4 px-5 rounded-xl relative">
      <section className="grid md:grid-cols-[1fr_100px] h-full">
        <header className="flex flex-col h-full justify-between">
          <h3 className="font-medium text-xl py-1 break-words">
            {Titulo ?? "Ticket sin nombre"}
          </h3>
          <span className="text-md flex gap-2">
            <IconClock /> {Hora}
          </span>
        </header>
        <footer className="self-center justify-self-center w-full mt-3 ">
          <span
            className={` px-2 text-md  font-semibold
             ${DecideColorEstatusTicket(Estado)}`}
          >
            {Estado}
          </span>
        </footer>
      </section>

      <header className="absolute h-full w-3  left-0 top-0 flex items-center">
        <section
          className={`bg-orange-300 rounded-md w-2 h-[80%] block`}
          style={{
            backgroundColor: ColorConteners[index % ColorConteners.length].name,
          }}
        />
      </header>
    </article>
  );
}

export default TicketItem;

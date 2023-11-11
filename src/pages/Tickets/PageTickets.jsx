import { useState } from "react";
import Header from "./Components/Header";
import { useQuery } from "@tanstack/react-query";
import { GetsTicketsInfo } from "../../services/ApiGets";
import { IconTicket } from "@tabler/icons-react";
import TicketItem from "../Home/components/TicketItem";
import { Drawer } from "vaul";
import ModalTotal from "../../components/Modal/ModalTotal";


function PageTickets() {
  const [TicketSearch, setTicketSearch] = useState("");

  const WriteTicket = (value) => {
    setTicketSearch(value);
  };
  const { data, isLoading, isError } = useQuery({
    queryKey: ["TicketSearch"],
    queryFn: GetsTicketsInfo,
  });
  console.log(data);
  if (isLoading) return <h2>Cargando ...</h2>;
  if (isError) return <h2>Error</h2>;
  return (
    <>
      <Header Name={TicketSearch} setName={WriteTicket} />
      <main className="grid w-full mt-5  grid-cols-2 grid-rows-2 gap-2 md:gap-4">
        <ContentInfo
          title={"Ticket Generados"}
          className={"col-span-1 row-span-2 grid place-content-center gap-4"}
          color={"text-blue-600"}
          data={data.Details?.cantidad}
        />
        <ContentInfo
          title={"Ticket Abiertos"}
          className={"md:flex gap-8  items-center"}
          color={"text-green-500"}
          data={data.Details?.abierto}
        />
        <ContentInfo
          title={"Ticket Cerrados"}
          className={"md:flex gap-8 items-center"}
          color={"text-red-500"}
          data={data.Details?.cerrado}
        />
      </main>
      <main className="grid  md:grid-cols-2 mt-7">
        <article>
          <h2 className="dark:text-white text-lg">Tickets Generados</h2>
          <section className="h-[300px] overflow-y-auto custom-scrollbar pr-4 grid  gap-3 py-4 md:py-1">
            {
              data?.tickets.map((ticket,index) => (
                <TicketItem index={index}  key={ticket.id} {...ticket} />
              ))
            }
          </section>
        </article>
        <section>
        
        </section>
        <section>
       
       
        </section>
      </main>
      {/* <main className="mt-10 pb-10">
        <section className="md:grid md:grid-cols-[300px_1fr] md:gap-7 md:item ">
          <article className="grid grid-cols-2 lg:grid-row-2 lg:grid-cols-1 gap-4">
            <InfoTicket name={"Tickets Generados"} date={data?.Details?.cantidad} />
            <InfoTicket name={"Tickets Cerrados"} date={data?.Details?.cerrado} />
            <InfoTicket name={"Tickets Abiertos"} date={data?.Details?.abierto} />
          </article>
          <article className="mt-5 lg:mt-0">
            <ListTickets data={data.tickets}/>
          </article>
        </section>
        <section className="mt-5">
        
        </section>
      </main>
      <h1 className="dark:text-white truncate">{TicketSearch}</h1> */}
    </>
  );
}
export default PageTickets;

function ContentInfo({ title, color, data, className }) {
  return (
    <section
      className={`${className} text-white py-4 md:py-5 px-6 bg-DarkComponent rounded-lg grid place-content-center `}
    >
      <h3 className="text-xl font-medium text-center flex flex-col items-center md:flex-row md:items-center md:justify-center gap-4">
        {title}
        <span>
          <IconTicket size={35} className={color} strokeWidth={2.5} />
        </span>
      </h3>
      <span className="text-2xl text-center font-semibold">{data ?? "00"}</span>
    </section>
  );
}

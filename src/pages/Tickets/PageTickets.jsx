import { useState } from "react";
import Header from "./Components/Header";
import InfoTicket from "./Components/InfoTicket";
import ListTickets from "./Components/ListTickets";
import { useQuery } from "@tanstack/react-query";
import { GetsTicketsInfo } from "../../services/ApiGets";

function PageTickets() {
  const [TicketSearch, setTicketSearch] = useState("");

  const WriteTicket = (value) => {
    setTicketSearch(value);
  };
  const {data,isLoading,isError} = useQuery({
    queryKey: ["TicketSearch"],
    queryFn: GetsTicketsInfo,
  } )
  if(isLoading) return <h2>Cargando ...</h2>
  console.log(isError )
  if(isError) return <h2>Error</h2>
  return (
    <>
      <Header Name={TicketSearch} setName={WriteTicket} />
      <main className="mt-10 pb-10">
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
      <h1 className="dark:text-white truncate">{TicketSearch}</h1>
    </>
  );
}
export default PageTickets;

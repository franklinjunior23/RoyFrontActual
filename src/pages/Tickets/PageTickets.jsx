import { useState } from "react";
import Header from "./Components/Header";

function PageTickets() {
  const [TicketSearch, setTicketSearch] = useState("");

  const WriteTicket=(value) => {
    setTicketSearch(value)
  }

  return (
    <>
      <Header Name={TicketSearch} setName={WriteTicket} />
      <h1 className="text-white">{TicketSearch}</h1>
    </>
  );
}
export default PageTickets;

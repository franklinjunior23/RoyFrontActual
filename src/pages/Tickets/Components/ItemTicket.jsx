import { IconTicket } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { DecideColorEstatusTicket } from "../../../assets/DataDefault";

function ItemTicket({ ticket }) {
  const { Titulo, id, Estado, Hora, ...datos } = ticket;
  return (
    <section className=" border dark:text-white rounded-lg py-5 md:py-1  grid items-center mb-4 lg:mb-3  md:px-7 px-4">
      <Link to={id}>
        <div className="md:flex grid items-center lg:h-24  gap-2  md:justify-between">
          <div className="flex items-center gap-2 justify-between md:justify-normal ">
            <IconTicket size={35} />
            <h3 className="md:text-lg  break-all md:text-center text-end font-bold ">
              {Titulo ??'Ticket Sin Nombre'}
            </h3>
          </div>
          <div className=" grid  gap-1">
            <h4 className="text-end">{Hora}</h4>
            <h4 className={`${DecideColorEstatusTicket(Estado)} px-2 text-center `}>{Estado}</h4>
          </div>
        </div>
      </Link>
    </section>
  );
}
export default ItemTicket;

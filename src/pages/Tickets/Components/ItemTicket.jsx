import { IconTicket } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { DecideColorEstatusTicket } from "../../../assets/DataDefault";

function ItemTicket({ ticket }) {
  const { Titulo, id, Estado, Hora, ...datos } = ticket;
  console.log(datos);
  return (
    <section className=" border dark:text-white rounded-lg  grid items-center mb-4 lg:mb-3 py-1 md:px-7 px-4">
      <Link to={id}>
        <div className="grid grid-cols-2 lg:h-24 grid-rows-2 lg:grid-cols-3  lg:grid-rows-1 gap-2  items-center">
          <IconTicket size={35} />
          <div className="">
            <h3 className="md:text-lg  break-words md:text-center ">{Titulo}</h3>
          </div>
          <div className=" grid grid-col grid-cols-2 lg:grid-non  gap-2">
            <h4 className={ `${DecideColorEstatusTicket(Estado)} block` }>{Estado}</h4>
            <h4>{Hora}</h4>
          </div>
        </div>
      </Link>
    </section>
  );
}
export default ItemTicket;

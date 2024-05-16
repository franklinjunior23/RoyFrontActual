import { FormateDayD } from "@/helpers/utils/conver-day-ddmmyy";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import TruncateText from "@/helpers/utils/truncate-text";
import { convertCapitalize } from "@/helpers/utils/convert-capitalize";
function Cardknowledge({ Titulo, Categoria, createdAt, id }) {
  return (
    <div className="">
      <NavLink
        to={{ pathname: `/Dashboard/BaseConocimiento/${id}` }}
        className="md:w-[350px] md:h-[140px]  border rounded-lg overflow-hidden md:flex shadow-lg dark:shadow-none grid cursor-pointer"
      >
        <div className="w-full p-4 flex flex-col justify-between capitalize pointer-events-none min-w-0">
          <h2 className=" font-semibold text-balance	 dark:text-white">
            {convertCapitalize(TruncateText({ text: Titulo, maxLength: 40 }))}
          </h2>
          <span className="bg-blue-700 w-fit text-xs py-0.5 px-2 capitalize font-semibold text-center text-white break-all rounded-md truncate">
            {convertCapitalize(Categoria)}
          </span>
          <span className="dark:text-white text-xs font-bold">
            {FormateDayD(createdAt)}
          </span>
        </div>
        <div className="md:w-[54%] bg-slate-300">
          <img
            src="/Images/BoockBaseCon.png"
            className="w-full h-full object-cover"
            alt=""
          />
        </div>
      </NavLink>
    </div>
  );
}

export default Cardknowledge;

Cardknowledge.propTypes = {
  Titulo: PropTypes.string,
  Categoria: PropTypes.string,
  createdAt: PropTypes.string,
  id: PropTypes.string,
};

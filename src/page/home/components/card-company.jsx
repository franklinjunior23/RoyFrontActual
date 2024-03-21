import PropTypes from "prop-types";
import CompanyImg from "/Figures/company-item.webp";
import { Link } from "react-router-dom";
import { FormateDayD } from "@/helpers/utils/conver-day-ddmmyy";
import TruncateText from "@/helpers/utils/truncate-text";

function CompanyItem({ nombre, createdAt }) {
  return (
    <section className="bg-orange-200/90 w-[360px] h-[140px] relative  p-3 rounded-lg overflow-hidden shadow-md ">
      <Link to={nombre}>
        <div className="flex flex-col justify-between h-full py-1 px-2 dark:text-white/80">
          <h3 className="text-[27px] font-extrabold  ">{TruncateText({text:nombre,maxLength:20})} </h3>
          <span className="block z-50 text-sm font-bold">
            {FormateDayD(createdAt) ?? "00/00/00"}
          </span>
        </div>

        <img
          src={CompanyImg}
          alt="Company Head"
          aria-hidden={true}
          className="absolute top-0 left-0 fill-transparent w-full h-full object-cover "
        />
      </Link>
    </section>
  );
}

export default CompanyItem;

CompanyItem.propTypes = {
  nombre: PropTypes.string,
  createdAt: PropTypes.string,
};

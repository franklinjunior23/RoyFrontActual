import PropTypes from "prop-types";
import { useState } from "react";
import { NavLink } from "react-router-dom";

function ItemNav({ datos }) {
  const { name, url, icon } = datos;
  const [ActiveNav, setActiveNav] = useState(false);
  return (
    <div
      className={`hover:border-l-4 ${ActiveNav && 'border-l-4'}  transition-all ease-in-out  hover:duration-300 border-orange-300 py-2 my-2 pl-2 flex gap-5 ${console} `}
    >
      <div className=" hover:bg-orange-300 h-full w-[5px] rounded-lg" />

      <NavLink
        to={url}
        className={({ isActive }) => { 
          'hover:border-l-4 bg-black text-3xl'
          isActive ==true?setActiveNav(true) :setActiveNav(false);
          return "flex gap-2 text-lg items-center";
        }}
      >
        {icon} {name}
      </NavLink>
    </div>
  );
}
export default ItemNav;
ItemNav.propTypes = {
  datos: PropTypes.shape({
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    icon: PropTypes.any,
  }).isRequired,
};

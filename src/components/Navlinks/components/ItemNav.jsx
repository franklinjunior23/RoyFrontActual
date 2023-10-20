import PropTypes from "prop-types";

import { NavLink } from "react-router-dom";

function ItemNav({ datos }) {
  const { name, url, icon } = datos;


  return (
    <div
      className={`transition-all ease-in-out hover:duration-300  flex gap-5`}
    >
      <NavLink
        to={url}
        className={({ isActive }) => {
          
          return ` ${
            isActive && "bg-[#DEDEDE] dark:bg-NavLinks dark:text-white "
          }  py-3 w-full flex gap-2 rounded-lg hover:bg-[#DEDEDE] dark:hover:bg-NavLinks px-5 text-lg items-center`;
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

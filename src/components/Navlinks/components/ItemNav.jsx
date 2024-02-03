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
            isActive && "bg-white/20  dark:text-white "
          }  py-3 w-full flex gap-3 rounded-lg hover:bg-white/20  dark:hover:bg-white/20  px-4  items-center`;
        }}
      >
        <span className="text-xl">{icon}</span> <h3 className="text-base">{name}</h3>
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

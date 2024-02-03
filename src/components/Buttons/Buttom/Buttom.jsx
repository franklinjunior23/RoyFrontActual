import clsx from "clsx";
import PropTypes from "prop-types";

function Buttom({ children, label = "", onClick, className, type }) {
  return (
    <button
      className={clsx(className, "bg-black text-sm px-3 rounded-lg py-2 font-medium  text-white")}
      onClick={onClick}
      type={type ?? "button"}
    >
      {label}
      {children}
    </button>
  );
}

export default Buttom;

Buttom.propTypes = {
  children: PropTypes.node,
  label: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string,
  type: PropTypes.string,
};

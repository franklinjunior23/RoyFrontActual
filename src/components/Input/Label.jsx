import clsx from "clsx";
import PropTypes from "prop-types";

function Label({ children, className }) {
  return <label className={clsx('flex flex-col text-sm gap-0.5',className)}>{children} </label>;
}

export default Label;

Label.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

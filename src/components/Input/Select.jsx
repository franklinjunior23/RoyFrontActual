import { forwardRef } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

// eslint-disable-next-line react/display-name
const Select = forwardRef(
  (
    {
      children,
      onChange,
      onBlur,
      name,
      value,
      className,
      placeholder,
      ...rest
    },
    ref
  ) => {
    const darkTheme =
      "dark:bg-black/10 dark:border-white/20 dark:focus:border-white/50 dark:text-white";
    const defaultTheme =
      "px-2 text-sm py-2 rounded-md border w-full bg-white focus:border-black/30 text-black focus:border-blue-400 focus:border-spacing-0.5";
    return (
      <select
        ref={ref}
        {...rest}
        className={clsx(defaultTheme, className, darkTheme)}
        onChange={onChange}
        onBlur={onBlur}
        name={name}
        value={value}
        
      >
        <option value="" className="text-black">{placeholder ?? "Seleccionar una opcion"}</option>
        {children}
      </select>
    );
  }
);

export default Select;
// Path: src/components/Input/Select.jsx
Select.propTypes = {
  children: PropTypes.node,
  ref: PropTypes.any,
  onChange: PropTypes.func,
  onBlur: PropTypes.any,
  name: PropTypes.string,
  value: PropTypes.string,
  className: PropTypes.string,
  rest: PropTypes.any,
  placeholder: PropTypes.string,
};

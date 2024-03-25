import clsx from "clsx";
import PropTypes from "prop-types";
import { forwardRef } from "react";

// eslint-disable-next-line react/display-name
const Input = forwardRef(
  (
    {
      placeholder,
      type,
      onChange,
      onBlur,
      name,
      value,
      className,
      ...rest // Recoge el resto de props
    },
    ref
  ) => {
    const darkTheme =
      "dark:bg-black/10 dark:border-white/20 dark:focus:border-white/50 dark:text-white";
    const defaultTheme =
      "px-2 text-sm py-2 rounded-md border w-full bg-white focus:border-black/30 text-black focus:border-blue-400 focus:border-spacing-0.5";
    return (
      <input
        ref={ref}
        className={clsx(defaultTheme, className, darkTheme)}
        placeholder={placeholder ?? ""}
        onChange={onChange}
        onBlur={onBlur}
        name={name}
        value={value}
        type={type}
        {...rest} // Pasa el resto de props al input
      />
    );
  }
);

export default Input;

Input.propTypes = {
  placeholder: PropTypes.string,
  type: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.any,
  name: PropTypes.string,
  value: PropTypes.string,
  className: PropTypes.string,
};

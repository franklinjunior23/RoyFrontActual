import clsx from "clsx";
import PropTypes from "prop-types";

function Input({ name, register, label, placeholder, className, type, error }) {
  return (
    <>
      <label htmlFor={name} className="grid gap-1.5 text-sm dark:text-white">
        {label}

        <input
          className={clsx("form-input", className)}
          type={type ?? "text"}
          placeholder={placeholder ?? ""}
          {...register(`${name}`)}
          id={name}
        />
      </label>
      {error && error[name] && (
        <span className="text-red-500 text-xs mt-1">
          {error[name]?.message}
        </span>
      )}
    </>
  );
}

export default Input;
Input.propTypes = {
  name: PropTypes.string.isRequired,
  register: PropTypes.any.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  type: PropTypes.string,
  error: PropTypes.any,
};

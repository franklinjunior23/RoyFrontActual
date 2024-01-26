import clsx from "clsx";
import PropTypes from "prop-types";

function Input({ name, register, label, placeholder, className, type, error }) {
  return (
    <section className="grid gap-2 ">
      <label
        htmlFor={name}
        className="dark:text-white   block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <input
        className={clsx(" form-input", className)}
        type={type ?? "text"}
        placeholder={placeholder ?? ""}
        {...register(`${name}`)}
        id={name}
      />
      {error && error[name] && (
        <span className="text-red-500 text-xs mt-1">
          {error[name]?.message}
        </span>
      )}
    </section>
  );
}

export default Input;
Input.propTypes = {
  name: PropTypes.string.isRequired,
  register: PropTypes.any.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  type: PropTypes.string,
  error: PropTypes.any,
};

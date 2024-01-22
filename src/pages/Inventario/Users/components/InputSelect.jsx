import clsx from "clsx";
import PropTypes from "prop-types";

export default function InputSelect({
  label,
  name,
  register,
  options,
  className,
}) {
  return (
    <section className="grid gap-2 ">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 dark:text-white">{label}</label>
      <select
        className={clsx("form-input", className)}
        {...register(`${name}`)}
        defaultValue={options.find((option) => option.default)?.value}
      >
        {options.map((option) => (
          <option key={option.value} defaultChecked={option.default} className="text-sm outline-none" value={option.value}>
            {option.value}
          </option>
        ))}
      </select>
    </section>
  );
}
InputSelect.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  register: PropTypes.any.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      default:PropTypes.bool
    })
  ).isRequired,
  className: PropTypes.string,
};

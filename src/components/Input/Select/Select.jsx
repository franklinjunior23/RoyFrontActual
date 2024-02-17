import clsx from "clsx";
import PropTypes from "prop-types";

export default function InputSelect({
  label,
  name,
  register,
  options,
  className,
  watch
}) {
  console.log(options)
  return (
    <section className="grid gap-2 ">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 dark:text-white"
      >
        {label}
      </label>
      <select
        className={clsx("form-input", className)}
        {...register(`${name}`)}
        defaultValue={options.find((option) => option.default)?.value}
      >
        {options?.map((option) => (
          <option
            key={option.value ?? option.id ?? option.name}
            defaultChecked={option.default ?? false}
            className="text-sm outline-none"
            value={option.value ?? option.id ?? option.name}
          >
            {option.value ?? option.name}
          </option>
        ))}
      </select>
    </section>
  );
}
InputSelect.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  register: PropTypes.any.isRequired,
  options: PropTypes.any.isRequired,
  className: PropTypes.string,
  watch:PropTypes.func
};

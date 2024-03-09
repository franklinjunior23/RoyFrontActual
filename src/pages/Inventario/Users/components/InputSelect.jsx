import clsx from "clsx";
import PropTypes from "prop-types";

export default function InputSelect({ label, name, register, options, className, watch }) {

  return (
    <section className="grid gap-2">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 dark:text-white">
        {label}
      </label>
      <select
        className={clsx("form-input", className)}
        {...register(`${name}`)}
       
      >
        <option value={""} key={100}>Seleccionar</option>
        {options?.map((option,index) => (
          <option
            key={index}
            value={option?.value ?? option.id}
          >
            {option?.value ?? option?.name}
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
  watch:PropTypes.any
};

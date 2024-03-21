import PropTypes from "prop-types";

function Input({ placeholder, type, onChange, onBlur, name, value }) {
  return (
    <input
    className="px-2 py-2 rounded-md  border w-full  bg-white dark:bg-white focus:border-black/30 text-black focus:border-blue-400 focus:border-spacing-0.5"
      placeholder={placeholder ?? ""}
      onChange={onChange}
      onBlur={onBlur}
      name={name}
      value={value}
      type={type}
    />
  );
}

export default Input;

Input.propTypes = {
  placeholder: PropTypes.string,
  type: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.any,
  name: PropTypes.string,
  value: PropTypes.string,
 
};

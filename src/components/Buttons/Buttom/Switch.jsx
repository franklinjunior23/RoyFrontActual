import PropTypes from "prop-types";

function Switch({ name, state, onchange }) {
  return (
    <label className="flex items-center relative">
      <input
        type="checkbox"
        checked={state}
        onChange={() => onchange(!state)}
        
        aria-label="hidden"
        className="w-[100px] h-[0] z-50 absolute top-0 right-0 bg-transparent cursor-pointer  "
        name={name}
      />
      <div
        className={`w-12 h-6 rounded-full bg-gray-300 relative transition-colors duration-300 ${
          state ? "bg-green-500" : ""
        }`}
       
      >
        <div
          className={`block w-6 h-6 rounded-full bg-white cursor-pointer shadow-md absolute left-0 transition-transform transform duration-300 ${
            state ? "translate-x-full" : ""
          }`}
          
        ></div>
      </div>
    </label>
  );
}

Switch.propTypes = {
  onchange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  state: PropTypes.bool.isRequired,
};

export default Switch;


import PropTypes from "prop-types";

function SwitchTogle({name,register}) {
  return (
    <>
      <label className="switch">
        <input type="checkbox" {...register(name)} />
        <span className="slider round" />
      </label>
    </>
  );
}
export default SwitchTogle;

SwitchTogle.propTypes = {
  name: PropTypes.string.isRequired,
  register: PropTypes.func.isRequired,
};
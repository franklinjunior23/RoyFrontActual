import PropTypes from "prop-types";

function ErrrorInput({ name, err }) {
  if (err[name] && err[name].message) {
    return <span className="text-red-500 py-0 text-xs">{err[name].message}</span>;
  }
}

export default ErrrorInput;

// Path: src/components/Input/ErrrorInput.jsx
ErrrorInput.propTypes = {
  name: PropTypes.string,
  err: PropTypes.any,
};

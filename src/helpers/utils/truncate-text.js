import PropTypes from "prop-types";

const TruncateText = ({ text, maxLength }) => {
  const truncatedText =
    text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;

  return truncatedText
};

export default TruncateText;

TruncateText.propTypes = {
  text: PropTypes.string.isRequired,
  maxLength: PropTypes.number.isRequired,
};
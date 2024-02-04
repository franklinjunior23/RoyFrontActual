import PropTypes from 'prop-types';

const TruncateText = ({ text, maxLength, ComponentNext }) => {
  const truncatedText =
    text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;

  return (
    <>
      {truncatedText}
      {text.length > maxLength && <ComponentNext />}
    </>
  );
};

export default TruncateText;

TruncateText.propTypes = {
  text: PropTypes.any.isRequired,
  maxLength: PropTypes.number.isRequired,
  ComponentNext: PropTypes.elementType.isRequired,
};

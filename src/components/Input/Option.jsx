import PropTypes from 'prop-types';

function Option({ children, value}) {
  return (
    <option value={value} key={value} className='dark:text-black'>
      {children}
    </option>
  );
}


export default Option;
Option.propTypes = {
  children: PropTypes.node,
  value: PropTypes.string,
};

import React from 'react';
import PropTypes from 'prop-types';
import './ValidationError.css';

export default function ValidationError(props) {
  if (props.message)
    return <p id={props.id} className='validation-error'>{props.message}</p>;
  return null;
}

ValidationError.defaultProps = {
  message: ''
}

ValidationError.propTypes = {
  id: PropTypes.string,
  message: PropTypes.string
}
import React from 'react';
import './ValidationError.css';

export default function ValidationError(props) {
  if (props.message)
    return <p className='validation-error'>{props.message}</p>;
  return null;
}

ValidationError.defaultProps = {
  message: ''
}
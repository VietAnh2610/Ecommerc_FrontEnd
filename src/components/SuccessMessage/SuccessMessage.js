import React from 'react';
import './SuccessMessage.scss'
const SuccessMessage = ({ message }) => {
  return (
    <div className="success-message">
      <p>{message}</p>
    </div>
  );
};

export default SuccessMessage;

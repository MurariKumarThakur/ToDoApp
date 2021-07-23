import React from "react";
import "./Alert.css";
const AlertCustom = ({ message }) => {
  return (
    <div className='alert'>
      <i class='fas fa-exclamation-triangle'></i> {message}
    </div>
  );
};

export default AlertCustom;

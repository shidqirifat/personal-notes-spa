import React from "react";
import PropTypes from 'prop-types';

export default function ButtonActionRoundedWrapper({ children }) {
  return (
    <div className="icon-action-wrapper">
      {children}
    </div>
  );
}

ButtonActionRoundedWrapper.propTypes = {
  children: PropTypes.node.isRequired
}
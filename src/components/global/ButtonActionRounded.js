import React from 'react';
import PropTypes from 'prop-types';

export default function ButtonActionRounded({ type, onClick }) {
  const templateIcon = {
    'add-note': 'plus',
    'archive-note': 'archive',
    'archived-note': 'archived',
    'delete-note': 'trash'
  };

  return (
    <button className={`icon-action-button ${type}`} onClick={onClick}>
      <img src={`/assets/${templateIcon[type]}.png`} alt="Add New Note" />
    </button>
  );
}

ButtonActionRounded.propTypes = {
  type: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

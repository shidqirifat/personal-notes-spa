import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function Box({ id, style, children }) {
  return (
    <Link to={`/notes/${id}`}>
      <div className="box-wrapper" style={style}>
        {children}
      </div>
    </Link>
  );
}

Box.propTypes = {
  id: PropTypes.string.isRequired,
  style: PropTypes.object,
  children: PropTypes.node.isRequired
};

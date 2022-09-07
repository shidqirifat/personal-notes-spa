import React from "react";
import PropTypes from 'prop-types';

export default function ButtonAddNewNote({ onClick }) {
    return (
        <div className="icon-wrapper" onClick={onClick}>
            <img
                className="add-new-note-icon"
                src="assets/plus.png"
                alt="Add New Note"
            />
        </div>
    );
}

ButtonAddNewNote.propTypes = {
    onClick: PropTypes.func.isRequired
}
import React from "react";
import PropTypes from 'prop-types';

export default function ButtonAction({
    type,
    title,
    description,
    onClick,
    style,
    children,
    isPrimary
}) {
    return (
        <button
            type={type}
            onClick={onClick}
            style={style}
            disabled={type === "submit" && (title === "" || description === "")}
            className={`${isPrimary ? 'button-submit' : 'button-secondary'}`}
        >
            {children}
        </button>
    );
}

ButtonAction.propTypes = {
    type: PropTypes.string.isRequired,
    title: PropTypes.string,
    description: PropTypes.string,
    onClick: PropTypes.func,
    isPrimary: PropTypes.bool.isRequired,
    style: PropTypes.object,
    children: PropTypes.node.isRequired
}
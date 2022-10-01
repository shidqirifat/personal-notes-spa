import React from "react";
import PropTypes from "prop-types";

export default function ButtonAction({
    type,
    disabled,
    onClick,
    style,
    children,
    isPrimary,
}) {
    return (
        <button
            type={type}
            onClick={onClick}
            style={style}
            disabled={disabled}
            className={`${isPrimary ? "button-submit" : "button-secondary"}`}
        >
            {children}
        </button>
    );
}

ButtonAction.propTypes = {
    type: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    isPrimary: PropTypes.bool.isRequired,
    disabled: PropTypes.bool,
    style: PropTypes.object,
    children: PropTypes.node.isRequired,
};

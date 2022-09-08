import React from "react";
import PropTypes from 'prop-types';
import "../../styles/text.css";

export default function Text({ type, style, children, onClick, onBlur }) {
    switch (type) {
        case "title-page":
            return (
                <h1 onClick={onClick} className={type} style={style}>
                    {children}
                </h1>
            );
        case "title-section":
            return (
                <h2 onClick={onClick} className={type} style={style}>
                    {children}
                </h2>
            );
        case "title-note":
            return (
                <h3 onClick={onClick} className={type} style={style}>
                    {children}
                </h3>
            );
        case "paragraph":
            return (
                <p onClick={onClick} className={type} style={style}>
                    {children}
                </p>
            );
        case "text-note":
            return (
                <p onClick={onClick} className={type} style={style}>
                    {children}
                </p>
            );
        case "text-date":
            return (
                <p onClick={onClick} className={type} style={style}>
                    {children}
                </p>
            );
        case "button-action":
            return (
                <h4 onClick={onClick} className={type} style={style}>
                    {children}
                </h4>
            );
        case "text-action":
            return (
                <h4 onClick={onClick} className={type} style={style}>
                    {children}
                </h4>
            );
        case "text-navigation":
            return (
                <h4 onClick={onClick} className={type} style={style}>
                    {children}
                </h4>
            );
        case "title-detail-note":
            return (
                <h2 onClick={onClick} className={type} style={style} contentEditable suppressContentEditableWarning={true} onBlur={onBlur}>
                    {children}
                </h2 >
            );
        case "text-detail-date":
            return (
                <h4 onClick={onClick} className={type} style={style}>
                    {children}
                </h4>
            );
        case "text-detail-note":
            return (
                <p onClick={onClick} className={type} style={style} contentEditable suppressContentEditableWarning={true} onBlur={onBlur}>
                    {children}
                </p>
            );
        case "text-anchor-back":
            return (
                <h3 onClick={onClick} className={type} style={style}>
                    {children}
                </h3>
            );
        case "text-not-found":
            return (
                <h1 onClick={onClick} className={type} style={style}>
                    {children}
                </h1>
            );
        case "text-delete-notif":
            return (
                <h3 onClick={onClick} className={type} style={style}>
                    {children}
                </h3>
            );
        default:
            return (
                <h3 onClick={onClick} style={style}>
                    {children}
                </h3>
            );
    }
}

Text.propTypes = {
    type: PropTypes.string.isRequired,
    style: PropTypes.object,
    onClick: PropTypes.func,
    onBlur: PropTypes.func,
    children: PropTypes.node,
}

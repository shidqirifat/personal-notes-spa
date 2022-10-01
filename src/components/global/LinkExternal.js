import React from "react";
import PropTypes from "prop-types";

export default function LinkExternal({ link, children }) {
    return (
        <a
            href={link}
            style={{
                fontWeight: 600,
                textDecoration: "none",
            }}
            target="_blank"
            rel="noreferrer"
            className="footer-link"
        >
            {children}
        </a>
    );
}

LinkExternal.propTypes = {
    link: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
};

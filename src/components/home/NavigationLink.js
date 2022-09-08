import React from "react";
import { Link } from "react-router-dom";
import Text from "../global/Text";
import PropTypes from 'prop-types';

export default function NavigationLink({
    value,
    link,
    children,
    navigationActive,
    style,
}) {
    return (
        <Link
            to={link}
            className={`navigation-button ${navigationActive === value ? "active" : ""
                }`}
            style={style}
        >
            <Text
                type="text-navigation"
                style={{ color: navigationActive === value ? "#fff" : "#2d2d2d" }}
            >
                {children}
            </Text>
        </Link>
    );
}

NavigationLink.propTypes = {
    value: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    style: PropTypes.object,
    navigationActive: PropTypes.string,
    children: PropTypes.node.isRequired
}
import React, { useContext } from "react";
import Text from "../global/Text";
import PropTypes from "prop-types";
import ConfigContext from "../../context/ConfigContext";

export default function Quotes({ text, author }) {
    const { theme } = useContext(ConfigContext);
    return (
        <div className="quotes-wrapper">
            <Text
                type="paragraph"
                style={{
                    fontSize: "16px",
                    color: theme === "light" ? "#878792" : "#ccc",
                }}
            >
                {text}
            </Text>
            <Text
                type="title-note"
                style={{
                    color: theme === "light" ? "#878792" : "#ddd",
                    lineHeight: "24px",
                    margin: 0,
                }}
            >
                -
            </Text>
            <Text
                type="text-date"
                style={{
                    color: theme === "light" ? "#3F3F45" : "#eee",
                    fontSize: "14px",
                    fontWeight: 600,
                }}
            >
                {author}
            </Text>
        </div>
    );
}

Quotes.propTypes = {
    text: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
};

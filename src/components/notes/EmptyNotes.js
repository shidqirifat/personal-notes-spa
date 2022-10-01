import React from "react";
import Text from "../global/Text";
import PropTypes from "prop-types";

export default function EmptyNotes({ children }) {
    return (
        <div className="empty-notes-wrapper">
            <img src="assets/no-notes.png" alt="Empty Notes" />
            <Text style={{ textAlign: "center" }} type="title-note">
                {children}
            </Text>
        </div>
    );
}

EmptyNotes.propTypes = {
    children: PropTypes.node.isRequired,
};

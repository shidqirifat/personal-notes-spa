import React from "react";
import Text from "./Text";
import PropTypes from 'prop-types';

export default function EmptyNotes({ children }) {
    return (
        <div className="empty-notes-wrapper">
            <img src="assets/no-notes.jpg" alt="Empty Notes" />
            <Text style={{ textAlign: "center" }} type="title-note">
                {children}
            </Text>
        </div>
    );
}

EmptyNotes.propTypes = {
    children: PropTypes.node.isRequired
}
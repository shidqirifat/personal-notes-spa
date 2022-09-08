import React from "react";
import ButtonAction from "../global/ButtonAction";
import PropTypes from "prop-types";

export default function FormNewNote({
    title,
    description,
    onInputEventHandler,
    onSubmitNewNote,
}) {
    return (
        <form onSubmit={onSubmitNewNote} className="form-wrapper">
            <input
                type="text"
                value={title}
                name="title"
                placeholder="Insert title note..."
                onChange={(event) => onInputEventHandler(event)}
                required
                autoFocus
            />
            <textarea
                type="text"
                value={description}
                name="description"
                placeholder="Insert description note..."
                onChange={(event) => onInputEventHandler(event)}
                required
            />
            <ButtonAction
                type="submit"
                title={title}
                description={description}
                isPrimary
            >
                Add Note
            </ButtonAction>
        </form>
    );
}

FormNewNote.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    onInputEventHandler: PropTypes.func.isRequired,
    onSubmitNewNote: PropTypes.func.isRequired,
};

import React from "react";
import PropTypes from 'prop-types';

export default function SearchBox({ keyword, onSearch }) {
    return (
        <input
            style={{ maxWidth: "600px", width: "100%", margin: "0 auto" }}
            type="text"
            placeholder="Cari catatan..."
            onChange={(event) => onSearch(event)}
            value={keyword}
        />
    );
}

SearchBox.propTypes = {
    keyword: PropTypes.string.isRequired,
    onSearch: PropTypes.func.isRequired,
}

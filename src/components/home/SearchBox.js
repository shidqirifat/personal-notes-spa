import React, { useContext } from "react";
import PropTypes from "prop-types";
import ConfigContext from "../../context/ConfigContext";

export default function SearchBox({ keyword, onSearch }) {
    const { locale } = useContext(ConfigContext);
    return (
        <input
            style={{ maxWidth: "600px", width: "100%", margin: "0 auto" }}
            type="text"
            placeholder={locale === "en" ? "Search note..." : "Cari catatan..."}
            onChange={(event) => onSearch(event)}
            value={keyword}
        />
    );
}

SearchBox.propTypes = {
    keyword: PropTypes.string.isRequired,
    onSearch: PropTypes.func.isRequired,
};

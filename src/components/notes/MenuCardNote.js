import React, { useContext } from "react";
import Text from "../global/Text";
import PropTypes from "prop-types";
import ConfigContext from "../../context/ConfigContext";

export default function MenuCardNote({
    onDeleteNote,
    onArchiveNote,
    archived,
    id,
}) {
    const { locale } = useContext(ConfigContext);
    return (
        <div className="wrap-menu-card">
            <Text
                onClick={(e) => {
                    e.preventDefault();
                    onDeleteNote(e, id);
                }}
                style={{
                    marginBottom: 0,
                    color: "#ff5f52",
                    padding: "10px",
                    cursor: "pointer",
                    borderBottom: "1px solid #d0d0d0",
                }}
                type="text-action"
            >
                {locale === "en" ? "Delete" : "Hapus"}
            </Text>
            <Text
                onClick={(e) => {
                    e.preventDefault();
                    onArchiveNote(e, id);
                }}
                style={{
                    marginBottom: 0,
                    color: "#2d3e50",
                    padding: "10px",
                    cursor: "pointer",
                }}
                type="text-action"
            >
                {archived
                    ? locale === "en"
                        ? "Unarchive"
                        : "Batal Arsipkan"
                    : locale === "en"
                    ? "Archive"
                    : "Arsipkan"}
            </Text>
        </div>
    );
}

MenuCardNote.propTypes = {
    id: PropTypes.string.isRequired,
    archived: PropTypes.bool.isRequired,
    onDeleteNote: PropTypes.func.isRequired,
    onArchiveNote: PropTypes.func.isRequired,
};

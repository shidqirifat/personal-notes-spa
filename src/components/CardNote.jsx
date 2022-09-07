import React from "react";
import { showFormattedDate } from "../utils";
import Box from "./Box";
import MenuCardNote from "./MenuCardNote";
import Text from "./Text";
import PropTypes from 'prop-types';

export default function CardNote({
    title,
    body,
    createdAt,
    archived,
    id,
    idMenuActive,
    onOpenMenuNote,
    onDeleteNote,
    onArchiveNote,
}) {
    return (
        <Box
            id={id}
            style={{
                padding: "12px 12px 26px",
                gap: "8px",
                position: "relative",
                cursor: "pointer",
                boxShadow: "rgba(17, 12, 46, 0.05) 0px 2px 20px 0px",
                height: '100%'
            }}
        >
            {idMenuActive === id && (
                <MenuCardNote
                    onDeleteNote={onDeleteNote}
                    onArchiveNote={onArchiveNote}
                    archived={archived}
                    id={id}
                />
            )}
            <div className="wrap-note">
                <Text style={{ marginBottom: 0 }} type="title-note">
                    {title}
                </Text>
                <img
                    onClick={(e) => {
                        e.preventDefault();
                        onOpenMenuNote(e, id);
                    }}
                    className="menu-card-icon"
                    src="assets/menu-three-dot.png"
                    alt="Menu"
                />
            </div>
            <div className="wrap-note label-archived">
                <Text
                    style={{ marginBottom: 0, fontWeight: 400 }}
                    type="text-date"
                >
                    {showFormattedDate(createdAt)}
                </Text>
                {archived && (
                    <Text
                        style={{
                            marginBottom: 0,
                            color: "#fff",
                            background: "green",
                            padding: "4px 6px",
                            borderRadius: "2px",
                            fontWeight: 700,
                        }}
                        type="text-date"
                    >
                        Archived
                    </Text>
                )}
            </div>
            <Text type="text-note">{body}</Text>
        </Box>
    );
}

CardNote.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    archived: PropTypes.bool.isRequired,
    idMenuActive: PropTypes.string,
    onOpenMenuNote: PropTypes.func.isRequired,
    onDeleteNote: PropTypes.func.isRequired,
    onArchiveNote: PropTypes.func.isRequired,
}
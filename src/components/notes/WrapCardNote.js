import React from 'react';
import CardNote from './CardNote';
import EmptyNotes from './EmptyNotes';
import Loader from '../global/Loader';
import PropTypes from 'prop-types';

export default function WrapCardNote({
  loading,
  textEmpty,
  notes,
  idMenuActive,
  onOpenMenuNote,
  onDeleteNote,
  onArchiveNote
}) {
  return (
    <>
      {loading ? (
        <Loader />
      ) : notes.length === 0 ? (
        <EmptyNotes>{textEmpty}</EmptyNotes>
      ) : (
        <div className="wrapper-box-notes">
          {notes.map((note) => (
            <CardNote
              key={note.id}
              {...note}
              idMenuActive={idMenuActive}
              onOpenMenuNote={onOpenMenuNote}
              onDeleteNote={onDeleteNote}
              onArchiveNote={onArchiveNote}
            />
          ))}
        </div>
      )}
    </>
  );
}

WrapCardNote.propTypes = {
  loading: PropTypes.bool.isRequired,
  textEmpty: PropTypes.string.isRequired,
  notes: PropTypes.arrayOf(PropTypes.object).isRequired,
  idMenuActive: PropTypes.string,
  onOpenMenuNote: PropTypes.func.isRequired,
  onDeleteNote: PropTypes.func.isRequired,
  onArchiveNote: PropTypes.func.isRequired
};

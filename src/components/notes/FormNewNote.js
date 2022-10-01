import React, { useContext } from 'react';
import ButtonAction from '../global/ButtonAction';
import PropTypes from 'prop-types';
import ConfigContext from '../../context/ConfigContext';

export default function FormNewNote({ title, description, onInputEventHandler, onSubmitNewNote }) {
  const { locale } = useContext(ConfigContext);
  return (
    <form onSubmit={onSubmitNewNote} className="form-wrapper">
      <input
        type="text"
        value={title}
        name="title"
        placeholder={locale === 'en' ? 'Insert title note...' : 'Masukkan judul catatan...'}
        onChange={(event) => onInputEventHandler(event)}
        required
        autoFocus
      />
      <textarea
        type="text"
        value={description}
        name="description"
        placeholder={
          locale === 'en' ? 'Insert description note...' : 'Masukkan deskripsi catatan...'
        }
        onChange={(event) => onInputEventHandler(event)}
        required
      />
      <ButtonAction type="submit" disabled={title === '' || description === ''} isPrimary>
        {locale === 'en' ? 'Add Note' : 'Tambah Catatan'}
      </ButtonAction>
    </form>
  );
}

FormNewNote.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onInputEventHandler: PropTypes.func.isRequired,
  onSubmitNewNote: PropTypes.func.isRequired
};

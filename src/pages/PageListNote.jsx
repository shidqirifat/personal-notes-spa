import React, { Component } from 'react'
import { useSearchParams } from 'react-router-dom';
import ButtonAddNewNote from '../components/ButtonAddNewNote';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import NavigationWrapper from '../components/NavigationWrapper';
import NewNote from '../components/NewNote';
import WrapCardNote from '../components/WrapCardNote';
import { generateQuotes, getAllNotes, getNavigationsLink } from '../utils/data';
import PropTypes from 'prop-types';

export default function PageListNoteWrapper({ pageActive }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get('keyword');

  const changeSearchParams = (keyword) => {
    setSearchParams({ keyword });
  }

  return <PageListNote defaultKeyword={keyword} keywordChange={changeSearchParams} pageActive={pageActive} />
}

PageListNoteWrapper.propTypes = {
  pageActive: PropTypes.string
}

class PageListNote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: getAllNotes(),
      keyword: props.defaultKeyword || '',
      quotes: {
        text: '',
        author: ''
      },
      isAddNote: false,
      idMenuActive: '',
    };

    this.onSearchNoteHandler = this.onSearchNoteHandler.bind(this);
    this.searchNotesByKeyword = this.searchNotesByKeyword.bind(this);
    this.onAddNewNoteHandler = this.onAddNewNoteHandler.bind(this);
    this.onOpenAddNoteHandler = this.onOpenAddNoteHandler.bind(this);
    this.onOpenMenuNoteHandler = this.onOpenMenuNoteHandler.bind(this);
    this.onDeleteNoteHandler = this.onDeleteNoteHandler.bind(this);
    this.onArchiveNoteHandler = this.onArchiveNoteHandler.bind(this);
    this.generateRandomQuotes = this.generateRandomQuotes.bind(this);
  }

  onSearchNoteHandler(event) {
    const keyword = event.target.value;

    this.setState((prevState) => ({
      ...prevState,
      keyword,
      textEmpty:
        keyword.length > 0
          ? "Catatan Yang Dicari Tidak Ditemukan"
          : "Kamu Belum Memiliki Catatan",
    }));

    this.props.keywordChange(keyword)
  }

  searchNotesByKeyword(title, keyword) {
    for (let i = 0; i < keyword.length; i++) {
      if (keyword[i].toLowerCase() !== title[i].toLowerCase())
        return false;
    }
    return true;
  }

  onOpenAddNoteHandler() {
    this.setState((prevState) => ({
      ...prevState,
      isAddNote: !prevState.isAddNote,
    }));
  }

  onAddNewNoteHandler(event, note) {
    event.preventDefault();

    this.setState((prevState) => ({
      ...prevState,
      notes: [
        ...prevState.notes,
        {
          id: `notes-${+new Date()}`,
          title: note.title,
          body: note.description,
          archived: false,
          createdAt: new Date().toISOString(),
        },
      ],
      keyword: "",
    }));
  }

  onOpenMenuNoteHandler(event, id) {
    event.stopPropagation();

    this.setState((prevState) => ({
      ...prevState,
      idMenuActive: prevState.idMenuActive === id ? '' : id,
    }));
  }

  onDeleteNoteHandler(event, id) {
    event.stopPropagation();

    const noteAfterDelete = this.state.notes.filter(
      (note) => note.id !== id
    );
    this.setState((prevState) => ({
      ...prevState,
      notes: noteAfterDelete,
    }));
  }

  onArchiveNoteHandler(event, id) {
    event.stopPropagation();
    const noteAfterArchive = this.state.notes.map((note) => ({
      ...note,
      archived: note.id === id ? !note.archived : note.archived,
    }));
    this.setState((prevState) => ({
      ...prevState,
      notes: noteAfterArchive,
      idMenuActive: null,
    }));
  }

  generateRandomQuotes() {
    const allQuotes = generateQuotes();
    const quotes = allQuotes[Math.floor(Math.random() * allQuotes.length)];
    this.setState((prevState) => ({
      ...prevState,
      quotes,
    }));
  }

  componentDidMount() {
    this.generateRandomQuotes();
  }

  render() {
    const isFilterArchived = (note, pageActive) => {
      if (pageActive === 'archived') return note.archived
      if (pageActive === 'active') return !note.archived

      return note
    }

    const notes = this.state.notes.filter((note) => {
      return note.title.toLowerCase().includes(
        this.state.keyword.toLowerCase()
      ) && isFilterArchived(note, this.props.pageActive);
    });

    const renderTextEmpty = () => {
      const { notes, keyword } = this.state;
      const { pageActive } = this.props;

      if (notes.length === 0) return "Kamu Belum Memiliki Catatan Saat Ini";
      if (!keyword && pageActive === 'archived') return "Tidak Ada Catatan Diarsipkan Saat Ini";
      if (!keyword && pageActive === 'active') return "Tidak Ada Catatan Aktif Saat Ini";

      return "Catatan Yang Dicari Tidak Ditemukan";
    }

    const textEmpty = renderTextEmpty();

    return (
      <>
        {this.state.isAddNote && (
          <NewNote
            onSubmitNewNote={this.onAddNewNoteHandler}
            onOpenAddNote={this.onOpenAddNoteHandler}
          />
        )}
        <div className="container-wrapper">
          <Hero
            keyword={this.state.keyword}
            onSearchNote={this.onSearchNoteHandler}
            {...this.state.quotes}
          />
          <div className="body-wrapper">
            <NavigationWrapper
              navigations={getNavigationsLink()}
              navigationActive={this.props.pageActive}
            />
            <WrapCardNote
              textEmpty={textEmpty}
              notes={notes}
              onDeleteNote={this.onDeleteNoteHandler}
              onArchiveNote={this.onArchiveNoteHandler}
              onOpenMenuNote={this.onOpenMenuNoteHandler}
              idMenuActive={this.state.idMenuActive}
            />
          </div>
          <Footer />
          <ButtonAddNewNote onClick={this.onOpenAddNoteHandler} />
        </div>
      </>
    )
  }
}

PageListNote.propTypes = {
  defaultKeyword: PropTypes.string,
  keywordChange: PropTypes.func,
  pageActive: PropTypes.string
}
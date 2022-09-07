import React, { Component } from 'react'
import { useSearchParams } from 'react-router-dom';
import ButtonActionRounded from '../components/ButtonActionRounded';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import NavigationWrapper from '../components/NavigationWrapper';
import NewNote from '../components/NewNote';
import WrapCardNote from '../components/WrapCardNote';
import { handleArchiveNote, deleteNote, generateQuotes, getAllNotes, getNavigationsLink } from '../utils/data';
import PropTypes from 'prop-types';
import ButtonActionRoundedWrapper from '../components/ButtonActionRoundedWrapper';

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
      isLoading: true,
    };

    this.onSearchNoteHandler = this.onSearchNoteHandler.bind(this);
    this.searchNotesByKeyword = this.searchNotesByKeyword.bind(this);
    this.onAddNewNoteHandler = this.onAddNewNoteHandler.bind(this);
    this.onOpenAddNoteHandler = this.onOpenAddNoteHandler.bind(this);
    this.onOpenMenuNoteHandler = this.onOpenMenuNoteHandler.bind(this);
    this.onDeleteNoteHandler = this.onDeleteNoteHandler.bind(this);
    this.onArchiveNoteHandler = this.onArchiveNoteHandler.bind(this);
    this.generateRandomQuotes = this.generateRandomQuotes.bind(this);
    this.setTimeLoading = this.setTimeLoading.bind(this);
  }

  onSearchNoteHandler(event) {
    const keyword = event.target.value;

    this.setTimeLoading(1000);
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

    this.setTimeLoading(1000);
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
    this.setTimeLoading(1000);

    deleteNote(id);
  }

  onArchiveNoteHandler(event, id) {
    event.stopPropagation();
    this.setTimeLoading(1000);

    handleArchiveNote(id);
    this.setState((prevState) => ({
      ...prevState,
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

  setTimeLoading(miliseconds) {
    this.setState((prevState) => ({
      ...prevState,
      isLoading: true,
    }));

    setTimeout(() => {
      this.setState((prevState) => ({
        ...prevState,
        isLoading: false,
      }));
    }, miliseconds);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.pageActive !== this.props.pageActive) {
      this.setTimeLoading(1000);
    }
  }

  componentDidMount() {
    this.generateRandomQuotes();
    this.setTimeLoading(1000);
  }

  render() {
    const isFilterArchived = (note, pageActive) => {
      if (pageActive === 'archived') return note.archived
      if (pageActive === 'active') return !note.archived

      return note
    }

    const notes = getAllNotes()
      .filter((note) => {
        return note.title.toLowerCase().includes(
          this.state.keyword.toLowerCase()
        ) && isFilterArchived(note, this.props.pageActive);
      })
      .sort((a, b) => (b.createdAt < a.createdAt)
        ? -1
        : ((b.createdAt > a.createdAt)
          ? 1
          : 0));

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
              loading={this.state.isLoading}
              textEmpty={textEmpty}
              notes={notes}
              onDeleteNote={this.onDeleteNoteHandler}
              onArchiveNote={this.onArchiveNoteHandler}
              onOpenMenuNote={this.onOpenMenuNoteHandler}
              idMenuActive={this.state.idMenuActive}
            />
          </div>
          <Footer />
          <ButtonActionRoundedWrapper>
            <ButtonActionRounded type="add-note" onClick={this.onOpenAddNoteHandler} />
          </ButtonActionRoundedWrapper>
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
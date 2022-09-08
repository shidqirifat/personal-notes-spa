import React, { Component } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import ButtonActionRounded from '../components/ButtonActionRounded';
import ButtonActionRoundedWrapper from '../components/ButtonActionRoundedWrapper';
import DetailContentNote from '../components/detail/DetailContentNote';
import Header from '../components/detail/Header';
import { getNote, deleteNote, handleArchiveNote, editNote } from '../utils/data';
import '../styles/detail.css';
import Text from '../components/Text';
import PropTypes from 'prop-types';

export default function PageDetailNoteWrapper() {
  const { id } = useParams();
  const navigate = useNavigate();

  return <PageDetailNote id={id} navigate={navigate} />
}

class PageDetailNote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: getNote(props.id)
    }

    this.handleDeleteNote = this.handleDeleteNote.bind(this);
    this.handleArchiveNote = this.handleArchiveNote.bind(this);
    this.updateDetailNote = this.updateDetailNote.bind(this);
    this.handleEditNote = this.handleEditNote.bind(this);
    this.onInputTitle = this.onInputTitle.bind(this);
    this.onInputBody = this.onInputBody.bind(this);
  }

  handleDeleteNote = () => {
    deleteNote(this.props.id);
    this.props.navigate('/', { state: { deleteStatus: true } });
  }

  handleArchiveNote() {
    handleArchiveNote(this.props.id);

    this.updateDetailNote();
  }

  updateDetailNote() {
    this.setState((prevState) => ({
      ...prevState,
      notes: getNote(this.props.id)
    }))
  }

  onInputTitle(event) {
    const title = event.target.innerHTML
    this.handleEditNote({ title })
  }

  onInputBody(event) {
    const body = event.target.innerHTML
    this.handleEditNote({ body })
  }

  handleEditNote({ title, body }) {
    const { id } = this.state.notes;
    editNote({ id, title, body });

    this.updateDetailNote();
  }

  render() {
    return (
      <div className="page-detail-wrapper">
        <Header />
        <Link to="/" className="anchor-back-wrapper">
          <img className="icon-anchor-back" src="/assets/right-arrow.png" alt="arrow" />
          <Text type="text-anchor-back">Back</Text>
        </Link>
        <DetailContentNote {...this.state.notes} onInputTitle={this.onInputTitle} onInputBody={this.onInputBody} />
        <ButtonActionRoundedWrapper>
          <ButtonActionRounded type={this.state.notes.archived ? "archived-note" : "archive-note"} idAction={this.props.id} onClick={this.handleArchiveNote} />
          <ButtonActionRounded type="delete-note" idAction={this.props.id} onClick={this.handleDeleteNote} />
        </ButtonActionRoundedWrapper>
      </div>
    )
  }
}

PageDetailNote.propTypes = {
  id: PropTypes.string.isRequired,
  navigate: PropTypes.func.isRequired,
}

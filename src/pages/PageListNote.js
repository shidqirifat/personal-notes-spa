/* eslint-disable no-restricted-globals */
import React, { Component } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import ButtonActionRounded from "../components/global/ButtonActionRounded";
import Footer from "../components/global/Footer";
import Hero from "../components/home/Hero";
import NavigationWrapper from "../components/home/NavigationWrapper";
import NewNote from "../components/notes/NewNote";
import WrapCardNote from "../components/notes/WrapCardNote";
import {
    handleArchiveNote,
    deleteNote,
    generateQuotes,
    getAllNotes,
    getNavigationsLink,
} from "../utils/data";
import PropTypes from "prop-types";
import ButtonActionRoundedWrapper from "../components/global/ButtonActionRoundedWrapper";
import DeleteNotification from "../components/global/DeleteNotification";
import { Helmet } from 'react-helmet';
import { capitalize } from "../utils";

export default function PageListNoteWrapper({ pageActive }) {
    const [searchParams, setSearchParams] = useSearchParams();
    const location = useLocation();
    const keyword = searchParams.get("keyword");

    const clearHistory = () => {
        history.replaceState("", null);
    };

    const changeSearchParams = (keyword) => {
        setSearchParams({ keyword });
    };

    return (
        <PageListNote
            defaultKeyword={keyword}
            keywordChange={changeSearchParams}
            pageActive={pageActive}
            deleteStatus={location.state?.deleteStatus || false}
            clearHistory={clearHistory}
        />
    );
}

PageListNoteWrapper.propTypes = {
    pageActive: PropTypes.string,
};

class PageListNote extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notes: getAllNotes(),
            keyword: props.defaultKeyword || "",
            quotes: {
                text: "",
                author: "",
            },
            isAddNote: false,
            idMenuActive: "",
            isLoading: true,
            deleteNotif: false,
        };

        this.onSearchNoteHandler = this.onSearchNoteHandler.bind(this);
        this.searchNotesByKeyword = this.searchNotesByKeyword.bind(this);
        this.onAddNewNoteHandler = this.onAddNewNoteHandler.bind(this);
        this.onOpenAddNoteHandler = this.onOpenAddNoteHandler.bind(this);
        this.onOpenMenuNoteHandler = this.onOpenMenuNoteHandler.bind(this);
        this.onDeleteNoteHandler = this.onDeleteNoteHandler.bind(this);
        this.onArchiveNoteHandler = this.onArchiveNoteHandler.bind(this);
        this.generateRandomQuotes = this.generateRandomQuotes.bind(this);
        this.setActionDuration = this.setActionDuration.bind(this);
    }

    onSearchNoteHandler(event) {
        const keyword = event.target.value;

        this.setActionDuration("isLoading", 1000);
        this.setState((prevState) => ({
            ...prevState,
            keyword,
        }));

        this.props.keywordChange(keyword);
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

        this.setActionDuration("isLoading", 1000);
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
            idMenuActive: prevState.idMenuActive === id ? "" : id,
        }));
    }

    onDeleteNoteHandler(event, id) {
        event.stopPropagation();
        this.setActionDuration("isLoading", 1000);

        deleteNote(id);
        this.setState((prevState) => ({
            ...prevState,
            notes: getAllNotes(),
        }));
    }

    onArchiveNoteHandler(event, id) {
        event.stopPropagation();
        this.setActionDuration("isLoading", 1000);

        handleArchiveNote(id);
        this.setState((prevState) => ({
            ...prevState,
            idMenuActive: null,
            notes: getAllNotes(),
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

    renderNotifDeleteNote() { }

    setActionDuration(action, miliseconds, isDelay = false) {
        setTimeout(
            () => {
                this.setState((prevState) => ({
                    ...prevState,
                    [action]: true,
                }));
            },
            isDelay ? 10 : 0
        );

        setTimeout(() => {
            this.setState((prevState) => ({
                ...prevState,
                [action]: false,
            }));
        }, miliseconds);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.pageActive !== this.props.pageActive) {
            this.setActionDuration("isLoading", 1000);
        }
    }

    componentDidMount() {
        this.generateRandomQuotes();
        this.setActionDuration("isLoading", 1000);

        if (!this.props.deleteStatus) return;
        this.setActionDuration("deleteNotif", 5000, true);
        this.props.clearHistory();
    }

    render() {
        const isFilterArchived = (note, pageActive) => {
            if (pageActive === "archived") return note.archived;
            if (pageActive === "active") return !note.archived;

            return note;
        };

        const notes = getAllNotes()
            .filter((note) => {
                return (
                    note.title
                        .toLowerCase()
                        .includes(this.state.keyword.toLowerCase()) &&
                    isFilterArchived(note, this.props.pageActive)
                );
            })
            .sort((a, b) =>
                b.createdAt < a.createdAt
                    ? -1
                    : b.createdAt > a.createdAt
                        ? 1
                        : 0
            );

        const renderTextEmpty = () => {
            const { notes, keyword } = this.state;
            const { pageActive } = this.props;

            if (notes.length === 0) return "You Do Not Have a Note";
            if (!keyword && pageActive === "archived")
                return "No Archived Note";
            if (!keyword && pageActive === "active") return "No Active Note";

            return "Search Note Is Not Found";
        };

        const textEmpty = renderTextEmpty();

        const titlePage = this.props.pageActive ? `${this.props.pageActive} Note - ` : '';

        return (
            <>
                <Helmet>
                    <title>{capitalize(titlePage)}My Personal Notes</title>
                </Helmet>

                <DeleteNotification deleteNotif={this.state.deleteNotif} />
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
                        <ButtonActionRounded
                            type="add-note"
                            onClick={this.onOpenAddNoteHandler}
                        />
                    </ButtonActionRoundedWrapper>
                </div>
            </>
        );
    }
}

PageListNote.propTypes = {
    defaultKeyword: PropTypes.string,
    keywordChange: PropTypes.func,
    pageActive: PropTypes.string,
    deleteStatus: PropTypes.bool,
    clearHistory: PropTypes.func,
};

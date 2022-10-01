/* eslint-disable no-restricted-globals */
import React, { Component, useContext } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import ButtonActionRounded from "../components/global/ButtonActionRounded";
import Footer from "../components/global/Footer";
import Hero from "../components/home/Hero";
import NavigationWrapper from "../components/home/NavigationWrapper";
import NewNote from "../components/notes/NewNote";
import WrapCardNote from "../components/notes/WrapCardNote";
import {
    generateQuotes,
    getNavigationsLink,
    templateTextEmpty,
} from "../utils/data";
import PropTypes from "prop-types";
import ButtonActionRoundedWrapper from "../components/global/ButtonActionRoundedWrapper";
import DeleteNotification from "../components/global/DeleteNotification";
import { Helmet } from "react-helmet";
import { capitalize } from "../utils";
import {
    getActiveNotes,
    getArchivedNotes,
    addNote,
    deleteNote,
    archiveNote,
    unarchiveNote,
} from "../utils/api";
import ConfigContext from "../context/ConfigContext";

export default function PageListNoteWrapper({
    authUser,
    pageActive,
    logout,
    toggleLocale,
    toggleTheme,
}) {
    const [searchParams, setSearchParams] = useSearchParams();
    const location = useLocation();
    const keyword = searchParams.get("keyword");
    const { locale } = useContext(ConfigContext);

    const clearHistory = () => {
        history.replaceState("", null);
    };

    const changeSearchParams = (keyword) => {
        setSearchParams({ keyword });
    };

    return (
        <PageListNote
            authUser={authUser}
            defaultKeyword={keyword}
            keywordChange={changeSearchParams}
            pageActive={pageActive}
            deleteStatus={location.state?.deleteStatus || false}
            clearHistory={clearHistory}
            logout={logout}
            toggleLocale={toggleLocale}
            locale={locale}
            toggleTheme={toggleTheme}
        />
    );
}

PageListNoteWrapper.propTypes = {
    pageActive: PropTypes.string,
    logout: PropTypes.func,
    toggleLocale: PropTypes.func,
    toggleTheme: PropTypes.func,
    authUser: PropTypes.object.isRequired,
};

class PageListNote extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notes: [],
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
        this.onAddNewNoteHandler = this.onAddNewNoteHandler.bind(this);
        this.onOpenAddNoteHandler = this.onOpenAddNoteHandler.bind(this);
        this.onOpenMenuNoteHandler = this.onOpenMenuNoteHandler.bind(this);
        this.onDeleteNoteHandler = this.onDeleteNoteHandler.bind(this);
        this.onArchiveNoteHandler = this.onArchiveNoteHandler.bind(this);
        this.generateRandomQuotes = this.generateRandomQuotes.bind(this);
        this.setActionDuration = this.setActionDuration.bind(this);
        this.handleGetNotes = this.handleGetNotes.bind(this);
    }

    onSearchNoteHandler(event) {
        const keyword = event.target.value;

        this.setActionDuration("isLoading", 500);
        this.setState((prevState) => ({
            ...prevState,
            keyword,
        }));

        this.props.keywordChange(keyword);
    }

    onOpenAddNoteHandler() {
        this.setState((prevState) => ({
            ...prevState,
            isAddNote: !prevState.isAddNote,
        }));
    }

    async onAddNewNoteHandler(event, note) {
        event.preventDefault();
        this.setState({
            isLoading: true,
        });

        await addNote({ title: note.title, body: note.description });
        await this.handleGetNotes();
        this.setState((prevState) => ({
            ...prevState,
            keyword: "",
            isLoading: false,
        }));
    }

    onOpenMenuNoteHandler(event, id) {
        event.stopPropagation();

        this.setState((prevState) => ({
            ...prevState,
            idMenuActive: prevState.idMenuActive === id ? "" : id,
        }));
    }

    async onDeleteNoteHandler(event, id) {
        event.stopPropagation();
        this.setState({
            isLoading: true,
        });

        await deleteNote(id);
        await this.handleGetNotes();
        this.setState((prevState) => ({
            ...prevState,
            isLoading: false,
        }));
    }

    async onArchiveNoteHandler(event, id) {
        event.stopPropagation();
        this.setState({
            isLoading: true,
        });

        const selectedNote = this.state.notes.find((note) => note.id === id);
        if (selectedNote.archived) await unarchiveNote(id);
        else await archiveNote(id);

        await this.handleGetNotes();
        this.setState((prevState) => ({
            ...prevState,
            idMenuActive: null,
            isLoading: false,
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

    async handleGetNotes() {
        this.setState({
            isLoading: true,
        });
        const { data } =
            this.props.pageActive === "active"
                ? await getActiveNotes()
                : await getArchivedNotes();
        this.setState((prevState) => ({
            ...prevState,
            notes: data,
            isLoading: false,
        }));
    }

    async componentDidUpdate(prevProps) {
        if (prevProps.pageActive !== this.props.pageActive) {
            await this.handleGetNotes();
        }
    }

    async componentDidMount() {
        await this.handleGetNotes();

        this.generateRandomQuotes();

        if (!this.props.deleteStatus) return;
        this.setActionDuration("deleteNotif", 5000, true);
        this.props.clearHistory();
    }

    render() {
        const renderTextEmpty = () => {
            const { notes, keyword } = this.state;
            const { pageActive, locale } = this.props;

            if (notes.length === 0) return templateTextEmpty[locale].empty_note;
            if (!keyword && pageActive === "archived")
                return templateTextEmpty[locale].empty_archived;
            if (!keyword && pageActive === "active")
                return templateTextEmpty[locale].empty_active;

            return templateTextEmpty[locale].not_found;
        };

        const notes = this.state.notes
            .filter((note) => {
                return note.title
                    .toLowerCase()
                    .includes(this.state.keyword.toLowerCase());
            })
            .sort((a, b) =>
                b.createdAt < a.createdAt
                    ? -1
                    : b.createdAt > a.createdAt
                    ? 1
                    : 0
            );

        const textEmpty = renderTextEmpty();

        const titlePage = this.props.pageActive
            ? `${this.props.pageActive} Note - `
            : "";

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
                        user={this.props.authUser.name}
                        logout={this.props.logout}
                        toggleTheme={this.props.toggleTheme}
                        toggleLocale={this.props.toggleLocale}
                        keyword={this.state.keyword}
                        onSearchNote={this.onSearchNoteHandler}
                        {...this.state.quotes}
                    />
                    <div className="body-wrapper">
                        <NavigationWrapper
                            navigations={getNavigationsLink[this.props.locale]}
                            navigationActive={this.props.pageActive}
                        />
                        <WrapCardNote
                            loading={this.state.isLoading}
                            textEmpty={textEmpty}
                            notes={notes || []}
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
    authUser: PropTypes.object.isRequired,
};

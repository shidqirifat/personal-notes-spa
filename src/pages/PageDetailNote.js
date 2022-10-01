import React, { Component } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ButtonActionRounded from "../components/global/ButtonActionRounded";
import ButtonActionRoundedWrapper from "../components/global/ButtonActionRoundedWrapper";
import DetailContentNote from "../components/detail/DetailContentNote";
import Header from "../components/detail/Header";
import "../styles/detail.css";
import Text from "../components/global/Text";
import PropTypes from "prop-types";
import Footer from "../components/global/Footer";
import { Helmet } from "react-helmet";
import { archiveNote, getNote, unarchiveNote, deleteNote } from "../utils/api";
import { ConfigConsumer } from "../context/ConfigContext";
import { MdArrowBack } from "react-icons/md";

export default function PageDetailNoteWrapper({
    toggleLocale,
    toggleTheme,
    logout,
}) {
    const { id } = useParams();
    const navigate = useNavigate();

    return (
        <PageDetailNote
            id={id}
            navigate={navigate}
            toggleLocale={toggleLocale}
            toggleTheme={toggleTheme}
            logout={logout}
        />
    );
}

class PageDetailNote extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notes: {},
        };

        this.handleDeleteNote = this.handleDeleteNote.bind(this);
        this.handleArchiveNote = this.handleArchiveNote.bind(this);
        this.handleNoteNotFound = this.handleNoteNotFound.bind(this);
        this.handleGetNote = this.handleGetNote.bind(this);
    }

    handleNoteNotFound() {
        setTimeout(() => {
            this.props.navigate("/404");
        }, 10);
    }

    async handleDeleteNote() {
        await deleteNote(this.props.id);
        this.props.navigate("/", { state: { deleteStatus: true } });
    }

    async handleArchiveNote() {
        if (this.state.notes.archived) await unarchiveNote(this.props.id);
        else await archiveNote(this.props.id);

        await this.handleGetNote();
    }

    async handleGetNote() {
        const { data } = await getNote(this.props.id);
        this.setState({
            notes: data,
        });
    }

    async componentDidMount() {
        if (!this.state.notes) this.handleNoteNotFound();

        await this.handleGetNote();
    }

    render() {
        return (
            <ConfigConsumer>
                {({ locale, theme }) => (
                    <div className="page-detail-wrapper">
                        {Object.keys(this.state.notes).length > 0 && (
                            <Helmet>
                                <title>
                                    {this.state.notes.title} - My Personal Notes
                                </title>
                            </Helmet>
                        )}
                        <div>
                            <Header
                                toggleLocale={this.props.toggleLocale}
                                toggleTheme={this.props.toggleTheme}
                                logout={this.props.logout}
                            />
                            <Link to="/" className="anchor-back-wrapper">
                                <MdArrowBack
                                    size={30}
                                    color={theme === "light" ? "000" : "fff"}
                                />
                                <Text type="text-anchor-back">
                                    {locale === "en" ? "Back" : "Kembali"}
                                </Text>
                            </Link>
                            {Object.keys(this.state.notes).length > 0 && (
                                <DetailContentNote {...this.state.notes} />
                            )}
                        </div>
                        <Footer />
                        <ButtonActionRoundedWrapper>
                            <ButtonActionRounded
                                type={
                                    this.state.notes?.archived
                                        ? "archived-note"
                                        : "archive-note"
                                }
                                idAction={this.props.id}
                                onClick={this.handleArchiveNote}
                            />
                            <ButtonActionRounded
                                type="delete-note"
                                idAction={this.props.id}
                                onClick={this.handleDeleteNote}
                            />
                        </ButtonActionRoundedWrapper>
                    </div>
                )}
            </ConfigConsumer>
        );
    }
}

PageDetailNote.propTypes = {
    id: PropTypes.string.isRequired,
    navigate: PropTypes.func.isRequired,
    toggleTheme: PropTypes.func.isRequired,
    toggleLocale: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
};

import React, { Component } from "react";
import FormNewNote from "./FormNewNote";
import Text from "../global/Text";
import PropTypes from "prop-types";
import { ConfigConsumer } from "../../context/ConfigContext";

export default class NewNote extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            description: "",
            chartLeft: 50,
        };

        this.onInputEventHandler = this.onInputEventHandler.bind(this);
    }

    onInputEventHandler(event) {
        if (event.target.name === "title" && event.target.value.length > 50)
            return;

        this.setState((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value,
            chartLeft:
                event.target.name === "title"
                    ? 50 - event.target.value.length
                    : prevState.chartLeft,
        }));
    }

    resetInputHandler() {
        this.setState({
            title: "",
            description: "",
            chartLeft: 50,
        });
        this.props.onOpenAddNote();
    }

    render() {
        return (
            <ConfigConsumer>
                {({ locale }) => (
                    <>
                        <div
                            className="shadow-overlay"
                            onClick={this.props.onOpenAddNote}
                        />
                        <div className="new-note-wrapper">
                            <Text
                                type="title-section"
                                style={{ textAlign: "center", marginTop: 0 }}
                            >
                                {locale === "en"
                                    ? "Add New Note"
                                    : "Tambah Catatan"}
                            </Text>
                            <Text
                                type="paragraph"
                                style={{
                                    color:
                                        this.state.chartLeft < 4
                                            ? "#ff5f52"
                                            : this.state.chartLeft < 6
                                            ? "rgb(216 198 0)"
                                            : "#71717a",
                                    textAlign: "right",
                                    marginBottom: "8px",
                                    fontWeight: 400,
                                }}
                            >
                                {locale === "en"
                                    ? "Characters left"
                                    : "Sisa karakter"}
                                : {this.state.chartLeft}
                            </Text>
                            <FormNewNote
                                title={this.state.title}
                                description={this.state.description}
                                onInputEventHandler={this.onInputEventHandler}
                                onSubmitNewNote={(event) => {
                                    this.resetInputHandler();
                                    this.props.onSubmitNewNote(
                                        event,
                                        this.state
                                    );
                                }}
                            />
                        </div>
                    </>
                )}
            </ConfigConsumer>
        );
    }
}

NewNote.propTypes = {
    onOpenAddNote: PropTypes.func.isRequired,
    onSubmitNewNote: PropTypes.func.isRequired,
};

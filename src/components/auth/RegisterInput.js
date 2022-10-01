import React from "react";
import PropTypes from "prop-types";
import ButtonAction from "../global/ButtonAction";
import { ConfigConsumer } from "../../context/ConfigContext";

class RegisterInput extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            email: "",
            password: "",
        };

        this.onNameChange = this.onNameChange.bind(this);
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    onNameChange(event) {
        this.setState(() => {
            return {
                name: event.target.value,
            };
        });
    }

    onEmailChange(event) {
        this.setState(() => {
            return {
                email: event.target.value,
            };
        });
    }

    onPasswordChange(event) {
        this.setState(() => {
            return {
                password: event.target.value,
            };
        });
    }

    onSubmitHandler(event) {
        event.preventDefault();

        this.props.register({
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
        });
    }

    render() {
        return (
            <ConfigConsumer>
                {({ locale }) => (
                    <form
                        onSubmit={this.onSubmitHandler}
                        className="register-input"
                    >
                        <input
                            type="text"
                            placeholder={
                                locale === "en"
                                    ? "Insert name"
                                    : "Masukkan nama"
                            }
                            value={this.state.name}
                            onChange={this.onNameChange}
                        />
                        <input
                            type="email"
                            placeholder={
                                locale === "en"
                                    ? "Insert email"
                                    : "Masukkan email"
                            }
                            value={this.state.email}
                            onChange={this.onEmailChange}
                        />
                        <input
                            type="password"
                            placeholder={
                                locale === "en"
                                    ? "Insert password"
                                    : "Masukkan password"
                            }
                            autoComplete="current-password"
                            value={this.state.password}
                            onChange={this.onPasswordChange}
                        />
                        <ButtonAction
                            type="submit"
                            isPrimary
                            disabled={
                                this.state.name === "" ||
                                this.state.email === "" ||
                                this.state.password === ""
                            }
                        >
                            {locale === "en" ? "Register" : "Daftar"}
                        </ButtonAction>
                    </form>
                )}
            </ConfigConsumer>
        );
    }
}

RegisterInput.propTypes = {
    register: PropTypes.func.isRequired,
};

export default RegisterInput;

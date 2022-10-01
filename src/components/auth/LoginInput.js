import React from 'react';
import PropTypes from 'prop-types';
import ButtonAction from '../global/ButtonAction';
import { ConfigConsumer } from '../../context/ConfigContext';

class LoginInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    };

    this.onEmailChangeHandler = this.onEmailChangeHandler.bind(this);
    this.onPasswordChangeHandler = this.onPasswordChangeHandler.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
  }

  onEmailChangeHandler(event) {
    this.setState(() => {
      return {
        email: event.target.value
      };
    });
  }

  onPasswordChangeHandler(event) {
    this.setState(() => {
      return {
        password: event.target.value
      };
    });
  }

  onSubmitHandler(event) {
    event.preventDefault();

    this.props.login({
      email: this.state.email,
      password: this.state.password
    });
  }

  render() {
    return (
      <ConfigConsumer>
        {({ locale }) => (
          <form onSubmit={this.onSubmitHandler} className="login-input">
            <input
              type="email"
              placeholder={locale === 'en' ? 'Insert email' : 'Masukkan email'}
              value={this.state.email}
              onChange={this.onEmailChangeHandler}
            />
            <input
              type="password"
              placeholder={locale === 'en' ? 'Insert password' : 'Masukkan password'}
              value={this.state.password}
              onChange={this.onPasswordChangeHandler}
            />
            <ButtonAction
              type="submit"
              isPrimary
              disabled={this.state.email === '' || this.state.password === ''}>
              {locale === 'en' ? 'Login' : 'Masuk'}
            </ButtonAction>
          </form>
        )}
      </ConfigConsumer>
    );
  }
}

LoginInput.propTypes = {
  login: PropTypes.func.isRequired
};

export default LoginInput;

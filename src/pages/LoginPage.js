import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import LoginInput from '../components/auth/LoginInput';
import { login } from '../utils/api';
import '../styles/login.css';
import { Helmet } from 'react-helmet';
import Text from '../components/global/Text';
import Header from '../components/detail/Header';
import ConfigContext from '../context/ConfigContext';

function LoginPage({ loginSuccess, toggleTheme, toggleLocale }) {
  const { locale } = useContext(ConfigContext);

  async function onLogin({ email, password }) {
    const { error, data } = await login({ email, password });

    if (!error) {
      loginSuccess(data);
    }
  }

  return (
    <>
      <Helmet>
        <title>My Personal Notes - Login</title>
      </Helmet>
      <section className="login-page">
        <Header toggleLocale={toggleLocale} toggleTheme={toggleTheme} />
        <LoginInput login={onLogin} />
        <div className="not-have-account">
          <Text type="text-detail-note">
            {locale === 'en' ? 'Not have an account?' : 'Belum punya akun?'}{' '}
          </Text>
          <Link to="/register">
            <Text type="text-detail-note" style={{ color: 'inherit' }}>
              {locale === 'en' ? 'Register here.' : 'Daftar di sini.'}
            </Text>
          </Link>
        </div>
      </section>
    </>
  );
}

LoginPage.propTypes = {
  loginSuccess: PropTypes.func.isRequired,
  toggleTheme: PropTypes.func.isRequired,
  toggleLocale: PropTypes.func.isRequired
};

export default LoginPage;

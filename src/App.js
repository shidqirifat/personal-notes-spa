import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import PageDetailNote from './pages/PageDetailNote';
import PageListNote from './pages/PageListNote';
import PageNotFound from './pages/PageNotFound';
import { getUserLogged, putAccessToken } from './utils/api';
import { ConfigProvider } from './context/ConfigContext';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

export default function App() {
  const [authUser, setAuthUser] = useState(null);
  const [initializing, setInitializing] = useState(true);
  const [localeContext, setLocaleContext] = useState(localStorage.getItem('locale') || 'id');
  const [themeContext, setThemeContext] = useState(localStorage.getItem('theme') || 'light');

  const toggleLocale = () => {
    const newLocale = localeContext === 'id' ? 'en' : 'id';
    localStorage.setItem('locale', newLocale);
    setLocaleContext(newLocale);
  };

  const toggleTheme = () => {
    const newTheme = themeContext === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', newTheme);
    setThemeContext(newTheme);
  };

  const onLoginSuccess = async ({ accessToken }) => {
    putAccessToken(accessToken);
    const { data } = await getUserLogged();

    setAuthUser(data);
  };

  const onLogout = () => {
    setAuthUser(null);
    putAccessToken('');
  };

  const checkAuthUser = async () => {
    const { error, data } = await getUserLogged();

    if (error) setAuthUser(null);
    else setAuthUser(data);

    setInitializing(false);
  };

  useEffect(() => {
    checkAuthUser();
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', themeContext);
  }, [themeContext]);

  if (initializing) {
    return null;
  }

  if (authUser === null) {
    return (
      <>
        <ConfigProvider value={{ locale: localeContext, theme: themeContext }}>
          <Routes>
            <Route
              path="/*"
              element={
                <LoginPage
                  toggleTheme={toggleTheme}
                  toggleLocale={toggleLocale}
                  loginSuccess={onLoginSuccess}
                />
              }
            />
            <Route
              path="/register"
              element={<RegisterPage toggleTheme={toggleTheme} toggleLocale={toggleLocale} />}
            />
          </Routes>
        </ConfigProvider>
      </>
    );
  }

  return (
    <>
      <ConfigProvider value={{ locale: localeContext, theme: themeContext }}>
        <Routes>
          <Route
            path="/"
            element={
              <PageListNote
                authUser={authUser}
                logout={onLogout}
                toggleTheme={toggleTheme}
                toggleLocale={toggleLocale}
                pageActive="active"
              />
            }
          />
          <Route
            path="/archived"
            element={
              <PageListNote
                authUser={authUser}
                logout={onLogout}
                toggleTheme={toggleTheme}
                toggleLocale={toggleLocale}
                pageActive="archived"
              />
            }
          />
          <Route
            path="/notes/:id"
            element={
              <PageDetailNote
                authUser={authUser}
                logout={onLogout}
                toggleTheme={toggleTheme}
                toggleLocale={toggleLocale}
              />
            }
          />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </ConfigProvider>
    </>
  );
}

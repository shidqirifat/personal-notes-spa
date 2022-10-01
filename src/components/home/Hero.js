import React from "react";
import Quotes from "./Quotes";
import SearchBox from "./SearchBox";
import PropTypes from "prop-types";
import Header from "../detail/Header";

export default function Hero({
    user,
    onSearchNote,
    keyword,
    author,
    text,
    logout,
    toggleLocale,
    toggleTheme,
}) {
    return (
        <div className="hero-wrapper">
            <Header
                user={user}
                toggleLocale={toggleLocale}
                toggleTheme={toggleTheme}
                logout={logout}
            />
            <Quotes author={author} text={text} />
            <SearchBox keyword={keyword} onSearch={onSearchNote} />
        </div>
    );
}

Hero.propTypes = {
    author: PropTypes.string.isRequired,
    keyword: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    onSearchNote: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    toggleLocale: PropTypes.func.isRequired,
    toggleTheme: PropTypes.func.isRequired,
    user: PropTypes.string.isRequired,
};

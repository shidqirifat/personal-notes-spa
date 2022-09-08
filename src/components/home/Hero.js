import React from "react";
import Quotes from "./Quotes";
import SearchBox from "./SearchBox";
import Text from "../global/Text";
import PropTypes from 'prop-types';

export default function Hero({ onSearchNote, keyword, author, text }) {
    return (
        <div className="hero-wrapper">
            <Text type="title-page">Personal Notes</Text>
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
}
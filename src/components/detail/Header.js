import React, { useContext } from "react";
import { FiLogOut } from "react-icons/fi";
import {
    MdGTranslate,
    MdOutlineDarkMode,
    MdOutlineWbSunny,
} from "react-icons/md";
import Text from "../global/Text";
import PropTypes from "prop-types";
import ConfigContext from "../../context/ConfigContext";

export default function Header({ user, toggleLocale, toggleTheme, logout }) {
    const { theme } = useContext(ConfigContext);
    return (
        <div className="title-wrapper">
            <Text type="title-page">Personal Notes</Text>
            <div className="hero-icon-wrapper">
                {theme === "light" ? (
                    <button>
                        <MdOutlineDarkMode
                            onClick={toggleTheme}
                            className="icon"
                            size={30}
                            color={theme === "light" ? "3f3f45" : "efefef"}
                        />
                    </button>
                ) : (
                    <button>
                        <MdOutlineWbSunny
                            onClick={toggleTheme}
                            className="icon"
                            size={30}
                            color={theme === "light" ? "3f3f45" : "efefef"}
                        />
                    </button>
                )}
                <button>
                    <MdGTranslate
                        className="icon"
                        onClick={toggleLocale}
                        size={30}
                        color={theme === "light" ? "3f3f45" : "efefef"}
                    />
                </button>
                <button onClick={logout} className="logout-button">
                    <FiLogOut
                        className="icon"
                        size={30}
                        color={theme === "light" ? "3f3f45" : "efefef"}
                    />
                    <Text
                        type="user"
                        style={{ textTransform: "capitalize", margin: 0 }}
                    >
                        {user}
                    </Text>
                </button>
            </div>
        </div>
    );
}

Header.propTypes = {
    toggleLocale: PropTypes.func.isRequired,
    toggleTheme: PropTypes.func.isRequired,
    logout: PropTypes.func,
    user: PropTypes.string,
};

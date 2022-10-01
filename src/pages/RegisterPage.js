import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import RegisterInput from "../components/auth/RegisterInput";
import Header from "../components/detail/Header";
import Text from "../components/global/Text";
import ConfigContext from "../context/ConfigContext";
import { register } from "../utils/api";

function RegisterPage({ toggleLocale, toggleTheme }) {
    const { theme, locale } = useContext(ConfigContext);
    const navigate = useNavigate();

    async function onRegisterHandler(user) {
        const { error } = await register(user);
        if (!error) {
            navigate("/");
        }
    }

    return (
        <section className="register-page">
            <Header toggleLocale={toggleLocale} toggleTheme={toggleTheme} />
            <RegisterInput register={onRegisterHandler} />
            <div className="not-have-account">
                <Text type="text-detail-note">
                    {locale === "en" ? "Back to" : "Kembali ke"}{" "}
                </Text>
                <Link to="/">
                    <Text type="text-detail-note" style={{ color: "inherit" }}>
                        {locale === "en" ? "Login" : "Masuk"}
                    </Text>
                </Link>
            </div>
        </section>
    );
}

export default RegisterPage;

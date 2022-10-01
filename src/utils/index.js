const showFormattedDate = (date, lang = "en") => {
    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    };

    const region = lang === "en" ? "en-En" : "id-ID";

    return new Date(date).toLocaleDateString(region, options);
};

const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

export { showFormattedDate, capitalize };

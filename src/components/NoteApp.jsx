import React from "react";
import { Route, Routes } from "react-router-dom";
import PageListNote from "../pages/PageListNote";

export default function NoteApp() {
    return (
        <>
            <Routes>
                <Route path="/" element={<PageListNote />} />
                <Route path="/active" element={<PageListNote pageActive="active" />} />
                <Route path="/archived" element={<PageListNote pageActive="archived" />} />
            </Routes>
        </>
    );
}

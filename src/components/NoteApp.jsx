import React from "react";
import { Route, Routes } from "react-router-dom";
import PageDetailNote from "../pages/PageDetailNote";
import PageListNote from "../pages/PageListNote";
import PageNotFound from "../pages/PageNotFound";

export default function NoteApp() {
  return (
    <>
      <Routes>
        <Route path="/" element={<PageListNote />} />
        <Route path="/active" element={<PageListNote pageActive="active" />} />
        <Route path="/archived" element={<PageListNote pageActive="archived" />} />
        <Route path="/notes/:id" element={<PageDetailNote />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

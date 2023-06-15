import React from "react";
import "./App.scss";
import { Route, Routes, Navigate } from "react-router-dom";

import Header from "../components/Header";

import PageSignUp from "./PageSignUp/PageSignUp";
import PageSignIn from "./PageSignIn/SignInPage";
// import PageHome from "./PageHome/Home";
import PageArticles from "./PageArticles/PageArticles";
import UnknownPage from "./unknownPage/unknownPage";
import FullPage from "./FullPage/FullPage";
import PageEditProfile from "./PageEditProfile/PageEditProfile";
import PageNewArticle from "./PageNewArticle/PageNewArticle";

const App = () => {
  return (
    <div className="up">
      <Routes>
        <Route path="/" element={<Header />}>
          <Route path="/articles" element={<PageArticles />}></Route>
          <Route path="/articles/:slug" element={<FullPage />}></Route>
          <Route path="/sign-up" element={<PageSignUp />}></Route>
          <Route path="/sign-in" element={<PageSignIn />}></Route>
          <Route path="/myprofile/edit" element={<PageEditProfile />}></Route>
          <Route path="/new-article" element={<PageNewArticle />}></Route>
          <Route
            path="/:slug/edit-article"
            element={<PageNewArticle />}
          ></Route>
          <Route path="/" element={<Navigate to="/articles" />}></Route>
          <Route path="*" element={<UnknownPage />}></Route>
        </Route>
      </Routes>
    </div>
  );
};

export default App;

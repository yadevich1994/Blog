import React from "react";
import { Link } from "react-router-dom";
import "./Home.scss";

const PageHome = () => {
  return (
    <React.Fragment>
      <h2 style={{ textAlign: "center" }}>
        Это стартовая страница, она не предусмотрена
      </h2>
      <h2 style={{ textAlign: "center" }}>
        Кликните по Realworld Blog в шапке для перехода к
        <Link to="/articles"> блогу</Link>
      </h2>
    </React.Fragment>
  );
};

export default PageHome;

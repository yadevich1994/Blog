import React from "react";
import { Link } from "react-router-dom";

const unknownPage = () => {
  return (
    <React.Fragment>
      <h2 style={{ textAlign: "center" }}>Такой странички не существует</h2>
      <h2 style={{ textAlign: "center" }}>
        Можно вернуться к странице с <Link to="/articles">блогом</Link>
      </h2>
    </React.Fragment>
  );
};

export default unknownPage;

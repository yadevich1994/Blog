import React from "react";
import { useSelector } from "react-redux";
import "./ArticlesList.scss";

import { IStateArticles } from "../../types/StateRedux";
import Article from "../Article";

const ArticlesList = () => {
  const arrayArticles = useSelector(
    (state: IStateArticles) => state.articles.articles
  );
  const articles = arrayArticles.map((elem) => {
    return (
      <React.Fragment key={`${elem.slug} ${elem.author.username}`}>
        <Article article={elem} />
      </React.Fragment>
    );
  });
  return <div className="articles-container">{articles}</div>;
};

export default ArticlesList;

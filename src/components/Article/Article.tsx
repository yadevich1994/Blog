import React, { useState } from "react";
import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import dateFormat from "dateformat";
import { Link } from "react-router-dom";
import "./article.scss";
import { useSelector } from "react-redux";
import cn from "classnames";

import { fetchAddLike, fetchDeleteLike } from "../../services/favorites";
import { IStateUser } from "../../types/StateRedux";
import { IArticle } from "../../types/Articles";

const Article = (props: { article: IArticle }) => {
  const {
    title,
    favoritesCount,
    tagList,
    description,
    author,
    updatedAt,
    slug,
    favorited,
  } = props.article;
  const [stateFavor, chengeStateFavor] = useState(favorited);
  const [likes, changeLikes] = useState(favoritesCount);
  const tags =
    tagList.length === 0
      ? tagList
          .map((elem) => (
            <React.Fragment key={`${author.username} ${Math.random()}`}>
              <span className="article-tag">{elem.slice(0, 20)}</span>
            </React.Fragment>
          ))
          .slice(0, 6)
      : null;
  const token = useSelector((state: IStateUser) => state.user.user.token);
  return (
    <div className="article">
      <div className="article-header">
        <div>
          <div className="article-top">
            <Link to={`/articles/${slug}`} state={{ item: props.article }}>
              <span className="article-title">{title.slice(0, 40)}</span>
            </Link>
            <span
              onClick={() => {
                if (token !== "") {
                  if (!stateFavor) {
                    fetchAddLike(slug, token);
                    changeLikes(likes + 1);
                  } else {
                    fetchDeleteLike(slug, token);
                    changeLikes(likes - 1);
                  }
                  chengeStateFavor(!stateFavor);
                }
              }}
              className={cn({
                "article-withLike": stateFavor,
                "article-withOutLike": !stateFavor,
              })}
            >
              {stateFavor ? <HeartFilled /> : <HeartOutlined />}
            </span>

            <span className="article-favorite">{likes}</span>
          </div>
          <div>{tags}</div>
        </div>
        <div>
          <div className="article-profile">
            <div className="article-author-info">
              <span className="article-author-info__name">
                {author.username}
              </span>
              <span className="article-author-info__date">
                {dateFormat(updatedAt, "mediumDate")}
              </span>
            </div>
            <div className="article-profile__icon">
              <img src={author.image} />
            </div>
          </div>
        </div>
      </div>
      <div className="article-description">{description.slice(0, 200)}</div>
    </div>
  );
};

export default Article;

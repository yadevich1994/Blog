import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import dateFormat from "dateformat";
import Markdown from "react-markdown";
import { useSelector } from "react-redux";
import cn from "classnames";

import ModalWindow from "../ModalWinow";
import { fetchAddLike, fetchDeleteLike } from "../../services/favorites";
import { fetchArticlesSlug } from "../../services/Articles";
import { IArticle } from "../../types/Articles";
import { IStateUser } from "../../types/StateRedux";

import "./FullArticle.scss";

const FullArticle = () => {
  const AuthorName = useSelector(
    (state: IStateUser) => state.user.user.username
  );
  const token = useSelector((state: IStateUser) => state.user.user.token);
  const [arr, setArr] = useState<IArticle>({
    slug: "",
    title: "",
    description: "",
    body: "",
    tagList: [""],
    createdAt: new Date(),
    updatedAt: new Date(),
    favorited: false,
    favoritesCount: 0,
    author: { username: "", bio: "", image: "", following: false },
  });
  const [isModal, changeModal] = useState(false);
  const { slug } = useParams();

  const {
    title,
    favoritesCount,
    tagList,
    description,
    author,
    updatedAt,
    body,
    favorited,
  } = arr;
  const [stateFavor, changeFavor] = useState(favorited);
  const [likes, changeLikes] = useState(favoritesCount);

  const tags =
    tagList &&
    tagList.map((elem) => (
      <React.Fragment key={elem}>
        <span className="article-tag">{elem.slice(0, 20)}</span>
      </React.Fragment>
    ));
  useEffect(() => {
    fetchArticlesSlug(slug!, token).then((res) => {
      setArr(res.article);
    });
  }, []);
  useEffect(() => changeFavor(favorited), [favorited]);
  useEffect(() => changeLikes(favoritesCount), [favoritesCount]);
  return (
    <div className="fullArticle-container">
      <div className="fullarticle">
        <div className="article-header">
          <div>
            <div className="fullarticle-top">
              <span className="article-title">{title}</span>
              <span
                className={cn({
                  "article-withLike": stateFavor,
                  "article-withOutLike": !stateFavor,
                })}
                onClick={() => {
                  if (token !== "") {
                    if (!stateFavor) {
                      fetchAddLike(slug!, token);
                      changeLikes(likes + 1);
                    } else {
                      fetchDeleteLike(slug!, token);
                      changeLikes(likes - 1);
                    }
                    changeFavor(!stateFavor);
                  }
                }}
              >
                {stateFavor ? <HeartFilled /> : <HeartOutlined />}
              </span>
              <span className="article-favorite">{likes}</span>
            </div>
            <div>{tags}</div>
            <div className="fullarticle-description">{description}</div>
          </div>
          <div style={{ position: "relative" }}>
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
            {AuthorName === author.username && (
              <div className="edit__container">
                <Link
                  to={`/${slug}/edit-article`}
                  state={{ title, description, body }}
                >
                  <button className="edit-article">Edit</button>
                </Link>
                <button
                  onClick={() => changeModal(!isModal)}
                  className="delete-article"
                >
                  Delete
                </button>
                <div className={"modalWindow"}>
                  {isModal && (
                    <ModalWindow
                      changeState={(res: boolean) => changeModal(res)}
                      slug={slug}
                    ></ModalWindow>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
        <Markdown>{body}</Markdown>
      </div>
    </div>
  );
};

export default FullArticle;

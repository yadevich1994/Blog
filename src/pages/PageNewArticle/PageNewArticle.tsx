import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { IStateUser } from "../../types/StateRedux";
import CreateArticleForm from "../../components/CreateArticleForm";

const PageNewArticle = () => {
  const navigate = useNavigate();
  const name = useSelector((state: IStateUser) => state.user.user.username);
  const isAuthor = () => {
    return name === "" ? navigate(`/sign-in`) : null;
  };
  useEffect(() => {
    isAuthor();
  }, []);
  return (
    <>
      <CreateArticleForm />
    </>
  );
};

export default PageNewArticle;

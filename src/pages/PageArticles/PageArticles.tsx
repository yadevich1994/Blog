import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Spin, Pagination } from "antd";

import { AppDispatch } from "../../store/store";
import fetchArticlesList from "../../services/Articles";
import { IStateArticles, IStateUser } from "../../types/StateRedux";
import ArticlesList from "../../components/ArticlesList";

const PageArticles = () => {
  const dispatch = useDispatch<AppDispatch>();

  const loading = useSelector(
    (state: IStateArticles) => state.articles.loading
  );
  const totalResults = useSelector(
    (state: IStateArticles) => state.articles.totalArticles
  );
  const token = useSelector((state: IStateUser) => state.user.user.token);
  const [currentPage, changeCurrentPage] = useState(1);
  // const token = () => useSelector((state: IStateUser) => state.user.user.token);
  const reloadArticles = (page: number) => {
    changeCurrentPage(page);
    dispatch(fetchArticlesList({ page: page - 1, token }));
  };
  useEffect(() => {
    dispatch(fetchArticlesList({ page: 0, token }));
  }, []);

  const SpinnerContent = loading ? (
    <div style={{ textAlign: "center" }}>
      <Spin size="large" />
    </div>
  ) : (
    <React.Fragment>
      <ArticlesList />
      <div className="pagination">
        <Pagination
          current={currentPage}
          pageSize={20}
          total={totalResults}
          onChange={reloadArticles}
          showSizeChanger={false}
        />
      </div>
    </React.Fragment>
  );
  return <div>{SpinnerContent}</div>;
};

export default PageArticles;

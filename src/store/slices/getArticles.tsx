import { createSlice } from "@reduxjs/toolkit";

import fetchArticlesList from "../../services/Articles";
import { IStateArticle } from "../../types/StateRedux";

const initialState = {
  articles: [],
  totalArticles: 0,
  loading: false,
} as IStateArticle;

export const articlesList = createSlice({
  name: "articles",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticlesList.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchArticlesList.fulfilled, (state, action) => {
        state.articles = action.payload.articles;
        state.totalArticles = action.payload.articlesCount;
        state.loading = false;
      })
      .addCase(fetchArticlesList.rejected, (state) => {
        console.log(state.articles, "ошибка");
        state.loading = false;
      });
  },
});

export default articlesList.reducer;

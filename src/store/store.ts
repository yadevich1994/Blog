import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import getArticles from "./slices/getArticles";
import userInform from "./slices/userParametres";

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["articles"],
};

const rootReducer = combineReducers({
  user: userInform,
  articles: getArticles,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
/* eslint-disable no-underscore-dangle */
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch: () => AppDispatch = useDispatch;

export const persistor = persistStore(store);
export default store;

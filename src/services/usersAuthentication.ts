import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  IPostUser,
  IPostUserResponse,
  IPostexhistingUser,
  IPutEditProfile,
} from "../types/UsersStart";

export const fetchregisterUser = (user: IPostUser) =>
  fetch(`https://blog.kata.academy/api/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(user),
  });

export const fetchExistingUser = (user: IPostexhistingUser) =>
  fetch(`https://blog.kata.academy/api/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(user),
  });

export const fetchGetUserInfo = createAsyncThunk<IPostUserResponse, string>(
  "users/usersInfo",
  (auth: string) =>
    fetch(`https://blog.kata.academy/api/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: `Bearer ${auth}`,
      },
    })
      .then((res) => res.json())
      .then((res) => res)
);

export const fetchEditProfile = (user: IPutEditProfile, token: string) =>
  fetch(`https://blog.kata.academy/api/user`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(user),
  }).then((res) => res.json());

export default fetchregisterUser;

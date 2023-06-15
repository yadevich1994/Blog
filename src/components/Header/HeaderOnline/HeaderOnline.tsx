import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { IStateUser } from "../../../types/StateRedux";
import { unLogin } from "../../../store/slices/userParametres";

import style from "./HeaderOnline.module.scss";

const HeaderOnline = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const name = useSelector((state: IStateUser) => state.user.user.username);
  const img = useSelector((state: IStateUser) => state.user.user.image);
  return (
    <div className={style.container}>
      <Link to={`/new-article`}>
        <button className={style.create}>Create article</button>
      </Link>
      <Link to={`/myprofile/edit`}>
        <span className={style.name}>{name}</span>
      </Link>
      <div className={style.img}>
        <img src={img}></img>
      </div>
      <button
        onClick={() => {
          dispatch(unLogin());
          return navigate("/sign-in");
        }}
        className={style.logOut}
      >
        Log Out
      </button>
    </div>
  );
};

export default HeaderOnline;

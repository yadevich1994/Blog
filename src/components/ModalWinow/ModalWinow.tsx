import React from "react";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { fetchDeleteArticle } from "../../services/Articles";
import { IStateUser } from "../../types/StateRedux";

import style from "./ModalWinow.module.scss";

const ModalWinow = (props: {
  changeState: (num: boolean) => void;
  slug: string | undefined;
}) => {
  const token = useSelector((state: IStateUser) => state.user.user.token);
  const newSlug = props.slug === undefined ? "" : props.slug;
  const navigate = useNavigate();

  return (
    <div className={style["window-container"]}>
      <div style={{ display: "flex" }}>
        <div className={style.danger}>
          <ExclamationCircleOutlined
            style={{ width: "14px", height: "14px" }}
          />
        </div>
        <div>Are you sure to delete this article?</div>
      </div>
      <div className={style.sure} style={{ display: "flex" }}>
        <button
          onClick={() => props.changeState(false)}
          style={{ marginRight: "8px" }}
        >
          No
        </button>
        <button
          onClick={() => {
            fetchDeleteArticle(token, newSlug);
            return navigate("/articles");
          }}
        >
          Yes
        </button>
      </div>
    </div>
  );
};

export default ModalWinow;

import React, { useState } from "react";
import "./CreateArticleForm.scss";
// import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import cn from "classnames";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { v4 } from "uuid";

import { IStateUser } from "../../types/StateRedux";
import { ICreateArticle } from "../../types/FormTypes";
import { fetchPostNewArticle, fetchEditArticle } from "../../services/Articles";

interface ILocation {
  title: string;
  description: string;
  body: string;
}

const CreateArticleForm = () => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const location = useLocation();
  const stateLoc = location.state as ILocation;
  // console.log(stateLoc.title);
  const NamePage =
    location.state === null
      ? "Create New Article"
      : `Edit Article "${stateLoc.title}"`;
  const defailtDescr = location.state === null ? "" : stateLoc.description;
  const defailtBody = location.state === null ? "" : stateLoc.body;
  const defaultTitle = location.state === null ? "" : stateLoc.title;
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<ICreateArticle>({ mode: "onSubmit" });

  const token = useSelector((state: IStateUser) => state.user.user.token);

  const [firstTag, changeFirstTag] = useState("");
  const [manyTags, changeTags] = useState<Array<{ value: string; id: string }>>(
    []
  );

  const onSubmit = handleSubmit(async (data) => {
    if (location.state === null) {
      const tags = manyTags.map((elem) => elem.value.trim());
      await fetchPostNewArticle(
        {
          article: {
            title: data.title,
            description: data.description,
            body: data.text,
            tagList: [firstTag, ...tags]
              .map((elem) => elem.trim())
              .filter((elem) => elem !== ""),
          },
        },
        token
      );
    } else {
      await fetchEditArticle(
        {
          article: {
            title: data.title,
            description: data.description,
            body: data.text,
          },
        },
        token,
        slug!
      );
    }
    reset();
    return navigate("/articles");
  });
  const addTag = () => {
    const tag = {
      id: v4(),
      value: "",
    };
    changeTags([...manyTags, tag]);
  };

  const deletetag = (id: string): void => {
    const newIndex = manyTags.findIndex((el) => el.id === id);
    changeTags(
      manyTags.slice(0, newIndex).concat(manyTags.slice(newIndex + 1))
    );
  };

  return (
    <div className="new-article">
      <div className="new-article__container">
        <h2>{NamePage}</h2>
        <form onSubmit={onSubmit}>
          {/* title */}
          <label>Title</label>
          <br></br>
          <input
            className={cn({ "error-input": errors?.title?.message })}
            type="text"
            placeholder="Title"
            defaultValue={defaultTitle}
            {...register("title", {
              required: "Поле обязательно к заполнению",
              minLength: {
                value: 1,
                message: "Your user name needs to be at least 1 characters.",
              },
              maxLength: {
                value: 80,
                message: "Your user name must be no more than 40 characters.",
              },
              pattern: {
                // eslint-disable-next-line no-useless-escape
                value: /^[a-z, а-я]{1,80}$/i,
                message: "invalid type pattern",
              },
            })}
          />
          <div>
            {errors?.title && <p>{`${errors?.title?.message}` || "Error!"}</p>}
          </div>
          {/* Description */}
          <label>Short Desription</label>
          <br></br>
          <input
            className={cn({ "error-input": errors?.description?.message })}
            type="text"
            placeholder="Short Desription"
            defaultValue={defailtDescr}
            {...register("description", {
              required: "Поле обязательно к заполнению",
              pattern: {
                // eslint-disable-next-line no-useless-escape
                value: /^[a-z, а-я]{1,40}$/i,
                message: "invalid type pattern",
              },
              minLength: {
                value: 1,
                message: "Your description needs to be at least 1 characters.",
              },
            })}
          />
          <div>
            {errors?.description && (
              <p>{`${errors?.description?.message}` || "Error!"}</p>
            )}
          </div>
          {/* Text */}
          <label>Text</label>
          <br></br>
          <textarea
            placeholder="Text"
            defaultValue={defailtBody}
            className={cn({ "error-input": errors?.text?.message })}
            {...register("text", {
              required: "Поле обязательно к заполнению",
              minLength: {
                value: 6,
                message: "Your text to be at least 6 characters.",
              },
            })}
          />

          <div>
            {errors?.text && <p>{`${errors?.text?.message}` || "Error!"}</p>}
          </div>
          {/* just one password */}
          {location.state === null && (
            <>
              <label>Tags</label>
              <br></br>
              <div>
                <input
                  type="text"
                  placeholder="Tags"
                  className={cn("tag-style")}
                  onChange={(e) => {
                    changeFirstTag(e.target.value);
                  }}
                />
                <button
                  type="button"
                  className="add-tag"
                  onClick={() => addTag()}
                >
                  Add Tag
                </button>
              </div>
              {manyTags.map((res) => (
                <div key={res.id}>
                  <input
                    type="text"
                    placeholder="Tags"
                    className={cn("tag-style")}
                    onChange={(e) => {
                      changeTags(
                        manyTags.map((elem) =>
                          elem.id === res.id
                            ? { ...elem, value: e.target.value }
                            : elem
                        )
                      );
                    }}
                  />
                  <button
                    type="button"
                    className="delete-tag"
                    onClick={() => deletetag(res.id)}
                  >
                    Delete
                  </button>
                  <button
                    className="add-tag"
                    type="button"
                    onClick={() => addTag()}
                  >
                    Add Tag
                  </button>
                </div>
              ))}
            </>
          )}
          {/* button submit */}
          <button className="new-article__submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default CreateArticleForm;

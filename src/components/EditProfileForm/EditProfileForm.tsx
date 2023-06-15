import React from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import cn from "classnames";

import { IEditProfile } from "../../types/FormTypes";
import { IStateUser } from "../../types/StateRedux";
import { fetchEditProfile } from "../../services/usersAuthentication";
import avatar from "../../img/ahm1P-1bYv4.jpg";
import { editprofile } from "../../store/slices/userParametres";

import "./EditProfileForm.scss";

const EditProfileForm = () => {
  const dispatch = useDispatch();
  const DefaultUserName = useSelector(
    (state: IStateUser) => state.user.user.username
  );
  const token = useSelector((state: IStateUser) => state.user.user.token);
  const DefaultEmail = useSelector(
    (state: IStateUser) => state.user.user.email
  );
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<IEditProfile>({ mode: "onSubmit" });
  const onSubmit = handleSubmit(async (data) => {
    const resFetch = Object.fromEntries(
      Object.entries(data).filter((elem) => elem[1] !== "")
    );

    const res = await fetchEditProfile(
      {
        user: {
          username: resFetch.username,
          email: resFetch.email,
          password: resFetch.password,
          image: resFetch.image,
        },
      },
      token
    );
    if (res.errors) {
      alert(JSON.stringify(res.errors));
    } else {
      dispatch(editprofile(resFetch));
      reset();
    }
  });
  return (
    <div className="edit-profile-container">
      <div className="edit-form">
        <h2>Edit Profile</h2>
        <form onSubmit={onSubmit}>
          {/* username */}
          <label>
            Username:
            <input
              className={cn({ "error-input": errors?.username?.message })}
              type="text"
              placeholder="Username"
              defaultValue={DefaultUserName}
              {...register("username", {
                required: "Поле обязательно к заполнению",
                minLength: {
                  value: 3,
                  message: "Your user name needs to be at least 3 characters.",
                },
                maxLength: {
                  value: 20,
                  message: "Your user name must be no more than 20 characters.",
                },
                pattern: {
                  // eslint-disable-next-line no-useless-escape
                  value: /^[a-z]{3,20}$/i,
                  message: "invalid user name",
                },
              })}
            />
          </label>
          <div>
            {errors?.username && (
              <p>{`${errors?.username?.message}` || "Error!"}</p>
            )}
          </div>
          {/* email */}
          <label>
            Email address
            <input
              className={cn({ "error-input": errors?.email?.message })}
              type="text"
              placeholder="Email address"
              defaultValue={DefaultEmail}
              {...register("email", {
                required: "Поле обязательно к заполнению",
                pattern: {
                  // eslint-disable-next-line no-useless-escape
                  value: /^[\w-\.]+@[\w-]+\.[rucom]{2,3}$/i,
                  message: "invalid email address",
                },
              })}
            />
          </label>
          <div>
            {errors?.email?.message &&
              (<p>{`${errors?.email?.message}`}</p> || "Error in text email!")}
          </div>
          {/* password */}
          <label>
            New password
            <input
              type="password"
              placeholder="New Password"
              className={cn({ "error-input": errors?.password?.message })}
              {...register("password", {
                // required: "Поле обязательно к заполнению",
                minLength: {
                  value: 6,
                  message: "Your password needs to be at least 6 characters.",
                },
                maxLength: {
                  value: 40,
                  message: "Your user name must be no more than 40 characters.",
                },
              })}
            />
          </label>
          <div>
            {errors?.password && (
              <p>{`${errors?.password?.message}` || "Error!"}</p>
            )}
          </div>
          {/* just one password */}
          <label>
            Avatar Image (url)
            <input
              type="text"
              placeholder="Avatar Image"
              defaultValue={avatar}
              {...register("image")}
            />
          </label>
          <div>{errors?.image && <p>{"Passwords do not match!"}</p>}</div>
          {/* submit */}
          <input
            type="submit"
            className="edit-profile-submit"
            value={`Save`}
            // disabled={!isValid}
          ></input>
        </form>
      </div>
    </div>
  );
};

export default EditProfileForm;

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import cn from "classnames";
import { useDispatch } from "react-redux";

import { AppDispatch } from "../../store/store";
import {
  fetchExistingUser,
  fetchGetUserInfo,
} from "../../services/usersAuthentication";
import { ISignIn } from "../../types/FormTypes";
import "./SignInForm.scss";

const SignInForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<ISignIn>({ mode: "onSubmit" });
  const onSubmit = handleSubmit(async (data) => {
    const user = {
      user: {
        email: data.email,
        password: data.password,
      },
    };
    const resp = await (await fetchExistingUser(user)).json();
    if (resp.errors) {
      alert("Email or password is invalid");
    } else {
      dispatch(fetchGetUserInfo(resp.user.token));
      navigate(`/articles`);
    }
  });
  return (
    <div className="SignIn-container">
      <h2>Sign In</h2>
      <form onSubmit={onSubmit}>
        <label>
          Email address
          <input
            className={cn({ "error-input": errors?.email?.message })}
            type="text"
            placeholder="Email address"
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
          {<p>{errors?.email?.message}</p> || <p>{"Error in text email!"}</p>}
        </div>
        <label style={{ marginBottom: "21px" }}>
          Password
          <input
            type="password"
            placeholder="Password"
            className={cn({ "error-input": errors?.password?.message })}
            {...register("password", {
              required: "Поле обязательно к заполнению",
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
        <input type="submit" className="sign-in-submit" value={`Login`}></input>
      </form>

      <div className="sign-up-refuse">
        Don`t have an account? <Link to="/sign-up"> Sign Up.</Link>
      </div>
    </div>
  );
};

export default SignInForm;

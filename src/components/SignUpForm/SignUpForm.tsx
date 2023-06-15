import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import cn from "classnames";

import "./SignUpForm.scss";
import { ISignUp } from "../../types/FormTypes";
import { fetchregisterUser } from "../../services/usersAuthentication";

import { message } from "./errorMessage";

const SignUpForm = () => {
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<ISignUp>({ mode: "onSubmit" });
  const onSubmit = handleSubmit(async (data) => {
    const user = {
      user: {
        username: data.username,
        email: data.email,
        password: data.password,
      },
    };
    const res = await (await fetchregisterUser(user)).json();
    if (res.errors) {
      alert(message(res));
    } else {
      navigate("/articles");
    }
  });
  return (
    <div className="SignUp-container">
      <h2>Create new account</h2>
      <form onSubmit={onSubmit}>
        {/* username */}
        <label>
          Username:
          <input
            className={cn({ "error-input": errors?.username?.message })}
            type="text"
            placeholder="Username"
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
            {...register("email", {
              required: "Поле обязательно к заполнению",
              pattern: {
                // eslint-disable-next-line no-useless-escape
                value: /^[a-z]+@[\w-]+\.[a-z]{2,5}$/i,
                message: "invalid email address",
              },
            })}
          />
        </label>
        <div>
          {<p>{errors?.email?.message}</p> || <p>{"Error in text email!"}</p>}
        </div>
        {/* password */}
        <label>
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
        <div>
          {errors?.password && (
            <p>{`${errors?.password?.message}` || "Error!"}</p>
          )}
        </div>
        {/* just one password */}
        <label>
          Repeat Password
          <input
            type="password"
            placeholder="Password"
            className={cn({ "error-input": errors?.passwordRepeat?.message })}
            {...register("passwordRepeat", {
              required: "Поле обязательно к заполнению",
              validate: (val: string) => watch("password") === val,
            })}
          />
        </label>
        <div>
          {errors?.passwordRepeat && <p>{"Passwords do not match!"}</p>}
        </div>
        {/* check */}
        <div className="sign-up-agree">
          <input
            type="checkbox"
            className={cn({
              checkForm: true,
              "error-input": errors?.checkForm?.message,
            })}
            {...register("checkForm", {
              required: "вы не поставили галочку",
            })}
          ></input>
          <label>I agree to the processing of my personal information</label>
        </div>
        <div>{errors?.checkForm && <p>{errors?.checkForm.message}</p>}</div>
        {/* button submit */}
        <input
          type="submit"
          className="sign-up-submit"
          value={`Create`}
        ></input>
      </form>

      <div className="sign-up-refuse">
        Already have an account? <Link to="/sign-in"> Sign In.</Link>
      </div>
    </div>
  );
};

export default SignUpForm;

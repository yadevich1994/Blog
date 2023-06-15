import React from "react";
import { Link } from "react-router-dom";

import classes from "../Header.module.scss";

const HeaderIn = () => {
  return (
    <>
      <Link to="/sign-in">
        <button className={classes["header-button"]}>Sign In</button>
      </Link>
      <Link to="/sign-up">
        <button className={classes["header-button"]}>Sign Up</button>
      </Link>
    </>
  );
};

export default HeaderIn;

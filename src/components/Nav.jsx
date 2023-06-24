import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppState } from "../AppState";

const Nav = (props) => {
  const { state, dispatch } = useAppState();
  const navigate = useNavigate();

  function isLoggedIn() {
    return (
      <>
        <Link to="/">
          <div>Home</div>
        </Link>
        <div
          onClick={() => {
            dispatch({ type: "logout" });
            navigate("/");
          }}
        >
          Logout
        </div>
      </>
    );
  }

  function isLoggedOut() {
    return (
      <>
        <Link to="/auth/signup">
          <div>SignUp</div>
        </Link>
        <Link to="/auth/login">
          <div>Login</div>
        </Link>
      </>
    );
  }

  return (
    <header>
      <h1>Pick a Country</h1>
      <nav>{state.token ? isLoggedIn() : isLoggedOut()}</nav>
    </header>
  );
};

export default Nav;

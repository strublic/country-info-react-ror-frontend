import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAppState } from "../AppState";

const Auth = (props) => {
  const type = useParams().form;
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [userData, setUserData] = useState();
  const { state, dispatch } = useAppState();
  const navigate = useNavigate();

  useEffect(() => {
    if (userData && userData.user) {
      const { token, user } = userData;
      dispatch({ type: "auth", payload: { token, username: user.username } });
      window.localStorage.setItem(
        "auth",
        JSON.stringify({ token, username: user.username })
      );
      navigate("/");
    }
  }, [userData]);

  const actions = {
    signup: () => {
      return fetch(state.url + "users", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .catch((error) => console.log("Error: ", error.message));
    },
    login: () => {
      return fetch(state.url + "login", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .catch((error) => console.log("Error: ", error.message));
    },
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    actions[type]().then((data) => {
      setUserData(data);
    });
  };

  return (
    <>
      <div className="div-login-form-page">
        <div className="div-login-form">
          <label className="title-login-form">
            {type.includes("login") ? "Acesse sua conta" : "Crie uma conta"}
          </label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="input-login-form"
            placeholder="Digite seu usuário"
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="input-login-form"
            placeholder="Digite sua senha"
          />
          <button
            type="submit"
            value={type}
            className="button-blue"
            onClick={handleSubmit}
          >
            {type.includes("login") ? "Entrar" : "Cadastrar"}
          </button>
          {type.includes("login") ? (
            <label>
              Não tem uma conta?
              <Link to="/auth/logout" className="strong">
                &nbsp;Registre-se
              </Link>
            </label>
          ) : (
            <label>
              Já possui uma conta?
              <Link to="/auth/login" className="strong">
                &nbsp;Entre
              </Link>
            </label>
          )}
        </div>
      </div>
    </>
  );
};

export default Auth;

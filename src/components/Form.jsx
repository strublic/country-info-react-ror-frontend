import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useAppState } from "../AppState";

const Form = (props) => {
  const { state, dispatch } = useAppState();
  const { token } = state;
  const action = useParams().action;
  const [formData, setFormData] = useState(state[action]);

  const actions = {
    new: () => {
      return fetch(state.url + "/countries", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "bearer " + token,
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .catch((error) => console.log("Error: ", error.message));
    },
    edit: () => {
      return fetch(state.url + "/countries/" + state.edit.id, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: "bearer " + token,
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
    actions[action]();
    window.location.href = "/";
  };
  return (
    <>
      <div class="form-container div-login-form-page">
        <h1 className="title-login-form">{action === "new" ? "Cadastrar país" : "Atualizar país"}</h1>
        <div class="container div-login-form">
          <form>
            <label>Nome do país</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              maxLength={20}
              placeholder="Nome do país"
            />

            <label>Capital do país</label>
            <input
              type="text"
              name="capital_city"
              value={formData.capital_city}
              onChange={handleChange}
              maxLength={20}
              placeholder="Capital do país"
            />

            <label>Descrição sobre o país</label>
            <textarea
              name="desc"
              value={formData.desc}
              onChange={handleChange}
              maxLength={140}
              rows="5"
              placeholder="Descrição sobre o país"
            />

            <label>Qtd. populacional do país</label>
            <input
              type="number"
              name="population_size"
              value={formData.population_size}
              maxLength={10}
              onChange={handleChange}
            />

            <label>Área total do país</label>
            <input
              type="number"
              name="area_total"
              value={formData.area_total}
              maxLength={8}
              onChange={handleChange}
            />
            <input
              type="submit"
              value={action === "new" ? "Cadastrar país" : "Atualizar país"}
              className="button-blue"
              onClick={handleSubmit}
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default Form;

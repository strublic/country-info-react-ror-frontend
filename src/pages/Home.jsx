import React, { useEffect, useState } from "react";
import { useAppState } from "../AppState";
import { Route, Link, Routes } from "react-router-dom";
import Form from "../components/Form";
import CountryReviewCard from "../components/CountryReviewCard";
import { Grid } from "@mui/material";

const Home = (props) => {
  const { state, dispatch } = useAppState();
  const { url, countries } = state;
  const { token } = JSON.parse(window.localStorage.getItem("auth"));
  const [searchField, setSearchField] = useState("");

  const getCountries = async () => {
    const response = await fetch(url + "countries/", {
      method: "get",
      headers: {
        Authorization: "bearer " + token,
      },
    });
    const countries = await response.json();
    dispatch({ type: "getCountries", payload: countries });
  };

  useEffect(() => {
    getCountries();
  }, []);

  if (countries === (undefined || null)) {
    return <div>Carregando...</div>;
  }

  const filteredCountries = countries.filter((country) => {
    return (
      country.name.toLowerCase().includes(searchField.toLowerCase()) ||
      country.capital_city.toLowerCase().includes(searchField.toLowerCase())
    );
  });

  const handleChange = (e) => {
    setSearchField(e.target.value);
  };

  const searchInput = () => (
    <>
      <input
        className="pa3 bb br3 grow b--none bg-lightest-blue ma3"
        type="search"
        placeholder="Pesquisar por país ou capital"
        onChange={handleChange}
      />
    </>
  );

  const addCountryButton = () => (
    <>
      <Link to="/home/new">
        <button>Cadastrar novo país</button>
      </Link>
      <Routes>
        <Route path="/home/:action" element={<Form />} />
      </Routes>
    </>
  );

  const gridListOfCountries = () => (
    <>
      <Grid container margin={1}>
        {filteredCountries.map((country) => (
          <div className="country" key={country.id}>
            <CountryReviewCard country={country} countries={{ getCountries }} />
          </div>
        ))}
      </Grid>
    </>
  );

  const homeBody = () => (
    <>
      <div className="Home">
        <h1>PESQUISAR POR PAÍS/CAPITAL:</h1>
        {searchInput()}
        <h1>Todos os países cadastrados:</h1>
        {addCountryButton()}
        {gridListOfCountries()}
      </div>
    </>
  );

  return countries.length > 0 ? (
    homeBody()
  ) : (
    <h1>Não há países cadastrados!</h1>
  );
};

export default Home;

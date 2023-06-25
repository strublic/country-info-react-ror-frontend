import React, { useEffect, useState } from "react";
import { useAppState } from "../AppState";
import SearchAPI from "../components/SearchAPI";
import SearchFrontend from "../components/SearchFrontend";
import { AddCountry } from "../components/Button";
import GridList from "../components/GridList";

const Home = () => {
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
    const countriesPayload = await response.json();
    dispatch({ type: "getCountries", payload: countriesPayload });
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

  const homeBody = () => (
    <>
      <div className="Home">
        <AddCountry />
        {countries.length > 0 ? (
          <>
            <SearchFrontend handleChange={handleChange} />
            <SearchAPI />
            <GridList
              filteredCountries={filteredCountries}
              getCountries={getCountries}
            />
          </>
        ) : (
          <h1>Não há países cadastrados!</h1>
        )}
      </div>
    </>
  );

  return homeBody();
};

export default Home;

import React, { useState } from "react";
import { useAppState } from "../AppState";

const SearchAPI = (props) => {
  const { state, dispatch } = useAppState();
  const { url } = state;
  const { token } = JSON.parse(window.localStorage.getItem("auth"));
  const [searchFieldAPI, setSearchFieldAPI] = useState();

  const getSearchCountries = async () => {
    const response = await fetch(url + "search?country=" + searchFieldAPI, {
      method: "get",
      headers: {
        Authorization: "bearer " + token,
      },
    });
    const countries = await response.json();
    dispatch({ type: "getCountries", payload: countries });
  };

  const handleChangeSearchAPI = (event) => {
    setSearchFieldAPI(event.target.value);
  };

  const handleSubmitSearchAPI = (event) => {
    event.preventDefault();
    getSearchCountries();
  };

  const searchInputAPI = () => (
    <>
      <h1>API Comp: PESQUISAR POR PAÍS/CAPITAL</h1>
      <input
        className="pa3 bb br3 grow b--none bg-lightest-blue ma3"
        type="search"
        name="search"
        placeholder="Pesquisar por país ou capital na API"
        onChange={handleChangeSearchAPI}
      />
      <input type="submit" value="Pesquisar comp" onClick={handleSubmitSearchAPI} />
    </>
  );

  return searchInputAPI();
};

export default SearchAPI;

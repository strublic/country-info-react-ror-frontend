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
      <div className="form-search">
        <div className="inner-form">
          <h3>&nbsp;&nbsp;Backend:</h3>
          <div className="input-field second-wrap">
            <input
              className="input-search"
              type="search"
              name="search"
              placeholder="Pesquisar por país/capital no backend"
              onChange={handleChangeSearchAPI}
              autoComplete="off"
            />
          </div>
          <div className="input-field third-wrap">
            <button
              type="submit"
              value="Pesquisar comp"
              className="btn-search"
              onClick={handleSubmitSearchAPI}
            >
              <svg
                className="fa-w-16"
                aria-hidden="true"
                data-prefix="fas"
                data-icon="search"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );

  return searchInputAPI();
};

export default SearchAPI;

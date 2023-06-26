import React from "react";

const SearchFrontend = ({ handleChange }) => {
  const searchInputFrontend = () => (
    <>
      <div className="form-search">
        <div className="inner-form">
          <h3>&nbsp;&nbsp;Frontend:</h3>
          <div className="input-field second-wrap">
            <input
              className="input-search input-login-form"
              type="search"
              placeholder="Pesquisar por país/capital no frontend"
              onChange={handleChange}
              autoComplete="off"
            />
          </div>
        </div>
      </div>
    </>
  );

  return searchInputFrontend();
};

export default SearchFrontend;

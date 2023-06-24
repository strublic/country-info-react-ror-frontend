import React from "react";

const SearchFrontend = ({handleChange}) => {
  const searchInputFrontend = () => (
    <>
      <h1>Front ggg: PESQUISAR POR PAÍS/CAPITAL</h1>
      <input
        className="pa3 bb br3 grow b--none bg-lightest-blue ma3"
        type="search"
        placeholder="Pesquisar por país ou capital"
        onChange={handleChange}
      />
    </>
  );

  return searchInputFrontend();
};

export default SearchFrontend;

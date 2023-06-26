import { Grid } from "@mui/material";
import React from "react";
import CountryReviewCard from "./CountryReviewCard";

function GridList(props) {
  const gridListOfCountries = () => (
    <>
      <h3>Listagem dos países cadastrados</h3>
      <Grid container margin={1}>
        {props.filteredCountries.map((country) => (
          <div className="country" key={country.id}>
            <CountryReviewCard
              country={country}
              getCountries={props.getCountries}
            />
          </div>
        ))}
      </Grid>
    </>
  );

  return gridListOfCountries();
}

export default GridList;

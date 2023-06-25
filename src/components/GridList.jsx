import { Grid } from "@mui/material";
import React from "react";
import CountryReviewCard from "./CountryReviewCard";

function GridList(props) {
  const gridListOfCountries = () => (
    <>
      <h1>Todos os países cadastrados:</h1>

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

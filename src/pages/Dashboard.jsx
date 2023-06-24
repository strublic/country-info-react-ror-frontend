import React, { useEffect } from "react";
import { useAppState } from "../AppState";
import { Route, Link, Routes } from "react-router-dom";
import Form from "../components/Form";

const Dashboard = (props) => {
  const { state, dispatch } = useAppState();
  const { token, url, countries, type } = state;

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

  return countries && countries.length > 0 ? (
    <>
      <div className="dashboard">
        <h1>All Countries</h1>
        <Link to="/dashboard/new">
          <button>New country</button>
        </Link>
        <Routes>
          <Route path="/dashboard/:action" element={<Form />} />
        </Routes>
        <ul>
          {countries.map((country) => {
            return (
              <div className="country" key={country.id}>
                <h2>{country.id}</h2>
                <h2>{country.name}</h2>
                <h2>{country.area_total}</h2>
                <h2>{country.population_size}</h2>
                <h2>{"Calcular area_total/population_size"}</h2>
                <h2>{country.capital_city}</h2>
              </div>
            );
          })}
        </ul>
      </div>
    </>
  ) : (
    <h1>Não há países cadastrados!</h1>
  );
};

export default Dashboard;

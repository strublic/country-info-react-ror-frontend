import React, { useState } from "react";
import {Routes, Route, useNavigate} from "react-router-dom";
import Nav from "./Nav.jsx";
import Home from "../pages/Home.jsx";
import Auth from "../pages/Auth.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import { useAppState } from "../AppState.jsx";

export const App = (props) => {
  const {state, dispatch } = useAppState();
  const navigate = useNavigate();

  useState(() => {
    const auth = JSON.parse(window.localStorage.getItem("auth"));
    console.log("auth: ", auth)
    if (auth){
      dispatch({ type: "auth", payload: auth});
      navigate("/dashboard");
    }else{
      navigate("/");
    }
  }, []);

  return(
    <>
      <Routes>
        <Route path='/' element={<Nav/>}/>
        <Route path='/' element={<Home/>}/>
        <Route path='/auth/:form' element={<Auth/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
      </Routes>
    </>
  )
};

export default App;
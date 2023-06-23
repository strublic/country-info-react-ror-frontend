import React, { useState } from "react";
import {Routes, Route, useNavigate} from "react-router-dom";
import Nav from "./Nav.jsx";
import Home from "../pages/Home.jsx";
import Auth from "../pages/Auth.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import Form from "../components/Form"
import { useAppState } from "../AppState.jsx";

const App = (props) => {
  const {state, dispatch } = useAppState();
  const navigate = useNavigate();

  useState(() => {
    const auth = JSON.parse(window.localStorage.getItem("auth"));
    console.log("auth: ", auth)
    if (auth){
      dispatch({ type: "auth", payload: auth});
      navigate("/dashboard/");
    }else{
      navigate("/");
    }
  }, []);

  return(
    <>
      <Routes>
        {/* <Route path='/' element={<Nav/>}/> */}
        { state.token? <Route path='/' element={<Home/>}/> : null }
        { state.token? <Route path='/dashboard' element={<Dashboard/>}/> : null }
        { state.token? <Route path="/home/:action"  element={<Form/>}/> : null }
        <Route path='/auth/:form' element={<Auth/>}/>
      </Routes>
    </>
  )
};

export default App;
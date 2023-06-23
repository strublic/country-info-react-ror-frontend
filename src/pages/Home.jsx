import React, { useEffect } from "react"
import {useAppState} from "../AppState"
import {Route, Link, Routes} from "react-router-dom"
import Form from "../components/Form"
import CountryReviewCard from "../components/CountryReviewCard"
import { Grid } from '@mui/material';

const Home = (props) => {
    const {state, dispatch} = useAppState()
    const {url, countries} = state
    const getCountries = async () => {
        const {token} = JSON.parse(window.localStorage.getItem("auth"))
        const response = await fetch(url + "countries/", {
            method: "get",
            headers:{
                Authorization: "bearer " + token
            }
        })
        const countries = await response.json()
        dispatch({type: "getCountries", payload: countries})
    }

    useEffect(() => {getCountries()}, [])

    return (countries && countries.length > 0 ?
        <>
            <div className="Home">
                <h1>PESQUISAR POR PAÍS/CAPITAL?</h1>
                <h1>Todos os países cadastrados:</h1>
                <Link to="/home/new"><button>Cadastrar novo país</button></Link>
                <Routes>

                    <Route path="/home/:action"  element={<Form/>}/>
                    {/* <Route path="/Home/:action" render={(rp) => <Form {...rp} getCountries={getCountries} />}/> */}
                </Routes>
                <Grid container margin={1}>
                    {countries.map(country => (
                        <div className="country" key={country.id}>
                            <CountryReviewCard country={country}/>
                        </div>
                        )
                    )}
                </Grid>
            </div>
        </>
        : <h1>Não há países cadastrados!</h1>)
}

export default Home
import React, { useEffect } from "react"
import {useAppState} from "../AppState"
import {Route, Link, Routes} from "react-router-dom"
import Form from "../components/Form"
import CountryReviewCard from "../components/CountryReviewCard"

const Home = (props) => {

    const {state, dispatch} = useAppState()
    const {token, url, countries, type} = state
console.log("HEEERR Home")
console.log("STT", state)
console.log("kkk", type)
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
        // }
    }

    useEffect(() => {getCountries();}, [])
    
  
    // return (
    //   <div>
    //     {cards.map((c) => (
    //       <div key={c.id}>
    //         <a onClick={() => toggleDescription(c.id)}>
    //           <h5>{c.name}</h5>
    //           <img height="50px" src={c.image} alt={c.name} />
    //           <br />
    //           {c.show && <p>{c.description}</p>}
    //         </a>
    //       </div>
    //     ))}
    //   </div>
    // );
    //TODO    
    // return countries ? loaded : <h1>Loading...</h1>;

    return (countries && countries.length > 0 ?
        <>
            <div className="Home">
                <h1>Todos os países cadastrados:</h1>
                <Link to="/home/new"><button>Cadastrar novo país</button></Link>

                <CountryReviewCard/>


                <Routes>

                    <Route path="/home/:action"  element={<Form/>}/>
                    {/* <Route path="/Home/:action" render={(rp) => <Form {...rp} getCountries={getCountries} />}/> */}
                </Routes>
                <ul>             
                    {countries.map(country => (
                        <div className="country" key={country.id}>
                            <h2>{country.id}</h2>
                            <h2>{country.name}</h2>
                            <h2>{country.area_total}</h2>
                            <h2>{country.population_size}</h2>
                            <h2>{"Calcular area_total/population_size"}</h2>
                            <h2>{country.capital_city}</h2>
                        </div>
                        )
                    )};
                }
                </ul>
            </div>
        </>
        : <h1>Não há países cadastrados!</h1>)
}

export default Home
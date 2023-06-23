import React, { useState } from "react"
import {useParams} from "react-router-dom"
import { useAppState } from "../AppState"

const Form = (props) => {

    const {state, dispatch} = useAppState();
    const {token} = state;
    const action = useParams().action;
    const [formData, setFormData] = useState(state[action]);

    console.log("HEEEEERE 2222")

    const actions = {
        new: () => {
            console.log ("AC: ", actions)
            return fetch(state.url + "/countries", {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "bearer " + token
                },
                body: JSON.stringify(formData),
            }).then((response) => response.json())
            .catch((error) => console.log("Error: ", error.message));
        },
        edit: () => {
            return fetch(state.url + "/countries/" + state.edit.id, {
                method: "put",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "bearer " + token
                },
                body: JSON.stringify(formData)
            }).then((response) => response.json())
            .catch((error) => console.log("Error: ", error.message));
        },
    };
    const handleChange = (event) => {
        setFormData({...formData, [event.target.name] : event.target.value});
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        actions[action]().then((data) => {
            // props.getCountries()
            console.log("DATA: ", data)
        });
        window.location.href = "/"
    }
    
    return (
        <>
            <div className="form">
                <form>
                    <input type="text" name="name" value={formData.name} onChange={handleChange}/>
                    <input type="text" name="area_total" value={formData.area_total} onChange={handleChange}/>
                    <input type="text" name="population_size" value={formData.population_size} onChange={handleChange}/>
                    <input type="text" name="capital_city" value={formData.capital_city} onChange={handleChange}/>
                    <input type="submit" value={action === "new" ? "Criar" : "Atualizar"} onClick={handleSubmit}/>
                </form>
            </div>
        </>
    );
}

export default Form
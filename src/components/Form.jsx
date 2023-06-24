import React, { useState } from "react"
import {useParams} from "react-router-dom"
import { useAppState } from "../AppState"

const Form = (props) => {

    const {state, dispatch} = useAppState();
    const {token} = state;
    const action = useParams().action;
    const [formData, setFormData] = useState(state[action]);

    const actions = {
        new: () => {
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
        actions[action]();
        window.location.href = "/"
    }
    
    return (
        <>
            <div className="form">
                <form>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Nome do país"/>
                    <input type="text" name="capital_city" value={formData.capital_city} onChange={handleChange} placeholder="Capital do país"/>
                    <textarea name="desc" value={formData.desc} onChange={handleChange} placeholder="Descrição sobre o país"/>
                    <label>Área total do país:</label>
                    <input type="text" name="area_total" value={formData.area_total} onChange={handleChange}/>
                    <label>Qtd. populacional do país:</label>
                    <input type="text" name="population_size" value={formData.population_size} onChange={handleChange}/>
                    <input type="submit" value={action === "new" ? "Criar" : "Atualizar"} onClick={handleSubmit}/>
                </form>
            </div>
        </>
    );
}

export default Form